const PAGE_SIZE = 80;
const MODULE_IDS = ['words', 'grammar', 'patterns', 'communication'];
const WORD_IDS = new Set(WORDS.map(word => word.id));
const $ = selector => document.querySelector(selector);
const esc = value => String(value).replace(
  /[&<>"']/g,
  character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character],
);

function loadLearned() {
  try {
    const value = JSON.parse(localStorage.getItem('ogden850.learned') || '[]');
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter(id => typeof id === 'string' && WORD_IDS.has(id)))];
  } catch {
    return [];
  }
}

function saveLearned(items) {
  try {
    localStorage.setItem('ogden850.learned', JSON.stringify(items));
  } catch {
    // The page stays usable when storage is unavailable.
  }
}

function loadModule() {
  try {
    const value = localStorage.getItem('ogden850.module') || 'words';
    return MODULE_IDS.includes(value) ? value : 'words';
  } catch {
    return 'words';
  }
}

function saveModule(id) {
  try {
    localStorage.setItem('ogden850.module', id);
  } catch {
    // The selected module is non-critical state.
  }
}

const state = {
  category: 'all',
  subgroup: 'all',
  onlyUnlearned: false,
  visible: PAGE_SIZE,
  learned: new Set(loadLearned()),
  patternFamily: 'all',
  patternOperator: 'all',
};

function categoryLabel(key) {
  return key === 'all'
    ? 'All words / 全部词项'
    : `${CATEGORIES[key].en} / ${CATEGORIES[key].zh}`;
}

function renderGrammar() {
  const container = $('#grammarContent');
  if (!container || typeof GRAMMAR === 'undefined') return;
  let currentChapter = '';
  let ruleNumber = 0;
  container.innerHTML = GRAMMAR.map(rule => {
    const chapter = rule.chapter !== currentChapter
      ? `<h3 class="grammar-chapter">${esc(rule.chapterZh)}</h3>`
      : '';
    currentChapter = rule.chapter;
    ruleNumber += 1;
    return `${chapter}<article class="rule" id="grammar-${esc(rule.id)}">
      <div class="rule-heading"><span>${String(ruleNumber).padStart(2, '0')}</span><h3>${esc(rule.titleZh)}</h3></div>
      <p class="rule-summary">${esc(rule.summaryZh)}</p>
      ${rule.formulas.map(formula => `<div class="rule-formula">${esc(formula)}</div>`).join('')}
      <div class="rule-explanation">
        ${rule.explanationZh.map(item => `<p>${esc(item)}</p>`).join('')}
      </div>
      <details class="rule-more">
        <summary>查看条件、例句与常见错误</summary>
        <div class="rule-columns">
          <div><b>适用条件</b><ul>${rule.appliesWhen.map(item => `<li>${esc(item)}</li>`).join('')}</ul></div>
          <div><b>限制</b><ul>${rule.limitations.map(item => `<li>${esc(item)}</li>`).join('')}</ul></div>
        </div>
        ${rule.examples.map(example => `<div class="grammar-example"><strong>${esc(example.en)}</strong><span>${esc(example.zh)}</span>${example.noteZh ? `<small>${esc(example.noteZh)}</small>` : ''}<button data-speak="${esc(example.en)}" aria-label="朗读例句">▶</button></div>`).join('')}
        ${rule.mistakes.map(item => `<div class="grammar-mistake"><span>避免：${esc(item.wrong)}</span><strong>建议：${esc(item.better)}</strong><p>${esc(item.reasonZh)}</p></div>`).join('')}
        ${rule.patternRefs.length ? `<div class="related-patterns"><b>关联句型</b>${rule.patternRefs.map(id => {
          const pattern = PATTERNS.find(item => item.id === id);
          return pattern ? `<button type="button" data-pattern-ref="${esc(id)}">${esc(pattern.formula)}</button>` : '';
        }).join('')}</div>` : ''}
      </details>
    </article>`;
  }).join('');
}

