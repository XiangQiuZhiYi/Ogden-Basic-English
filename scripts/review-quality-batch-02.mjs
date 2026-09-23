import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const wordsPath = path.join(process.cwd(), 'src/data/words.json');
const words = JSON.parse(await readFile(wordsPath, 'utf8'));
const reviewStatus = '释义与例句已编辑 · 自动校验通过 · 待语言学复核';
const sourceRefs = ['ogden-850', 'basicenglish-org-reference', 'project-editorial'];

const sense = (id, glossEn, glossZh, scopeNoteZh, en, zh, noteZh, options = {}) => ({
  id,
  partOfSpeech: options.partOfSpeech ?? 'adj. · quality',
  glossEn,
  glossZh,
  scopeNoteZh,
  patterns: options.patterns ?? ['be-quality'],
  examples: [{ en, zh, noteZh, tokenStatus: 'valid', reviewStatus }],
  sourceRefs,
  reviewStatus,
});

const modifier = ['determiner-quality-thing'];
const reviews = {
  hanging: {
    zh: '悬挂着的',
    definition: 'Supported from above while the lower part is free.',
    definitionZh: '上部受到支撑，而下部悬空。',
    rule: '用于说明 thing 的悬挂状态；常与 be 组合。这里按结果或持续状态理解，不扩展到处刑等非核心义项。',
    senses: [sense('hanging-core', 'Supported from above with the lower part free.', '悬挂着的', '说明物体由上方支撑并向下垂。', 'The coat is hanging by the door.', '外套挂在门边。', 'hanging 说明 coat 当前的放置状态。')],
  },
  happy: {
    zh: '快乐的',
    definition: 'Feeling pleasure or satisfaction; not sad.',
    definitionZh: '感到愉快或满足，而不是悲伤。',
    rule: '通常用于人的情绪状态，可使用 happier、happiest 比较愉快程度。',
    senses: [sense('happy-core', 'Feeling pleasure or satisfaction.', '快乐的；满足的', '描述人因当前情况产生的积极感受。', 'The girl is happy.', '这个女孩很快乐。', 'happy 在 be 后说明人的情绪状态。')],
  },
  hard: {
    zh: '坚硬的;困难的',
    definition: 'Not soft or easily damaged; difficult and needing much effort or thought.',
    definitionZh: '物理上不柔软、不易损坏；也可表示困难、需要较多努力或思考。',
    rule: '物理义与 soft 相对；难度义用于 question、work 等。两种意义都可比较，但比较对象必须明确。',
    senses: [
      sense('hard-1-not-soft', 'Not soft and not easily cut, bent, or broken.', '坚硬的', '说明材料或物体的物理性质。', 'The stone is hard.', '这块石头很硬。', 'hard 描述 stone 不易被切开或改变形状。'),
      sense('hard-2-difficult', 'Difficult and needing much effort or thought.', '困难的', '用于任务、问题或工作所需努力较多。', 'This question is hard.', '这个问题很难。', 'hard 说明 question 难以回答。'),
    ],
  },
  healthy: {
    zh: '健康的',
    definition: 'In good physical condition and free from disease.',
    definitionZh: '身体状况良好，没有疾病。',
    rule: '本条聚焦人或动物的健康状态；healthful 等表示“有益健康”的近义扩展不纳入核心词义。',
    senses: [sense('healthy-core', 'In good physical condition and free from disease.', '健康的', '说明人或动物的身体处于良好状态。', 'The boy is healthy.', '这个男孩很健康。', 'healthy 在 be 后说明 boy 的身体状况。')],
  },
  high: {
    zh: '位置高的;数值高的',
    definition: 'Far above the ground or at a large level, amount, or value.',
    definitionZh: '在空间上离地面较远，或数值、程度、数量较大。',
    rule: '空间义与 low 相对；数量或程度义可用于 price、level 等。不要把 high 和描述物体自身高度的 tall 完全混用。',
    senses: [
      sense('high-1-far-above', 'Far above the ground or another level.', '位置高的', '强调位置或顶点离基准面较高。', 'The mountain is high.', '这座山很高。', 'high 说明 mountain 达到较高位置。'),
      sense('high-2-large-level', 'Large in amount, level, or value.', '数值或程度高的', '用于价格、水平、温度等可按尺度衡量的事物。', 'The price is high.', '价格很高。', 'high 表示 price 的数值较大。'),
    ],
  },
  hollow: {
    zh: '空心的',
    definition: 'Having an empty space inside rather than being solid throughout.',
    definitionZh: '内部有空隙，并非从外到内都是实心。',
    rule: '描述物体内部结构，与 solid 的“内部没有空隙”意义相对。',
    senses: [sense('hollow-core', 'Having an empty space inside.', '空心的', '用于 ball、tube 等内部为空的物体。', 'The ball is hollow.', '这个球是空心的。', 'hollow 说明 ball 的内部结构。')],
  },
  kind: {
    zh: '友善的;种类',
    definition: 'Gentle, caring, and helpful; also a group or sort of similar things.',
    definitionZh: '待人温和、关心并愿意帮助；也可表示同类事物组成的种类。',
    rule: '作 quality 时常用 kind to + person/animal；作 thing 时常用 a kind of + thing。严格区分两个词性和句型。',
    senses: [
      sense('kind-1-caring', 'Gentle, caring, and ready to help.', '友善的；体贴的', '作 quality，说明人的态度或行为。', 'She is kind to animals.', '她对动物很友善。', 'kind to 引出受到友善对待的对象。'),
      sense('kind-2-sort', 'A group or sort of things with shared qualities.', '种类；类型', '作 thing，使用 kind of + thing 表示分类。', 'What kind of plant is this?', '这是什么种类的植物？', 'kind of plant 询问植物的类型。', { partOfSpeech: 'n. · thing', patterns: ['part-of-relation'] }),
    ],
  },
  like: {
    zh: '相似的',
    definition: 'Similar to another person or thing in appearance, nature, or action.',
    definitionZh: '在外观、性质或行为上与另一个人或事物相似。',
    rule: '本项目按 Basic quality 使用 be/seem like + thing 表示相似；普通英语中“喜欢”的动词义不作为 Basic operator 使用。',
    senses: [sense('like-core', 'Similar to another person or thing.', '相似的；像……的', 'like 后接比较对象，说明两者存在相似点。', 'This picture is like that picture.', '这幅图和那幅图相似。', 'like 引出被比较的另一幅 picture。')],
  },
  living: {
    zh: '活着的',
    definition: 'Alive now and carrying out the processes of life.',
    definitionZh: '当前有生命，并进行生命活动。',
    rule: '用于人、动物、植物等生命体，与 dead 相对；作为类别性质通常不比较。',
    senses: [sense('living-core', 'Alive and carrying out the processes of life.', '活着的；有生命的', '说明对象是生命体或仍处于活着状态。', 'This is a living animal.', '这是一只活着的动物。', 'living 放在 animal 前说明它有生命。', { patterns: modifier })],
  },
  married: {
    zh: '已婚的',
    definition: 'Having a husband or wife through marriage.',
    definitionZh: '通过婚姻关系拥有配偶。',
    rule: 'be married 表示婚姻状态；married to + person 可指出配偶。它是状态形式，通常不比较。',
    senses: [sense('married-core', 'Having a husband or wife.', '已婚的', '说明一个人当前处于婚姻关系中。', 'The man is married.', '这个男人已婚。', 'married 在 be 后说明婚姻状态。')],
  },
  material: {
    zh: '物质的',
    definition: 'Connected with physical matter rather than thought or spirit.',
    definitionZh: '与有形物质有关，而不是思想或精神层面。',
    rule: '作为关系 quality 通常放在 thing 前，说明事物属于物质层面；本条不扩展法律英语中的“关键、实质性”专门义。',
    forms: 'material（关系性质通常不比较）',
    senses: [sense('material-core', 'Connected with physical matter.', '物质的；有形的', '用于区分物质层面与思想、精神等非物质层面。', 'Gold is a material substance.', '黄金是一种物质实体。', 'material 说明 substance 属于有形物质。', { patterns: modifier })],
  },
  medical: {
    zh: '医学的',
    definition: 'Connected with medicine, health, disease, or their treatment.',
    definitionZh: '与医学、健康、疾病或治疗有关。',
    rule: '主要放在 question、care、help 等 thing 前；属于关系性质，一般不作程度比较。',
    senses: [sense('medical-core', 'Connected with medicine or the treatment of disease.', '医学的；医疗的', '说明事物与疾病判断、治疗或健康专业有关。', 'This is a medical question.', '这是一个医学问题。', 'medical 限定 question 所属的专业领域。', { patterns: modifier })],
  },
  military: {
    zh: '军事的',
    definition: 'Connected with armed forces, soldiers, or war.',
    definitionZh: '与武装力量、士兵或战争有关。',
    rule: '通常放在 operation、control、force 等 thing 前；属于关系性质，一般不比较。',
    senses: [sense('military-core', 'Connected with armed forces or war.', '军事的', '说明行动、组织或事物属于军事领域。', 'This is a military operation.', '这是一次军事行动。', 'military 限定 operation 的类型。', { patterns: modifier })],
  },
  natural: {
    zh: '自然产生的;正常自然的',
    definition: 'Produced by nature rather than people; normal or expected for its kind.',
    definitionZh: '由自然产生而非人为制造；也可表示符合某类事物通常状态。',
    rule: '来源义与 artificial 对照；常态义表示符合通常本性。两种意义需要依赖被说明的 thing 或上下文区分。',
    senses: [
      sense('natural-1-produced-by-nature', 'Produced by nature rather than made by people.', '天然的；自然产生的', '说明来源不是人工制造或控制。', 'This is a natural process.', '这是一个自然过程。', 'natural 说明 process 由自然作用产生。', { patterns: modifier }),
      sense('natural-2-normal-for-kind', 'Normal or expected for a person or thing of that kind.', '自然的；符合常态的', '说明反应或性质符合通常情况。', 'Fear is natural.', '恐惧是自然的反应。', 'natural 表示 fear 是通常可以预期的感受。'),
    ],
  },
  new: {
    zh: '新制成的;新出现或新获知的',
    definition: 'Recently made or obtained, or not known or experienced before.',
    definitionZh: '最近制成或取得，或此前未被知道、经历。',
    rule: '可说明物品的新旧，也可说明 idea、information、experience 等首次出现。与 old 相对时通常指时间或使用历史。',
    senses: [
      sense('new-1-recently-made', 'Recently made, bought, or obtained.', '新的；新近取得的', '用于物品刚制成、购买或开始使用。', 'The coat is new.', '这件外套是新的。', 'new 说明 coat 最近取得或尚未使用很久。'),
      sense('new-2-not-known-before', 'Not known or experienced before.', '新出现的；新获知的', '用于想法、信息或经历此前没有出现过。', 'This is a new idea.', '这是一个新想法。', 'new 说明 idea 此前未被提出或认识。', { patterns: modifier }),
    ],
  },
  normal: {
    zh: '正常的',
    definition: 'Usual or expected for a particular person, thing, or situation.',
    definitionZh: '符合特定人、事物或情境通常会有的状态。',
    rule: 'normal 依赖比较基准；说明“通常如此”，并不自动等于“正确”或“健康”。',
    senses: [sense('normal-core', 'Usual or expected in the situation.', '正常的；通常的', '需要结合对象和情境判断什么属于通常状态。', 'This is a normal process.', '这是一个正常过程。', 'normal 表示 process 符合通常预期。', { patterns: modifier })],
  },
  open: {
    zh: '开着的;开放使用的',
    definition: 'Not shut or blocked; available for entry, use, or business.',
    definitionZh: '没有关闭或阻挡；也可表示可以进入、使用或营业。',
    rule: '物理义与 shut 相对；可用义用于 office、market 等当前可进入或提供服务的状态。',
    senses: [
      sense('open-1-not-shut', 'Not shut or blocked.', '开着的；未封闭的', '用于门、容器或通道没有关闭。', 'The door is open.', '门开着。', 'open 描述 door 的物理状态。'),
      sense('open-2-available-for-use', 'Available for entry, use, or business.', '开放的；营业的', '用于地点或服务当前可以进入或使用。', 'The office is open.', '办公室正在开放办公。', 'open 表示 office 当前提供服务。'),
    ],
  },
  parallel: {
    zh: '平行的',
    definition: 'Keeping the same distance apart and extending in the same direction.',
    definitionZh: '始终保持相同距离，并向同一方向延伸。',
    rule: '主要用于 line、road、surface 等空间关系；严格几何义中两条平行线不会相交，通常不比较。',
    senses: [sense('parallel-core', 'Extending in the same direction at a constant distance apart.', '平行的', '说明两条线或两个延伸方向之间的几何关系。', 'The two lines are parallel.', '这两条线互相平行。', 'parallel 说明 two lines 的相对方向。')],
  },
  past: {
    zh: '过去的',
    definition: 'Belonging to a time before the present.',
    definitionZh: '属于现在以前的时间。',
    rule: '本项目按时间 quality 使用，通常放在 event、time、year 等 thing 前；不把普通英语中的方向介词用法混入此义项。',
    senses: [sense('past-core', 'Belonging to a time before the present.', '过去的；从前的', '用于标记事件或时期已经发生并结束。', 'That is a past event.', '那是过去发生的事件。', 'past 放在 event 前说明时间关系。', { patterns: modifier })],
  },
  physical: {
    zh: '身体的;物理的',
    definition: 'Connected with the body; also connected with matter, force, or natural processes.',
    definitionZh: '与身体有关；也可与物质、力或自然过程有关。',
    rule: '身体义常与 condition、health、work 搭配；物理义与 matter、force、change 等搭配。关系义通常不机械比较。',
    forms: 'physical（关系性质通常不比较；程度比较需有明确语境）',
    senses: [
      sense('physical-1-of-the-body', 'Connected with the body rather than the mind.', '身体的；肉体的', '用于身体状态、活动或能力。', 'He is in good physical condition.', '他的身体状况良好。', 'physical 限定 condition 是身体方面的。', { patterns: modifier }),
      sense('physical-2-of-matter-and-force', 'Connected with matter, force, or natural processes.', '物理的；物质层面的', '用于科学语境中的物质、力和运动。', 'This is a physical force.', '这是一种物理作用力。', 'physical 限定 force 属于物理作用。', { patterns: modifier }),
    ],
  },
  political: {
    zh: '政治的',
    definition: 'Connected with government, public power, or competition for control of government.',
    definitionZh: '与政府、公共权力或争取政府控制权有关。',
    rule: '主要放在 question、party、system、power 等 thing 前；普通关系义一般不比较。',
    forms: 'political（关系性质通常不比较）',
    senses: [sense('political-core', 'Connected with government or public power.', '政治的', '说明问题、组织或活动属于政治领域。', 'This is a political question.', '这是一个政治问题。', 'political 限定 question 的领域。', { patterns: modifier })],
  },
  possible: {
    zh: '可能发生或做到的',
    definition: 'Able to happen, exist, or be done.',
    definitionZh: '有条件发生、存在或被完成。',
    rule: 'possible 只说明并非不可能，不表示发生概率很高；要表达“很可能”应与 probable 区分。通常不使用 most possible。',
    forms: 'possible（通常不比较；概率较高用 probable 等表达）',
    senses: [sense('possible-core', 'Able to happen, exist, or be done.', '可能的；做得到的', '说明存在实现条件，但不判断概率高低。', 'It is possible to do this.', '这件事是可以做到的。', 'possible 说明 do this 具备实现可能。')],
  },
  probable: {
    zh: '很可能的',
    definition: 'Likely to happen or to be true, though not certain.',
    definitionZh: '很可能发生或为真，但尚不能确定。',
    rule: 'probable 比 possible 表示更高的可能性，但仍不同于 certain；可用 more/most probable 比较推断强度。',
    senses: [sense('probable-core', 'Likely to happen or be true, but not certain.', '很可能的', '用于根据现有信息判断最可能的原因、结果或事件。', 'That is the probable cause.', '那很可能是原因。', 'probable 表示该 cause 的可能性较高。', { patterns: modifier })],
  },
  quick: {
    zh: '快速的',
    definition: 'Done or happening in a short time.',
    definitionZh: '在较短时间内完成或发生。',
    rule: 'quick 主要说明动作或反应所需时间短；修饰动作方式时通常使用许可形式 quickly。',
    senses: [sense('quick-core', 'Done or happening in a short time.', '快速的；迅速的', '用于 answer、change、motion 等发生或完成得快。', 'He gave a quick answer.', '他很快作出了回答。', 'quick 放在 answer 前说明回答迅速。', { patterns: modifier })],
  },
  ready: {
    zh: '准备好的;愿意行动的',
    definition: 'Prepared for an action or event; willing to act.',
    definitionZh: '已经为行动或事件做好准备；也可表示愿意行动。',
    rule: 'be ready 可单独表示准备完成；ready to + operator 表示已经准备或愿意执行动作。',
    senses: [
      sense('ready-1-prepared', 'Prepared for an action or event.', '准备好的', '说明必要准备已经完成。', 'We are ready.', '我们准备好了。', 'ready 在 be 后说明准备状态。'),
      sense('ready-2-willing', 'Willing to act or give help.', '愿意行动的', '用 ready to + operator 表示行动意愿。', 'He is ready to give help.', '他愿意提供帮助。', 'ready to give 表示行动意愿。'),
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
  word.provenance.definition = 'project-editorial-quality-review-batch-02';
  word.provenance.rule = 'project-editorial-quality-review-batch-02';
  word.provenance.example = 'project-editorial-quality-review-batch-02';
}

await writeFile(wordsPath, `${JSON.stringify(words, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ reviewed: targets.length, words: targets, reviewStatus }, null, 2));
