import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const wordsPath = path.join(process.cwd(), 'src/data/words.json');
const words = JSON.parse(await readFile(wordsPath, 'utf8'));
const reviewStatus = '释义与例句已编辑 · 自动校验通过 · 待语言学复核';
const sourceRefs = ['ogden-850', 'basicenglish-org-reference', 'project-editorial'];

const sense = (id, glossEn, glossZh, scopeNoteZh, en, zh, noteZh, patterns = ['be-quality']) => ({
  id,
  partOfSpeech: 'adj. · quality',
  glossEn,
  glossZh,
  scopeNoteZh,
  patterns,
  examples: [{ en, zh, noteZh, tokenStatus: 'valid', reviewStatus }],
  sourceRefs,
  reviewStatus,
});

const reviews = {
  acid: {
    zh: '酸的',
    definition: 'Having a sour, sharp taste or the chemical character of an acid.',
    definitionZh: '有酸味，或具有酸类物质的化学性质。',
    rule: '主要修饰 taste、liquid、substance 等；这里保留物理或化学性质义，不扩展到“尖刻言辞”等比喻义。',
    senses: [sense('acid-core', 'Having an acid taste or chemical character.', '有酸味的；酸性的', '用于味道、液体或物质的酸性特征。', 'The liquid has an acid taste.', '这种液体有酸味。', 'acid 放在 taste 前说明味道性质。', ['determiner-quality-thing'])],
  },
  angry: {
    zh: '愤怒的',
    definition: 'Feeling strong displeasure toward a person, action, or situation.',
    definitionZh: '对人、行为或情况感到强烈不满或愤怒。',
    rule: '常用 be/get angry；需要指出对象时可用 angry with + person，指出原因时结合 about 等关系表达。',
    senses: [sense('angry-core', 'Feeling strong displeasure.', '生气的；愤怒的', '说明人的情绪状态，而不是暂时的身体感觉。', 'The man is angry with me.', '这个男人在生我的气。', 'angry with 引出愤怒所针对的人。')],
  },
  automatic: {
    zh: '自动的',
    definition: 'Working by itself after it has been started, without continuous human control.',
    definitionZh: '启动后不需要人持续控制便能自行运作。',
    rule: '通常修饰 machine、control、process 等；作为关系性质时一般不机械套用比较级。',
    forms: 'automatic（关系性质通常不比较）',
    senses: [sense('automatic-core', 'Working without continuous human control.', '自动运作的', '用于机器、装置或过程自行运行的意义。', 'This machine is automatic.', '这台机器是自动运行的。', 'automatic 说明机器的运行方式。', ['determiner-quality-thing', 'be-quality'])],
  },
  black: {
    zh: '黑色的',
    definition: 'Having the darkest colour, like the colour of the night sky without light.',
    definitionZh: '呈现最深的颜色，如没有光时的夜空。',
    rule: '核心义为颜色；可放在 thing 前或 be 后。比喻性的“邪恶、非法”等意义不纳入本条 Basic 教学义项。',
    senses: [sense('black-core', 'Having the darkest colour.', '黑色的；暗黑的', '用于说明物体表面的颜色。', 'The coat is black.', '这件外套是黑色的。', 'black 在 be 后说明 coat 的颜色。')],
  },
  boiling: {
    zh: '沸腾的',
    definition: 'At the temperature where a liquid forms gas throughout the liquid.',
    definitionZh: '液体达到内部持续形成气体的温度状态。',
    rule: '主要用于 water、liquid 等正在沸腾的状态；不把口语中的“酷热”夸张义当作核心义项。',
    senses: [sense('boiling-core', 'At the temperature where a liquid is turning to gas.', '正在沸腾的', '表示液体的物理状态，通常不比较。', 'The water is boiling.', '水正在沸腾。', 'boiling 说明水已达到沸腾状态。')],
  },
  broken: {
    zh: '破损的;坏掉的',
    definition: 'Damaged so that something is no longer whole or no longer works.',
    definitionZh: '因损坏而不再完整，或不能正常工作。',
    rule: '对物体可表示断裂、破损；对机器或装置可表示失灵。它描述结果状态，通常不比较。',
    senses: [
      sense('broken-1-damaged-not-whole', 'Damaged or separated so that it is no longer whole.', '破损的；断裂的', '说明物体结构已经断开或不完整。', 'The wire is broken.', '电线断了。', 'broken 描述 wire 已经断开的结果状态。'),
      sense('broken-2-not-working', 'Damaged so that a machine or device no longer works.', '坏掉的；失灵的', '用于机器、装置不能正常工作。', 'The machine is broken.', '机器坏了。', '这里 broken 不是说机器碎成多块，而是说它不能工作。'),
    ],
  },
  cheap: {
    zh: '便宜的',
    definition: 'Low in price compared with similar things.',
    definitionZh: '与同类事物相比价格较低。',
    rule: '核心义只说明价格低；不能仅凭 cheap 推断物品质量差。可使用 cheaper、cheapest 比较价格。',
    senses: [sense('cheap-core', 'Low in price.', '价格低的；便宜的', '说明需要支付的钱较少，不自动表示质量低。', 'This book is cheap.', '这本书很便宜。', 'cheap 直接说明 book 的价格性质。')],
  },
  chemical: {
    zh: '化学的',
    definition: 'Connected with substances, their composition, and the changes they undergo.',
    definitionZh: '与物质的组成、性质及其变化有关。',
    rule: '主要放在 thing 前形成 chemical process、chemical change 等关系表达；通常不作程度比较。',
    senses: [sense('chemical-core', 'Connected with chemistry or changes in substances.', '化学的', '属于关系性质，说明事物与化学过程或物质变化有关。', 'This is a chemical process.', '这是一个化学过程。', 'chemical 限定 process 的类型。', ['determiner-quality-thing'])],
  },
  chief: {
    zh: '主要的',
    definition: 'Most important or leading among a group.',
    definitionZh: '在一组事物中最重要或居于首位。',
    rule: '通常放在 thing 前，如 chief reason；它本身已有“首要”含义，一般不再使用比较级。',
    senses: [sense('chief-core', 'Most important or leading.', '首要的；主要的', '用于指出多个对象中最重要的一个。', 'This is the chief reason.', '这是最主要的原因。', 'chief 放在 reason 前表示首要原因。', ['determiner-quality-thing'])],
  },
  clean: {
    zh: '干净的',
    definition: 'Free from dirt or harmful material.',
    definitionZh: '没有污垢或有害物质。',
    rule: '可描述 room、water、cloth 等；be clean 表示状态，keep/make + thing + clean 表示保持或造成干净状态。',
    senses: [sense('clean-core', 'Free from dirt or harmful material.', '干净的；洁净的', '既可说明外观无污垢，也可说明水等没有有害杂质。', 'The room is clean.', '房间很干净。', 'clean 在 be 后说明房间的状态。', ['be-quality', 'make-thing-quality', 'keep-thing-quality'])],
  },
  clear: {
    zh: '透明的;清楚的',
    definition: 'Easy to see through or easy to understand.',
    definitionZh: '容易看穿，或容易理解、没有歧义。',
    rule: '物理义用于 glass、water 等的透明状态；信息义用于 answer、statement、idea 等是否容易理解。',
    senses: [
      sense('clear-1-easy-to-see-through', 'Easy to see through.', '透明的；清澈的', '用于光线能够通过、视线不受阻的物体或液体。', 'The glass is clear.', '这块玻璃是透明的。', 'clear 描述 glass 的可透视性质。'),
      sense('clear-2-easy-to-understand', 'Easy to understand and not uncertain.', '清楚的；明确的', '用于答案、说明或意思容易理解。', 'The answer is clear.', '答案很清楚。', 'clear 说明 answer 没有理解上的含混。'),
    ],
  },
  common: {
    zh: '常见的;共同的',
    definition: 'Usual or frequently found; shared by more than one person or thing.',
    definitionZh: '经常出现，或由多个对象共同具有。',
    rule: 'common + thing 可表示“常见的”；a common + thing 可表示多人共有。具体意义由被修饰的 thing 决定。',
    senses: [
      sense('common-1-usual', 'Usual or frequently found.', '常见的；普通的', '说明某事经常发生或并不罕见。', 'This is a common error.', '这是一个常见错误。', 'common 表示这种 error 经常出现。', ['determiner-quality-thing']),
      sense('common-2-shared', 'Shared by two or more people or things.', '共同的；共有的', '说明多个主体拥有同一目的、特征或事物。', 'We have a common purpose.', '我们有一个共同的目的。', 'common 表示 purpose 由 we 共同拥有。', ['determiner-quality-thing']),
    ],
  },
  complex: {
    zh: '复杂的',
    definition: 'Made of many connected parts and therefore not simple.',
    definitionZh: '由许多相互关联的部分组成，因此不简单。',
    rule: '可描述 system、process、question 等；more/most complex 用于比较复杂程度。',
    senses: [sense('complex-core', 'Made of many connected parts; not simple.', '复杂的', '强调组成部分多或关系难以直接理解。', 'The system is complex.', '这个系统很复杂。', 'complex 说明 system 的组成和关系不简单。')],
  },
  conscious: {
    zh: '有意识的',
    definition: 'Awake and aware of oneself and what is happening.',
    definitionZh: '处于清醒状态，并能意识到自身和周围发生的事情。',
    rule: 'be conscious 表示有意识、清醒；conscious of + thing 表示意识到某事。当前例句使用状态义。',
    senses: [sense('conscious-core', 'Awake and aware of what is happening.', '有意识的；清醒的', '用于区别有意识与失去意识的状态。', 'He is conscious now.', '他现在已经清醒。', 'conscious 在 be 后说明人的意识状态。')],
  },
  cut: {
    zh: '被切开的;割伤的',
    definition: 'Divided or injured by a sharp edge or tool.',
    definitionZh: '被锋利边缘或工具切断、切开或割伤。',
    rule: '可描述物体被切断，也可描述身体部位被割伤；这里是结果 quality，不作为普通 operator 使用。',
    senses: [
      sense('cut-1-divided', 'Divided by a sharp edge or tool.', '被切开或切断的', '用于 cord、cloth 等物体被锋利工具分开。', 'The cord is cut.', '绳子被切断了。', 'cut 描述 cord 被切断后的状态。'),
      sense('cut-2-injured', 'Injured by a sharp edge or tool.', '被割伤的', '用于身体部位出现割伤。', 'His hand is cut.', '他的手被割伤了。', 'cut 描述 hand 受到锐器伤害后的状态。'),
    ],
  },
  dependent: {
    zh: '依赖的',
    definition: 'Needing another person or thing for support, help, or existence.',
    definitionZh: '需要另一个人或事物提供支持、帮助或生存条件。',
    rule: '通常使用 dependent on + person/thing 明确依赖对象；与 independent 相对。',
    senses: [sense('dependent-core', 'Needing support or help from another.', '依赖的；不能独立的', '用 on 引出提供支持的人或事物。', 'The boy is dependent on his mother.', '这个男孩依赖他的母亲。', 'dependent on 说明依赖关系。')],
  },
  early: {
    zh: '早期的;提前的',
    definition: 'Near the beginning of a period, or before the expected time.',
    definitionZh: '接近一段时间的开始，或早于预期时间。',
    rule: '放在 time thing 前可表示某时段早期；放在 be 后可表示事件早于计划或通常时间。',
    senses: [
      sense('early-1-near-beginning', 'Near the beginning of a period of time.', '早期的；早晨较早时段的', '用于 morning、stage 等时间或阶段的开端。', 'We came in the early morning.', '我们清晨就来了。', 'early 放在 morning 前限定时间。', ['determiner-quality-thing']),
      sense('early-2-before-expected', 'Before the expected or usual time.', '提前的；早到的', '说明事件发生得比计划或通常时间早。', 'The train is early.', '火车提前到了。', 'early 在 be 后表示火车早于预定时间。'),
    ],
  },
  elastic: {
    zh: '有弹性的',
    definition: 'Able to stretch or change shape and then return to its former shape.',
    definitionZh: '能够伸展或改变形状，并随后恢复原状。',
    rule: '主要描述 material、cord 等物质性质；可比较弹性程度，但比较应有明确对象。',
    senses: [sense('elastic-core', 'Able to stretch and return to its former shape.', '有弹性的', '用于材料受力变形后能够恢复的性质。', 'This material is elastic.', '这种材料有弹性。', 'elastic 说明 material 的物理性质。')],
  },
  electric: {
    zh: '电的',
    definition: 'Connected with electricity or operated by electric power.',
    definitionZh: '与电有关，或依靠电力运行。',
    rule: '通常放在 thing 前，如 electric light、electric machine；属于关系性质，一般不比较。',
    senses: [sense('electric-core', 'Using or connected with electric power.', '电力驱动的；与电有关的', '用于说明能源或技术类型。', 'This is an electric light.', '这是一盏电灯。', 'electric 限定 light 使用的能源类型。', ['determiner-quality-thing'])],
  },
  fat: {
    zh: '胖的',
    definition: 'Having a large amount of body fat.',
    definitionZh: '身体含有较多脂肪，显得肥胖。',
    rule: '用于描述人或动物的体形；涉及人物时可能带评价色彩，教学例句优先使用中性动物语境。',
    senses: [sense('fat-core', 'Having a large amount of body fat.', '肥胖的；脂肪较多的', '描述身体外形，不等同于 heavy 的重量大。', 'The animal is fat.', '这只动物很胖。', 'fat 说明 animal 的体形。')],
  },
  free: {
    zh: '自由的;免费的',
    definition: 'Not controlled or restricted; available without payment.',
    definitionZh: '不受控制或限制；也可表示无需付款。',
    rule: '自由义表示没有束缚；价格义表示不收费。两种意义都可放在 be 后，但上下文必须明确。',
    senses: [
      sense('free-1-not-controlled', 'Able to act or move without control or restriction.', '自由的；不受限制的', '说明人或动物不受拘束、控制或关押。', 'The bird is free.', '这只鸟自由了。', 'free 表示 bird 不再受到束缚。'),
      sense('free-2-without-payment', 'Available without payment.', '免费的', '说明取得或使用某物不需要付款。', 'This book is free.', '这本书是免费的。', 'free 表示 book 不需要支付费用。'),
    ],
  },
  frequent: {
    zh: '频繁的',
    definition: 'Happening often or many times within a period.',
    definitionZh: '在一段时间内经常或多次发生。',
    rule: '通常修饰 event、error、change 等可重复发生的 thing；more/most frequent 比较发生频率。',
    senses: [sense('frequent-core', 'Happening often or many times.', '频繁的；常发生的', '强调发生次数多，不表示持续时间长。', 'This is a frequent error.', '这是一个经常出现的错误。', 'frequent 表示同类 error 多次出现。', ['determiner-quality-thing'])],
  },
  full: {
    zh: '装满的;完整的',
    definition: 'Containing as much as possible, or including all necessary parts.',
    definitionZh: '容纳量已经达到上限，或包含全部必要部分。',
    rule: '容器义常用 be full，可用 full of + thing 说明内容；完整义放在 account 等 thing 前。',
    senses: [
      sense('full-1-containing-maximum', 'Containing as much as it can hold.', '装满的；满的', '用于 bottle、box、room 等容器或空间。', 'The bottle is full.', '瓶子装满了。', 'full 说明 bottle 已没有更多容纳空间。'),
      sense('full-2-complete', 'Including all necessary parts or information.', '完整的；详尽的', '用于 account、statement 等信息包含必要内容。', 'This is a full account.', '这是一份完整的说明。', 'full 放在 account 前表示内容完整。', ['determiner-quality-thing']),
    ],
  },
  general: {
    zh: '普遍的;概括的',
    definition: 'Including most cases or people, or giving the main points without detail.',
    definitionZh: '适用于大多数情况，或只说明主要内容而不展开细节。',
    rule: 'general rule 表示普遍适用；general account 表示概括说明。与 special、detailed 等范围更窄的表达相对。',
    senses: [
      sense('general-1-widely-applicable', 'Including or affecting most cases or people.', '普遍的；一般适用的', '说明范围广，而不是某个特殊情况。', 'This is the general rule.', '这是普遍适用的规则。', 'general 表示 rule 适用于大多数情况。', ['determiner-quality-thing']),
      sense('general-2-without-detail', 'Giving the main points without detail.', '概括的；大体的', '说明只提供整体情况，不列出所有细节。', 'He gave a general account.', '他作了概括说明。', 'general 限定 account 的详细程度。', ['determiner-quality-thing']),
    ],
  },
  great: {
    zh: '巨大的;重要或杰出的',
    definition: 'Very large in amount or degree; very important or excellent.',
    definitionZh: '数量或程度很大；也可表示非常重要或杰出。',
    rule: 'great + amount/change 等强调规模或程度；great + person/work 等强调重要性或卓越性。不要一律翻译成“伟大的”。',
    senses: [
      sense('great-1-large-in-degree', 'Very large in amount or degree.', '巨大的；程度很高的', '用于 change、amount、distance 等规模或程度。', 'This is a great change.', '这是一次巨大的变化。', 'great 说明 change 的程度很大。', ['determiner-quality-thing']),
      sense('great-2-important-excellent', 'Very important or excellent.', '重要的；杰出的', '用于人物、成果或事物具有很高价值和影响。', 'He is a great man.', '他是一位杰出的人。', 'great 说明 man 的重要性或卓越成就。', ['determiner-quality-thing']),
    ],
  },
};

const targets = Object.keys(reviews);
if (targets.length !== 25) throw new Error(`Expected 25 reviews, received ${targets.length}.`);

for (const wordName of targets) {
  const word = words.find(item => item.word === wordName);
  if (!word) throw new Error(`Missing word: ${wordName}`);
  const review = reviews[wordName];
  word.zh = review.zh;
  word.definition = review.definition;
  word.definitionZh = review.definitionZh;
  word.rule = review.rule;
  if (review.forms) word.forms = review.forms;
  word.senses = review.senses;
  word.patternRefs = [...new Set(review.senses.flatMap(item => item.patterns))];
  word.example = review.senses[0].examples[0].en;
  word.exampleZh = review.senses[0].examples[0].zh;
  word.status = reviewStatus;
  word.reviewStatus = reviewStatus;
  word.provenance.definition = 'project-editorial-quality-review-batch-01';
  word.provenance.rule = 'project-editorial-quality-review-batch-01';
  word.provenance.example = 'project-editorial-quality-review-batch-01';
}

await writeFile(wordsPath, `${JSON.stringify(words, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ reviewed: targets.length, words: targets, reviewStatus }, null, 2));