function patternCard(pattern) {
  return `<article class="pattern-card" id="pattern-${esc(pattern.id)}">
    <header>
      <div><span class="pattern-family">${esc(pattern.familyZh)}</span><h3>${esc(pattern.functionZh)}</h3></div>
      <div class="pattern-operator-list">${pattern.operators.map(operator => `<span>${esc(operator)}</span>`).join('')}</div>
    </header>
    <div class="pattern-formula">${esc(pattern.formula)}</div>
    <p>${esc(pattern.explanationZh)}</p>
    <div class="pattern-examples">${pattern.examples.map(example => `<div><p lang="en">${esc(example.en)}</p><span>${esc(example.zh)}</span><button data-speak="${esc(example.en)}" aria-label="朗读 ${esc(example.en)}">▶</button></div>`).join('')}</div>
    <details>
      <summary>变化与注意点</summary>
      ${pattern.variations.length ? `<ul>${pattern.variations.map(item => `<li><code>${esc(item)}</code></li>`).join('')}</ul>` : ''}
      ${pattern.commonMistakes.length ? `<p class="pattern-note">${pattern.commonMistakes.map(item => esc(item)).join('；')}</p>` : ''}
    </details>
  </article>`;
}

function renderPatterns() {
  const list = PATTERNS.filter(pattern =>
    (state.patternFamily === 'all' || pattern.family === state.patternFamily)
    && (state.patternOperator === 'all' || pattern.operators.includes(state.patternOperator)));
  $('#patternCount').textContent = list.length;
  $('#patternGrid').innerHTML = list.length
    ? list.map(patternCard).join('')
    : '<div class="empty"><strong>没有匹配的句型</strong><br>请更换功能或 operator。</div>';
  document.querySelectorAll('[data-pattern-family]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.patternFamily === state.patternFamily));
  });
  document.querySelectorAll('[data-pattern-operator]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.patternOperator === state.patternOperator));
  });
}

function setupPatterns() {
  const families = [...new Map(PATTERNS.map(pattern => [pattern.family, pattern.familyZh])).entries()];
  $('#patternFamilies').innerHTML = [
    '<button type="button" data-pattern-family="all" aria-pressed="true">全部功能</button>',
    ...families.map(([id, label]) => `<button type="button" data-pattern-family="${esc(id)}" aria-pressed="false">${esc(label)}</button>`),
  ].join('');
  $('#patternOperators').innerHTML = [
    '<button type="button" data-pattern-operator="all" aria-pressed="true">全部 operators</button>',
    ...OPERATORS.map(operator => `<button type="button" data-pattern-operator="${esc(operator)}" aria-pressed="false">${esc(operator)}</button>`),
  ].join('');
  $('#patternFamilies').addEventListener('click', event => {
    const button = event.target.closest('[data-pattern-family]');
    if (!button) return;
    state.patternFamily = button.dataset.patternFamily;
    renderPatterns();
  });
  $('#patternOperators').addEventListener('click', event => {
    const button = event.target.closest('[data-pattern-operator]');
    if (!button) return;
    state.patternOperator = button.dataset.patternOperator;
    renderPatterns();
  });
  renderPatterns();
}

function openPattern(id) {
  if (!PATTERNS.some(pattern => pattern.id === id)) return;
  state.patternFamily = 'all';
  state.patternOperator = 'all';
  renderPatterns();
  selectModule('patterns');
  requestAnimationFrame(() => {
    const card = document.getElementById(`pattern-${id}`);
    card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card?.classList.add('targeted');
    setTimeout(() => card?.classList.remove('targeted'), 1600);
  });
}

function syncModuleUrl(id) {
  try {
    const url = new URL(location.href);
    url.hash = id;
    history.replaceState(null, '', url);
  } catch {
    // Some embedded file viewers restrict history updates.
  }
}

function selectModule(id, { focus = false, updateUrl = true } = {}) {
  const active = MODULE_IDS.includes(id) ? id : 'words';
  document.querySelectorAll('.module-panel').forEach(panel => {
    panel.hidden = panel.id !== `panel-${active}`;
  });
  document.querySelectorAll('[role=tab][data-tab]').forEach(tab => {
    const selected = tab.dataset.tab === active;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) tab.focus();
  });
  saveModule(active);
  if (updateUrl) syncModuleUrl(active);
}

