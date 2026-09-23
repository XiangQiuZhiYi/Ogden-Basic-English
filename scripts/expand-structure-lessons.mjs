import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const grammarPath = path.join(root, 'src/data/grammar.json');
const patternsPath = path.join(root, 'src/data/patterns.json');
const wordsPath = path.join(root, 'src/data/words.json');

const grammar = JSON.parse(await readFile(grammarPath, 'utf8'));
const patterns = JSON.parse(await readFile(patternsPath, 'utf8'));
const words = JSON.parse(await readFile(wordsPath, 'utf8'));

const newGrammar = [
  {
    id: 'existence-presentation',
    chapter: 'foundations',
    chapterZh: '系统基础',
    titleZh: 'there + be：引出存在与数量',
    summaryZh: '用非地点义的 there 占据主语位置，再用 be 引出某处存在的人或事物。',
    explanationZh: [
      '存在结构先告诉听者“有某物”，再说明该物是什么、多少以及在哪里。',
      'be 的单复数通常与后面最先出现的 thing 协调：There is a book；There are some books。',
      '存在结构中的 there 不等于“在那里”；真正的地点信息通常另行放在句末。',
    ],
    formulas: ['There + be + THING', 'There + be + THING + DIRECTION/PLACE'],
    appliesWhen: ['第一次引出一个人或事物', '说明某处存在什么或有多少'],
    limitations: ['说明已知对象的位置时优先使用 THING + be + PLACE', '不要把存在 there 与表示地点的 there 混为一义'],
    examples: [
      { en: 'There is a book on the table.', zh: '桌上有一本书。', noteZh: 'there 引出一个单数 thing，使用 is。' },
      { en: 'There are some books in the room.', zh: '房间里有一些书。', noteZh: '后面是复数 books，使用 are。' },
    ],
    mistakes: [
      { wrong: 'There is some books in the room.', better: 'There are some books in the room.', reasonZh: 'be 要与后面的复数 books 协调。' },
    ],
    patternRefs: ['there-be-existence'],
    sourceRefs: ['ogden-general', 'grammar-summary'],
    reviewStatus: '项目编辑待复核',
  },
  {
    id: 'scope-degree-placement',
    chapter: 'things-qualities',
    chapterZh: 'Things 与 Qualities',
    titleZh: '范围词与程度词的位置',
    summaryZh: 'only、even、almost 紧靠其作用对象；very、quite 放在 quality 前，enough 的位置取决于它修饰什么。',
    explanationZh: [
      '范围词的位置决定句子限制或强调的是人物、事物、数量还是整个陈述。',
      'very、quite、so 等通常放在 quality 前；almost 放在尚未完全达到的状态、数量或范围前。',
      'enough 放在 thing 前表示数量足够，放在 quality 后表示程度达到需要。',
    ],
    formulas: ['ONLY/EVEN/ALMOST + FOCUS', 'VERY/QUITE/SO + QUALITY', 'ENOUGH + THING / QUALITY + ENOUGH'],
    appliesWhen: ['限制或特别强调信息范围', '表达性质的强度或是否达到需要'],
    limitations: ['only 的位置改变可能改变意思', '程度词不能机械地与所有 qualities 组合'],
    examples: [
      { en: 'Only he saw the change.', zh: '只有他看到了变化。', noteZh: 'only 紧靠 he，限制人物范围。' },
      { en: 'The water is warm enough.', zh: '水已经够暖了。', noteZh: 'enough 放在 quality warm 后。' },
      { en: 'The work is almost complete.', zh: '工作几乎完成了。', noteZh: 'almost 表示接近但尚未完全达到。' },
    ],
    mistakes: [
      { wrong: 'The water is enough warm.', better: 'The water is warm enough.', reasonZh: '修饰 quality 时，enough 通常放在 quality 后。' },
    ],
    patternRefs: ['focus-only-even', 'degree-enough-almost'],
    sourceRefs: ['ogden-general', 'grammar-summary'],
    reviewStatus: '项目编辑待复核',
  },
];

