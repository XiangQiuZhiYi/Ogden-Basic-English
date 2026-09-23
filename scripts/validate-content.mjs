import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const words = JSON.parse(await readFile(path.join(root, 'src/data/words.json'), 'utf8'));
const meta = JSON.parse(await readFile(path.join(root, 'src/data/meta.json'), 'utf8'));
const grammar = JSON.parse(await readFile(path.join(root, 'src/data/grammar.json'), 'utf8'));
const patterns = JSON.parse(await readFile(path.join(root, 'src/data/patterns.json'), 'utf8'));
const appScript = await readFile(path.join(root, 'src/js/app.js'), 'utf8');
const template = await readFile(path.join(root, 'src/app.template.html'), 'utf8');

const errors = [];
const warnings = [];
const fail = message => errors.push(message);
const warn = message => warnings.push(message);
const requiredFields = [
  'id', 'word', 'ipa', 'category', 'categoryIndex', 'originalIndex', 'subgroup',
  'pos', 'zh', 'definition', 'definitionZh', 'forms', 'rule', 'example',
  'exampleZh', 'reviewStatus', 'source', 'provenance',
  'senses', 'patternRefs',
];

if (words.length !== 850) fail(`Expected 850 words, received ${words.length}.`);

const expectedCounts = Object.fromEntries(
  Object.entries(meta.categories).map(([category, value]) => [category, value.count]),
);
const actualCounts = Object.fromEntries(
  Object.entries(Object.groupBy(words, word => word.category))
    .map(([category, items]) => [category, items.length]),
);

for (const [category, expected] of Object.entries(expectedCounts)) {
  if (actualCounts[category] !== expected) {
    fail(`${category}: expected ${expected}, received ${actualCounts[category] ?? 0}.`);
  }
}

const ids = new Set();
const originalIndexes = new Set();
const forbiddenForms = /\b(?:acider|acidest|chiefer|chiefest|cuter|cutest|equaler|equalest|firster|firstest|fixeder|fixedest|flater|flatest|greier|greiest|liker|likest|maler|malest|opener|openest|paster|pastest|righter|rightest|samer|samest|tireder|tiredest|awaker|awakest|benter|bentest|deader|deadest|iller|illest|laster|lastest|lefter|leftest|mixeder|mixedest|shuter|shutest|solider|solidest|wronger|wrongest)\b/iu;

for (const [index, word] of words.entries()) {
  for (const field of requiredFields) {
    if (word[field] === undefined || word[field] === null || word[field] === '') {
      fail(`#${index + 1} ${word.word ?? '(unknown)'}: missing ${field}.`);
    }
  }
  if (ids.has(word.id)) fail(`Duplicate id: ${word.id}.`);
  if (originalIndexes.has(word.originalIndex)) fail(`Duplicate originalIndex: ${word.originalIndex}.`);
  ids.add(word.id);
  originalIndexes.add(word.originalIndex);
  if (word.originalIndex !== index) {
    fail(`${word.word}: originalIndex ${word.originalIndex}, expected ${index}.`);
  }
  if (forbiddenForms.test(word.forms)) fail(`${word.word}: forbidden generated form in “${word.forms}”.`);
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/u.test(JSON.stringify(word))) {
    fail(`${word.word}: contains an unexpected control character.`);
  }
  if (/^This thing is [a-z-]+\.$/iu.test(word.example)) {
    warn(`${word.word}: still uses the generic quality example template.`);
  }
  if (
    /^A (?:thing|quality) given the name/u.test(word.definition)
    || /^A thing, act, condition, or idea given the name/u.test(word.definition)
    || /^A thing, animal, or person you may see, with the name/u.test(word.definition)
    || word.definition === 'A structure word used in Basic English.'
  ) {
    warn(`${word.word}: English definition remains generic.`);
  }
  if (
    (word.category === 'general_things' || word.category === 'picturable_things')
    && new RegExp(`^The ${word.word.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')} (?:is|are) here\\.$`, 'iu').test(word.example)
  ) {
    warn(`${word.word}: still uses the generic thing example template.`);
  }
  if (!Array.isArray(word.senses) || !word.senses.length) {
    fail(`${word.word}: senses must be a non-empty array.`);
  }
  if (/[;；]/u.test(word.zh) && word.senses.length < 2) {
    fail(`${word.word}: the source gloss marks distinct meanings but only one sense is present.`);
  }
}