function setupModules() {
  const tabs = [...document.querySelectorAll('[role=tab][data-tab]')];
  const hashModule = location.hash.slice(1);
  const initial = MODULE_IDS.includes(hashModule) ? hashModule : loadModule();
  selectModule(initial);

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectModule(tab.dataset.tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      selectModule(tabs[next].dataset.tab, { focus: true });
    });
  });

  window.addEventListener('hashchange', () => {
    const requested = location.hash.slice(1);
    if (MODULE_IDS.includes(requested)) selectModule(requested, { updateUrl: false });
  });
}

function initialise() {
  setupModules();
  renderGrammar();
  setupPatterns();
  const filters = $('#filters');
  filters.innerHTML = [
    '<button class="filter" data-category="all" aria-pressed="true">All / 全部 850</button>',
    ...Object.entries(CATEGORIES).map(([key, value]) =>
      `<button class="filter" data-category="${key}" aria-pressed="false">${value.en} / ${value.zh} ${value.count}</button>`),
  ].join('');

  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-category]');
    if (!button) return;
    state.category = button.dataset.category;
    state.subgroup = 'all';
    state.visible = PAGE_SIZE;
    syncControls();
    render();
  });

  $('#subgroup').addEventListener('change', event => {
    state.subgroup = event.target.value;
    state.visible = PAGE_SIZE;
    render();
  });

  $('#onlyUnlearned').addEventListener('change', event => {
    state.onlyUnlearned = event.target.checked;
    state.visible = PAGE_SIZE;
    syncControls();
    render();
  });

  $('#clear').addEventListener('click', () => {
    state.category = 'all';
    state.subgroup = 'all';
    state.onlyUnlearned = false;
    state.visible = PAGE_SIZE;
    syncControls();
    render();
  });

  $('#loadMore').addEventListener('click', () => {
    state.visible += PAGE_SIZE;
    render();
  });

  $('#toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener(
    'scroll',
    () => $('#toTop').classList.toggle('show', scrollY > 640),
    { passive: true },
  );

  document.addEventListener('click', event => {
    const patternLink = event.target.closest('[data-pattern-ref]');
    if (patternLink) {
      event.preventDefault();
      openPattern(patternLink.dataset.patternRef);
      return;
    }
    const opener = event.target.closest('[data-open-tab]');
    if (opener) {
      selectModule(opener.dataset.openTab);
      document.querySelector('.mast').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const speak = event.target.closest('[data-speak]');
    if (speak) {
      event.preventDefault();
      speakText(speak.dataset.speak);
    }
    const learn = event.target.closest('[data-learn]');
    if (learn) {
      event.preventDefault();
      toggleLearned(learn.dataset.learn);
    }
  });

  syncControls();
  render();
  updateProgress();
  setupVoices();
}

function syncControls() {
  document.querySelectorAll('[data-category]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.category === state.category));
  });
  const groups = [...new Set(
    WORDS
      .filter(word => state.category === 'all' || word.category === state.category)
      .map(word => word.subgroup),
  )];
  $('#subgroup').innerHTML = [
    '<option value="all">All subgroups / 全部子分类</option>',
    ...groups.map(group => `<option value="${esc(group)}">${esc(group)}</option>`),
  ].join('');
  $('#subgroup').value = groups.includes(state.subgroup) ? state.subgroup : 'all';
  state.subgroup = $('#subgroup').value;
  $('#onlyUnlearned').checked = state.onlyUnlearned;
  $('#activeLabel').textContent = activeFilterLabel();
}

function activeFilterLabel() {
  const label = categoryLabel(state.category);
  return state.onlyUnlearned ? `${label} · 只看未学习` : label;
}

function filtered() {
  return WORDS
    .filter(word =>
      (state.category === 'all' || word.category === state.category)
      && (state.subgroup === 'all' || word.subgroup === state.subgroup)
      && (!state.onlyUnlearned || !state.learned.has(word.id)))
    .sort((left, right) => left.originalIndex - right.originalIndex);
}