const newPatterns = [
  {
    id: 'there-be-existence', family: 'state', familyZh: '存在与呈现', operators: ['be'],
    formula: 'There + be + THING (+ DIRECTION/PLACE)', functionZh: '引出某人、某物的存在或数量',
    explanationZh: 'there 先占据句子位置，be 再引出存在的 thing；地点通常放在后面。',
    examples: [{ en: 'There is a book on the table.', zh: '桌上有一本书。' }, { en: 'There are some books in the room.', zh: '房间里有一些书。' }],
    variations: ['THERE + IS + SINGULAR THING', 'THERE + ARE + PLURAL THINGS'],
    commonMistakes: ['be 通常与后面最先出现的 thing 在单复数上协调。'], grammarRefs: ['existence-presentation'],
    sourceRefs: ['ogden-general'], reviewStatus: '项目编辑待复核',
  },
  {
    id: 'determiner-quality-thing', family: 'thing-building', familyZh: '构造事物表达', operators: [],
    formula: 'DETERMINER + QUALITY + THING', functionZh: '限定范围并描述一个事物',
    explanationZh: '限定词放在整个 thing 表达的开头，quality 位于中心 thing 之前。',
    examples: [{ en: 'This is a small box.', zh: '这是一个小盒子。' }, { en: 'Every good system has a clear rule.', zh: '每个好系统都有清楚的规则。' }],
    variations: ['A/THE/THIS/THAT + QUALITY + THING', 'ALL/SOME/ANY/EVERY + THING'],
    commonMistakes: ['单数可数 thing 要有合适的限定词；quality 不因复数而变化。'], grammarRefs: ['nouns-articles', 'determiners-pronouns', 'qualities-position'],
    sourceRefs: ['ogden-step-1'], reviewStatus: '项目编辑待复核',
  },
  {
    id: 'some-any-quantity', family: 'thing-building', familyZh: '构造事物表达', operators: ['have'],
    formula: 'some/any + PLURAL THING or AMOUNT', functionZh: '表达不具体的数量或范围',
    explanationZh: 'some 常用于肯定陈述；any 常用于疑问、否定或“不论哪一个”的范围。',
    examples: [{ en: 'I have some water.', zh: '我有一些水。' }, { en: 'Do you have any bread?', zh: '你有面包吗？' }],
    variations: ['SOME + THING', 'ANY + THING', 'NOT + ANY + THING'],
    commonMistakes: ['先判断 thing 是可数复数还是不可数数量，再选择形式。'], grammarRefs: ['nouns-articles', 'determiners-pronouns'],
    sourceRefs: ['ogden-general'], reviewStatus: '项目编辑待复核',
  },
  {
    id: 'comparison-than', family: 'quality', familyZh: '性质与比较', operators: ['be'],
    formula: 'THING + be + COMPARATIVE QUALITY + than + THING', functionZh: '比较两个对象的不等程度',
    explanationZh: '比较形式说明第一项在某种性质上高于或低于第二项，than 引出比较基准。',
    examples: [{ en: 'This box is smaller than that box.', zh: '这个盒子比那个盒子小。' }, { en: 'This road is wider than that road.', zh: '这条路比那条路宽。' }],
    variations: ['-ER QUALITY + THAN', 'MORE/LESS + QUALITY + THAN'],
    commonMistakes: ['只有语义可分程度的 quality 才能比较；不规则形式要单独掌握。'], grammarRefs: ['quality-comparison'],
    sourceRefs: ['ogden-general'], reviewStatus: '项目编辑待复核',
  },
  {
    id: 'equality-as', family: 'quality', familyZh: '性质与比较', operators: ['be'],
    formula: 'THING + be + as + QUALITY + as + THING', functionZh: '表达两个对象在某性质上程度相同',
    explanationZh: '第一个 as 放在 quality 前，第二个 as 引出比较对象。',
    examples: [{ en: 'This room is as warm as that room.', zh: '这个房间和那个房间一样暖。' }, { en: 'This road is as wide as that road.', zh: '这条路和那条路一样宽。' }],
    variations: ['AS + QUALITY + AS', 'NOT + AS + QUALITY + AS'],
    commonMistakes: ['同等比较必须保留前后两个 as。'], grammarRefs: ['quality-comparison'],
    sourceRefs: ['ogden-general'], reviewStatus: '项目编辑待复核',
  },
  {
    id: 'part-of-relation', family: 'relation', familyZh: '事物关系', operators: ['be'],
    formula: 'THING + of + THING', functionZh: '表达部分、所属、材料、数量或主题关系',
    explanationZh: 'of 把两个 things 连接起来；具体关系由两侧事物和语境共同决定。',
    examples: [{ en: 'The top of the box is open.', zh: '盒子的顶部是打开的。' }, { en: 'The colour of the wall is white.', zh: '墙的颜色是白色的。' }],
    variations: ['PART + OF + WHOLE', 'AMOUNT + OF + THING'],
    commonMistakes: ['不要把所有中文“的”都机械换成 of；先判断英语中的关系。'], grammarRefs: ['basic-order', 'nouns-articles'],
    sourceRefs: ['ogden-general'], reviewStatus: '项目编辑待复核',
  },
  {
    id: 'time-before-after', family: 'expansion', familyZh: '时间关系', operators: ['come', 'go', 'be'],
    formula: 'STATEMENT + before/after/till/when + TIME or STATEMENT', functionZh: '说明事件的先后、持续终点或发生时间',
    explanationZh: '时间结构可以连接一个时间 thing，也可以连接另一个具有完整主干的事件。',
    examples: [{ en: 'I came before the rain.', zh: '我在下雨前来了。' }, { en: 'He went after the meeting.', zh: '他在会议之后走了。' }],
    variations: ['BEFORE/AFTER + TIME', 'WHEN + STATEMENT', 'TILL + TIME'],
    commonMistakes: ['连接完整事件时，时间分句内部仍要有清楚的主干。'], grammarRefs: ['clauses-connectives', 'operator-time'],
    sourceRefs: ['ogden-general'], reviewStatus: '项目编辑待复核',
  },
  {
    id: 'relative-who-that', family: 'expansion', familyZh: '识别与说明', operators: [],
    formula: 'THING + who/that + STATEMENT', functionZh: '给人物或事物增加识别信息',
    explanationZh: 'who 通常连接人物信息；that 可连接人物或事物，并把说明紧接在被说明的 thing 后。',
    examples: [{ en: 'The man who came here is my friend.', zh: '来到这里的那个人是我的朋友。' }, { en: 'The book that you gave me is here.', zh: '你给我的那本书在这里。' }],
    variations: ['PERSON + WHO + STATEMENT', 'THING + THAT + STATEMENT'],
    commonMistakes: ['先确定 who/that 在说明哪个 thing，避免说明信息离它过远。'], grammarRefs: ['clauses-connectives'],
    sourceRefs: ['ogden-general'], reviewStatus: '项目编辑待复核',
  },
  {
    id: 'focus-only-even', family: 'expansion', familyZh: '范围与强调', operators: [],
    formula: 'only/even + FOCUS', functionZh: '限制信息范围或突出意外成分',
    explanationZh: 'only 与 even 尽量紧靠所限制或强调的词组，以免改变句意。',
    examples: [{ en: 'Only he saw the change.', zh: '只有他看到了变化。' }, { en: 'Even he saw the change.', zh: '连他也看到了变化。' }],
    variations: ['ONLY + PERSON/THING/AMOUNT', 'EVEN + PERSON/THING/STATEMENT'],
    commonMistakes: ['移动 only 可能改变限制范围；写完后要检查意思是否唯一。'], grammarRefs: ['scope-degree-placement'],
    sourceRefs: ['grammar-summary'], reviewStatus: '项目编辑待复核',
  },
  {
    id: 'degree-enough-almost', family: 'quality', familyZh: '程度与界限', operators: ['be'],
    formula: 'almost + STATE / QUALITY + enough', functionZh: '表达接近界限或达到需要的程度',
    explanationZh: 'almost 表示尚未完全达到；enough 放在 quality 后表示程度已经满足需要。',
    examples: [{ en: 'The work is almost complete.', zh: '工作几乎完成了。' }, { en: 'The water is warm enough.', zh: '水已经够暖了。' }],
    variations: ['ALMOST + QUALITY/AMOUNT', 'QUALITY + ENOUGH', 'ENOUGH + THING'],
    commonMistakes: ['almost 和 enough 表达的界限方向不同，不要混用。'], grammarRefs: ['scope-degree-placement'],
    sourceRefs: ['grammar-summary'], reviewStatus: '项目编辑待复核',
  },
];