for (let index = 0; index < words.length; index += 1) {
  if (!originalIndexes.has(index)) fail(`Missing originalIndex: ${index}.`);
}

for (const operator of meta.operators) {
  const item = words.find(word => word.word === operator);
  if (!item || item.category !== 'operations') fail(`Missing operator: ${operator}.`);
}

if (meta.operators.length !== 18) fail(`Expected 18 operators, received ${meta.operators.length}.`);

const allowedTokens = new Set(words.map(word => word.word.toLowerCase()));
for (const token of `
  an me my mine myself we us our ours ourselves you your yours yourself yourselves
  he him his himself she her hers herself it its itself they them their theirs themselves
  who whom whose these those one two three four five six seven eight nine ten hundred thousand million
  what another people into burning slowly
`.trim().split(/\s+/u)) allowedTokens.add(token);
for (const word of words) {
  for (const token of word.forms.toLowerCase().match(/[a-z]+(?:-[a-z]+)?/gu) ?? []) {
    allowedTokens.add(token);
  }
}

function validateSentence(sentence, label) {
  const unknown = (sentence.toLowerCase().match(/[a-z]+(?:-[a-z]+)?/gu) ?? [])
    .filter(token => !allowedTokens.has(token));
  if (unknown.length) fail(`${label}: non-Basic token(s) ${[...new Set(unknown)].join(', ')} in “${sentence}”.`);
}

for (const word of words) validateSentence(word.example, `${word.word} example`);
const senseIds = new Set();
let senseCount = 0;
let senseExampleCount = 0;
for (const word of words) {
  for (const sense of word.senses ?? []) {
    senseCount += 1;
    if (!sense.id || senseIds.has(sense.id)) fail(`${word.word}: duplicate or missing sense id ${sense.id ?? '(missing)'}.`);
    senseIds.add(sense.id);
    for (const field of ['partOfSpeech', 'glossEn', 'glossZh', 'scopeNoteZh', 'reviewStatus']) {
      if (!sense[field]) fail(`${word.word}/${sense.id}: missing ${field}.`);
    }
    if (!Array.isArray(sense.examples) || !sense.examples.length) {
      fail(`${word.word}/${sense.id}: examples must be a non-empty array.`);
      continue;
    }
    for (const [index, example] of sense.examples.entries()) {
      senseExampleCount += 1;
      if (!example.en || !example.zh) fail(`${word.word}/${sense.id}: example ${index + 1} is incomplete.`);
      else validateSentence(example.en, `${word.word}/${sense.id} example ${index + 1}`);
    }
  }
}

const grammarIds = new Set();
for (const rule of grammar) {
  if (!rule.id || grammarIds.has(rule.id)) fail(`Duplicate or missing grammar id: ${rule.id ?? '(missing)'}.`);
  grammarIds.add(rule.id);
  for (const field of ['chapter', 'chapterZh', 'titleZh', 'summaryZh', 'reviewStatus']) {
    if (!rule[field]) fail(`${rule.id}: missing grammar field ${field}.`);
  }
  if (!Array.isArray(rule.explanationZh) || !rule.explanationZh.length) fail(`${rule.id}: missing explanation.`);
  if (!Array.isArray(rule.examples) || rule.examples.length < 2) fail(`${rule.id}: expected at least two examples.`);
  for (const [index, example] of (rule.examples ?? []).entries()) {
    if (!example.en || !example.zh) fail(`${rule.id}: grammar example ${index + 1} is incomplete.`);
    else validateSentence(example.en, `${rule.id} grammar example ${index + 1}`);
  }
}