function render() {
  const list = filtered();
  const shown = list.slice(0, state.visible);
  $('#resultCount').textContent = list.length;
  $('#activeLabel').textContent = activeFilterLabel();
  $('#wordGrid').innerHTML = shown.length
    ? shown.map(card).join('')
    : state.onlyUnlearned
      ? '<div class="empty"><strong>当前筛选下没有未学习词项</strong><br>可以取消“只看未学习”或更换分类。</div>'
      : '<div class="empty"><strong>这个分类下没有词项</strong><br>请更换分类或子分类。</div>';
  $('#loadMore').hidden = shown.length >= list.length;
  $('#loadMore').textContent = `继续显示（还有 ${Math.max(0, list.length - shown.length)} 个）`;
}

function card(word) {
  const category = CATEGORIES[word.category];
  const learned = state.learned.has(word.id);
  const operator = OPERATORS.includes(word.word);
  const firstExample = word.senses?.[0]?.examples?.[0]?.en || word.example;
  return `
    <details class="word-card">
      <summary>
        <div class="word-top">
          <div>
            <div class="word">${esc(word.word)}${word.us ? ` <small title="美式拼写">/ ${esc(word.us)}</small>` : ''}</div>
            <div class="ipa">${esc(word.ipa)}</div>
          </div>
          <div class="badges">
            ${operator ? '<span class="badge" style="color:#b45309">18-op</span>' : ''}
            <span class="badge" style="color:${category.tone}">${esc(category.en)} / ${esc(category.zh)}</span>
          </div>
        </div>
        <p class="gloss">${esc(word.zh)}</p>
        <div class="mini"><span>${esc(word.pos)} · ${esc(word.subgroup)}</span><span>#${word.originalIndex + 1}</span></div>
        <div class="quick-actions">
          <button class="quick" data-speak="${esc(word.word)}" aria-label="朗读 ${esc(word.word)}" title="朗读单词">▶</button>
          <button class="quick ${learned ? 'on' : ''}" data-learn="${esc(word.id)}" aria-label="${learned ? '取消已学习' : '标记已学习'}" title="${learned ? '已学习' : '标记已学习'}">${learned ? '✓' : '○'}</button>
        </div>
      </summary>
      <div class="details">
        <div class="detail-grid">
          <div class="detail"><b>Listed forms / 已列形式</b><p>${esc(word.forms)}</p></div>
          <div class="detail"><b>Rule / 本词规则</b><p>${esc(word.rule)}</p></div>
        </div>
        ${renderWordSenses(word)}
        <p class="review-note"><strong>${esc(word.reviewStatus)}</strong><span>${esc(word.source)}</span></p>
        <div class="card-actions">
          <button class="action" data-speak="${esc(word.word)}" aria-label="朗读 ${esc(word.word)}">▶ 朗读单词</button>
          <button class="action" data-speak="${esc(firstExample)}" aria-label="朗读首条例句">▶ 朗读首条例句</button>
          <button class="action learned ${learned ? 'on' : ''}" data-learn="${esc(word.id)}">${learned ? '✓ 已学习' : '标记已学习'}</button>
        </div>
      </div>
    </details>`;
}

function renderWordSenses(word) {
  const senses = word.senses?.length ? word.senses : [{
    id: `${word.id}-legacy`,
    partOfSpeech: word.pos,
    glossEn: word.definition,
    glossZh: word.definitionZh,
    scopeNoteZh: word.rule,
    patterns: [],
    examples: [{ en: word.example, zh: word.exampleZh }],
    reviewStatus: word.reviewStatus,
  }];
  return `<section class="sense-section">
    <div class="sense-head"><b>Senses & examples / 义项与例句</b><span>${senses.length} 个义项 · ${senses.reduce((sum, sense) => sum + sense.examples.length, 0)} 条例句</span></div>
    <div class="sense-list">${senses.map((sense, index) => `<details class="sense" ${index === 0 ? 'open' : ''}>
      <summary><span>${index + 1}</span><strong>${esc(sense.glossZh)}</strong><small>${esc(sense.partOfSpeech)}</small></summary>
      <div class="sense-body">
        <p lang="en">${esc(sense.glossEn)}</p>
        <p class="sense-note">${esc(sense.scopeNoteZh)}</p>
        <div class="sense-examples">${sense.examples.map(example => `<article>
          <div><strong lang="en">${esc(example.en)}</strong><p>${esc(example.zh)}</p>${example.noteZh ? `<small>${esc(example.noteZh)}</small>` : ''}</div>
          <button type="button" data-speak="${esc(example.en)}" aria-label="朗读 ${esc(example.en)}">▶</button>
        </article>`).join('')}</div>
        ${sense.patterns?.length ? `<div class="related-patterns"><b>相关句型</b>${sense.patterns.map(id => {
          const pattern = PATTERNS.find(item => item.id === id);
          return pattern ? `<button type="button" data-pattern-ref="${esc(id)}">${esc(pattern.formula)}</button>` : '';
        }).join('')}</div>` : ''}
        <div class="sense-status">${esc(sense.reviewStatus)}</div>
      </div>
    </details>`).join('')}</div>
  </section>`;
}