function appendUnique(target, values) {
  target.push(...values.filter(value => !target.includes(value)));
}

for (const item of newGrammar) {
  if (!grammar.some(existing => existing.id === item.id)) grammar.push(item);
}
for (const item of newPatterns) {
  if (!patterns.some(existing => existing.id === item.id)) patterns.push(item);
}

const grammarLinks = {
  'basic-order': ['there-be-existence', 'part-of-relation'],
  'operator-time': ['time-before-after'],
  'nouns-articles': ['determiner-quality-thing', 'some-any-quantity', 'part-of-relation'],
  'qualities-position': ['determiner-quality-thing'],
  'quality-comparison': ['comparison-than', 'equality-as'],
  'determiners-pronouns': ['determiner-quality-thing', 'some-any-quantity'],
  'clauses-connectives': ['time-before-after', 'relative-who-that'],
};
for (const rule of grammar) appendUnique(rule.patternRefs, grammarLinks[rule.id] ?? []);

const wordPatternLinks = {
  there: ['there-be-existence'],
  a: ['determiner-quality-thing'], the: ['determiner-quality-thing'], this: ['determiner-quality-thing'], that: ['determiner-quality-thing', 'relative-who-that'],
  all: ['determiner-quality-thing'], every: ['determiner-quality-thing'], no: ['determiner-quality-thing'], other: ['determiner-quality-thing'], such: ['determiner-quality-thing'],
  some: ['some-any-quantity'], any: ['some-any-quantity'], little: ['some-any-quantity'], much: ['some-any-quantity'],
  than: ['comparison-than'], as: ['equality-as'], of: ['part-of-relation'],
  before: ['time-before-after'], after: ['time-before-after'], till: ['time-before-after'], when: ['time-before-after'],
  who: ['relative-who-that'], for: ['part-of-relation'],
  only: ['focus-only-even'], even: ['focus-only-even'], almost: ['degree-enough-almost'], enough: ['degree-enough-almost'],
  very: ['degree-enough-almost'], quite: ['degree-enough-almost'], so: ['degree-enough-almost'],
};
for (const word of words) {
  const links = wordPatternLinks[word.word] ?? [];
  appendUnique(word.patternRefs, links);
  for (const sense of word.senses) appendUnique(sense.patterns, links);
}

await Promise.all([
  writeFile(grammarPath, `${JSON.stringify(grammar, null, 2)}\n`, 'utf8'),
  writeFile(patternsPath, `${JSON.stringify(patterns, null, 2)}\n`, 'utf8'),
  writeFile(wordsPath, `${JSON.stringify(words, null, 2)}\n`, 'utf8'),
]);

console.log(JSON.stringify({ grammarRules: grammar.length, sentencePatterns: patterns.length, linkedWords: Object.keys(wordPatternLinks).length }, null, 2));