const patternIds = new Set();
for (const pattern of patterns) {
  if (!pattern.id || patternIds.has(pattern.id)) fail(`Duplicate or missing pattern id: ${pattern.id ?? '(missing)'}.`);
  patternIds.add(pattern.id);
  for (const field of ['family', 'familyZh', 'formula', 'functionZh', 'explanationZh', 'reviewStatus']) {
    if (!pattern[field]) fail(`${pattern.id}: missing pattern field ${field}.`);
  }
  for (const operator of pattern.operators ?? []) {
    if (!meta.operators.includes(operator)) fail(`${pattern.id}: unknown operator ${operator}.`);
  }
  if (!Array.isArray(pattern.examples) || pattern.examples.length < 2) fail(`${pattern.id}: expected at least two examples.`);
  for (const [index, example] of (pattern.examples ?? []).entries()) {
    if (!example.en || !example.zh) fail(`${pattern.id}: pattern example ${index + 1} is incomplete.`);
    else validateSentence(example.en, `${pattern.id} pattern example ${index + 1}`);
  }
}

for (const word of words) {
  for (const id of word.patternRefs ?? []) if (!patternIds.has(id)) fail(`${word.word}: unknown patternRef ${id}.`);
  for (const sense of word.senses ?? []) {
    for (const id of sense.patterns ?? []) if (!patternIds.has(id)) fail(`${word.word}/${sense.id}: unknown pattern ${id}.`);
  }
}
for (const rule of grammar) {
  for (const id of rule.patternRefs ?? []) if (!patternIds.has(id)) fail(`${rule.id}: unknown patternRef ${id}.`);
}
for (const pattern of patterns) {
  for (const id of pattern.grammarRefs ?? []) if (!grammarIds.has(id)) fail(`${pattern.id}: unknown grammarRef ${id}.`);
}
const communicationSection = template.match(/<section\s+class="shell communication[\s\S]*?<\/section>\s*<footer/u)?.[0] ?? '';
const communicationPhrases = [...communicationSection.matchAll(/<strong\s+lang="en"[^>]*>\s*([^<]+?)<\/strong\s*>/gu)]
  .map(match => match[1].trim());
if (communicationPhrases.length !== 56) {
  fail(`Expected 56 communication phrases, received ${communicationPhrases.length}.`);
}
for (const [index, phrase] of communicationPhrases.entries()) {
  validateSentence(phrase, `Communication phrase ${index + 1}`);
}

try {
  new vm.Script(appScript, { filename: 'src/js/app.js' });
} catch (error) {
  fail(`App JavaScript syntax error: ${error.message}`);
}

for (const placeholder of ['{{STYLES}}', '{{DATA}}', '{{APP_SCRIPT}}', '{{VERSION}}', '{{REVIEW_SUMMARY}}']) {
  if (!template.includes(placeholder)) fail(`Template is missing ${placeholder}.`);
}

if (!template.includes('id="onlyUnlearned"')) {
  fail('Template is missing the only-unlearned filter control.');
}
if (!/onlyUnlearned:\s*false/u.test(appScript)) {
  fail('App state is missing the onlyUnlearned flag.');
}
if (!/!state\.onlyUnlearned\s*\|\|\s*!state\.learned\.has\(word\.id\)/u.test(appScript)) {
  fail('Word filtering does not exclude learned words when onlyUnlearned is active.');
}

if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/u.test(appScript)) {
  fail('App JavaScript contains an unexpected control character.');
}

const reviewCounts = Object.fromEntries(
  Object.entries(Object.groupBy(words, word => word.reviewStatus))
    .map(([status, items]) => [status, items.length]),
);

if (warnings.length) {
  console.warn(`Warnings (${warnings.length}):`);
  for (const message of warnings.slice(0, 20)) console.warn(`- ${message}`);
  if (warnings.length > 20) console.warn(`- … ${warnings.length - 20} more`);
}

if (errors.length) {
  console.error(`Validation failed (${errors.length}):`);
  for (const message of errors) console.error(`- ${message}`);
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({
    valid: true,
    total: words.length,
    categories: actualCounts,
    operators: meta.operators.length,
    senses: senseCount,
    senseExamples: senseExampleCount,
    grammarRules: grammar.length,
    sentencePatterns: patterns.length,
    reviewCounts,
    warnings: warnings.length,
  }, null, 2));
}