function toggleLearned(id) {
  if (!WORD_IDS.has(id)) return;
  if (state.learned.has(id)) state.learned.delete(id);
  else state.learned.add(id);
  saveLearned([...state.learned]);
  render();
  updateProgress();
}

function updateProgress() {
  const count = state.learned.size;
  const raw = count / WORDS.length * 100;
  const percent = count > 0 && raw < 10 ? raw.toFixed(1) : Math.round(raw);
  $('#learnedCount').textContent = count;
  $('#progressPct').textContent = `${percent}%`;
  $('#meter').style.width = `${Math.min(100, raw)}%`;
}

let voice = null;
const FEMALE_VOICE = /sonia|libby|hazel|susan|emma|jenny|aria|zira|samantha|victoria|karen|moira|tessa|fiona|serena|kate|ava|allison|joanna|amy|olivia|salli|kimberly|kendra|ivy|raveena|veena|maisie|female/i;
const MALE_VOICE = /\b(?:ryan|daniel|george|guy|david|mark|james|thomas|oliver|male)\b/i;
const voiceId = item => item.voiceURI || `${item.name}|||${item.lang}`;

function voiceScore(item) {
  const language = item.lang.toLowerCase();
  const name = item.name;
  let score = 0;
  if (FEMALE_VOICE.test(name)) score += 1000;
  if (MALE_VOICE.test(name)) score -= 500;
  if (language === 'en-gb') score += 220;
  else if (language.startsWith('en-gb')) score += 200;
  else if (language.startsWith('en')) score += 80;
  if (/natural|neural|premium|enhanced|online/i.test(name)) score += 20;
  return score;
}

function loadVoice() {
  try {
    return localStorage.getItem('ogden850.voice') || '';
  } catch {
    return '';
  }
}

function saveVoice(id) {
  try {
    localStorage.setItem('ogden850.voice', id);
  } catch {
    // Voice selection remains available for the current session.
  }
}

function setupVoices() {
  const select = $('#voiceSelect');
  const hint = $('#voiceHint');
  if (!('speechSynthesis' in window)) {
    select.innerHTML = '<option>此浏览器不支持朗读</option>';
    select.disabled = true;
    hint.textContent = '请更换支持系统语音的浏览器。';
    return;
  }
  const pick = () => {
    const voices = speechSynthesis
      .getVoices()
      .filter(item => item.lang.toLowerCase().startsWith('en'))
      .sort((left, right) => voiceScore(right) - voiceScore(left) || left.name.localeCompare(right.name));
    if (!voices.length) {
      select.innerHTML = '<option>等待本机英语语音…</option>';
      hint.textContent = '尚未检测到英语语音。';
      return;
    }
    const saved = loadVoice();
    voice = voices.find(item => voiceId(item) === saved) || voices[0];
    select.innerHTML = voices.map(item =>
      `<option value="${esc(voiceId(item))}">${esc(item.name)} · ${esc(item.lang)}</option>`).join('');
    select.value = voiceId(voice);
    hint.textContent = `当前：${voice.name} · ${voice.lang}`;
  };
  select.addEventListener('change', () => {
    const selected = speechSynthesis.getVoices().find(item => voiceId(item) === select.value);
    if (!selected) return;
    voice = selected;
    saveVoice(voiceId(voice));
    hint.textContent = `当前：${voice.name} · ${voice.lang}`;
    speakText('This is the selected voice.');
  });
  pick();
  speechSynthesis.addEventListener?.('voiceschanged', pick);
}

function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = voice?.lang || 'en-GB';
  if (voice) utterance.voice = voice;
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);
}

initialise();
