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
  regular: {
    zh: '规律而规则的',
    definition: 'Following a fixed or repeated pattern, with equal or expected spaces or times.',
    definitionZh: '遵循固定或重复的模式，各部分之间具有相等或可预期的间隔。',
    rule: '用于 motion、rhythm、line 等按固定方式重复或排列的事物；不要直接把它等同于 normal 的“符合常态”。',
    senses: [sense('regular-core', 'Following a fixed or repeated pattern.', '规律的；规则的', '说明运动、排列或发生时间具有稳定模式。', 'The motion is regular.', '这个运动是有规律的。', 'regular 说明 motion 按稳定模式发生。')],
  },
  responsible: {
    zh: '负有责任的',
    definition: 'Having the duty to take care of something or to answer for an action or result.',
    definitionZh: '有义务照管某事，或需要对某项行动或结果作出交代。',
    rule: '常用 be responsible for + thing/action 表示负责对象或应承担的结果；责任通常是明确关系，不宜机械比较程度。',
    forms: 'responsible（责任关系通常不比较；程度明确时可用 more responsible）',
    senses: [sense('responsible-core', 'Having a duty or having to answer for a result.', '负有责任的；应负责的', 'responsible for 后接工作、行动或结果。', 'He is responsible for the work.', '他负责这项工作。', 'responsible for 指出责任所对应的 work。')],
  },
  right: {
    zh: '正确的；右边的',
    definition: 'Correct or suitable; also on the side opposite the left.',
    definitionZh: '正确或合适；也表示与左边相对的一侧。',
    rule: '正确义与 wrong 相对；方向义与 left 相对。两种意义必须依靠 answer、side 等搭配区分。',
    forms: 'right（正确或方向关系通常不比较）',
    senses: [
      sense('right-1-correct', 'Correct and not wrong.', '正确的；对的', '用于答案、决定或判断符合事实或要求。', 'Your answer is right.', '你的答案是正确的。', 'right 表示 answer 没有错误。'),
      sense('right-2-direction', 'On the side opposite the left.', '右边的；右侧的', '表示左右方向中的右侧。', 'Put the book on the right side.', '把书放在右边。', 'right 限定 side 所表示的方向。', { patterns: modifier }),
    ],
  },
  round: {
    zh: '圆形或球形的',
    definition: 'Shaped like a circle or a ball, without straight sides or sharp angles.',
    definitionZh: '形状像圆或球，没有直边或尖角。',
    rule: '可描述平面的圆形或立体的球状外形；round 在这里是性质词，不与表示“围绕”的结构用法混淆。',
    senses: [sense('round-core', 'Shaped like a circle or a ball.', '圆的；球形的', '用于说明物体具有连续弯曲的外形。', 'The ball is round.', '这个球是圆的。', 'round 描述 ball 的整体形状。')],
  },
  serious: {
    zh: '严重的；认真的',
    definition: 'Important and possibly harmful; also thoughtful and not joking.',
    definitionZh: '重要并可能造成伤害；也可表示认真、不在开玩笑。',
    rule: '用于 error、disease 等表示后果严重；用于 person 或态度时表示认真。根据被说明的对象区分两义。',
    senses: [
      sense('serious-1-important', 'Important and likely to have a bad effect.', '严重的；重大的', '用于错误、疾病或问题可能带来较大后果。', 'This is a serious error.', '这是一个严重的错误。', 'serious 说明 error 可能造成重大影响。', { patterns: modifier }),
      sense('serious-2-not-joking', 'Thoughtful and not joking.', '认真的；严肃的', '说明人的态度专注且不是玩笑。', 'He is serious about the work.', '他认真对待这项工作。', 'serious about 引出认真对待的对象。'),
    ],
  },
  sharp: {
    zh: '锋利的；急剧的；剧烈的',
    definition: 'Having a fine cutting edge or point; sudden and great; or strongly felt.',
    definitionZh: '具有细而能切割的边缘或尖端；也可表示变化突然且幅度大，或感觉强烈。',
    rule: '物理义用于 edge、point；变化义用于 increase、turn；感觉义用于 pain。必须由中心词判断具体含义。',
    senses: [
      sense('sharp-1-cutting', 'Having an edge or point able to cut or make a hole.', '锋利的；尖的', '说明刀刃或尖端具有较强切割、穿透能力。', 'The knife has a sharp edge.', '这把刀有锋利的刃。', 'sharp 说明 edge 能够切割。', { patterns: modifier }),
      sense('sharp-2-sudden-change', 'Sudden and great in amount or direction.', '急剧的；突然的', '用于数量或方向在短时间内出现明显变化。', 'There was a sharp increase in the price.', '价格出现了急剧上涨。', 'sharp 说明 increase 来得快且幅度大。', { patterns: modifier }),
      sense('sharp-3-strong-feeling', 'Strong and clearly felt.', '剧烈的；尖锐的', '用于突然且清晰的疼痛等身体感觉。', 'She had a sharp pain in her side.', '她身体一侧感到一阵剧痛。', 'sharp 说明 pain 强烈而集中。', { patterns: modifier }),
    ],
  },
  smooth: {
    zh: '光滑的；平稳顺利的',
    definition: 'Having an even surface without rough parts; also continuing without trouble or sudden changes.',
    definitionZh: '表面平整、没有粗糙部分；也可表示过程没有麻烦或突然变化。',
    rule: '表面义与 rough 相对；过程义用于 operation、motion 等，表示进行平稳。',
    senses: [
      sense('smooth-1-surface', 'Having an even surface without rough parts.', '光滑的；平整的', '说明表面触感均匀，没有明显凸起。', 'The glass is smooth.', '这块玻璃很光滑。', 'smooth 描述 glass 的表面。'),
      sense('smooth-2-process', 'Continuing without trouble or sudden changes.', '平稳的；顺利的', '说明过程连续且没有明显障碍。', 'The operation was smooth.', '这项操作进行得很顺利。', 'smooth 说明 operation 没有出现麻烦。'),
    ],
  },
  sticky: {
    zh: '黏的（有黏性）',
    definition: 'Able or likely to hold to a surface when touched.',
    definitionZh: '接触表面时能够或容易黏附其上。',
    rule: '描述 paste、substance 等表面黏附性质；本条不扩展到普通英语中“棘手的”等比喻义。',
    senses: [sense('sticky-core', 'Able to hold to a surface when touched.', '黏的；黏性的', '说明物质会附着在接触面上。', 'The paste is sticky.', '这种糨糊很黏。', 'sticky 描述 paste 的黏附性质。')],
  },
  stiff: {
    zh: '硬挺的；僵硬的',
    definition: 'Not easily bent or moved; also difficult to move because of pain or lack of use.',
    definitionZh: '不容易弯曲或移动；也可表示身体部位因疼痛或缺少活动而难以移动。',
    rule: '用于材料时说明抗弯曲；用于身体部位时说明活动不灵活。与 hard 的材质硬度有所区别。',
    senses: [
      sense('stiff-1-material', 'Not easily bent or changed in shape.', '硬挺的；不易弯曲的', '用于布料或材料保持固定形状。', 'The cloth is stiff.', '这块布很硬挺。', 'stiff 表示 cloth 不容易弯曲。'),
      sense('stiff-2-body', 'Difficult or painful to move.', '僵硬的；发僵的', '用于身体或身体部位活动不灵活。', 'His leg is stiff.', '他的腿发僵。', 'stiff 说明 leg 难以自由活动。'),
    ],
  },
  straight: {
    zh: '直的；直接坦率的',
    definition: 'Continuing in one direction without a curve; also direct and clear.',
    definitionZh: '沿一个方向延伸而不弯曲；也可表示直接而清楚。',
    rule: '形状义用于 line、road；表达义用于 answer 等，表示不回避重点。',
    senses: [
      sense('straight-1-no-curve', 'Continuing in one direction without a curve.', '直的；笔直的', '说明线、道路或排列没有弯曲。', 'The line is straight.', '这条线是直的。', 'straight 描述 line 的几何形状。'),
      sense('straight-2-direct', 'Direct, clear, and not avoiding the point.', '直接的；坦率的', '用于回答或说明不绕开重点。', 'Give me a straight answer.', '直接回答我。', 'straight 限定 answer 的表达方式。', { patterns: modifier }),
    ],
  },
  sudden: {
    zh: '突然的',
    definition: 'Happening quickly and unexpectedly, without clear warning.',
    definitionZh: '迅速而出乎意料地发生，事先没有明显预兆。',
    rule: '常放在 change、noise、shock 等 thing 前；强调出现得突然，不必然表示持续时间短。',
    senses: [sense('sudden-core', 'Happening quickly and unexpectedly.', '突然的；意外的', '说明事件在没有明显预兆时迅速发生。', 'There was a sudden noise.', '突然传来一阵声响。', 'sudden 说明 noise 出现得意外。', { patterns: modifier })],
  },
  tall: {
    zh: '个体高度大的（高挑的）',
    definition: 'Having a great distance from bottom to top, especially for a person or an upright thing.',
    definitionZh: '从底部到顶部的距离较大，尤其用于人或直立物体。',
    rule: '用于 person、tree、building 等自身高度；high 更常说明位置、水平或数值高。',
    senses: [sense('tall-core', 'Great in height from bottom to top.', '高的；高挑的', '描述人或直立物体自身的高度。', 'The tree is tall.', '这棵树很高。', 'tall 说明 tree 从底部到顶部的距离较大。')],
  },
  thick: {
    zh: '厚的；浓密的',
    definition: 'Having a large distance between opposite surfaces; also closely packed and difficult to see through.',
    definitionZh: '两个相对表面之间距离较大；也可表示聚集得密、难以看穿。',
    rule: '尺寸义与 thin 相对；密度义可用于 mist、smoke 等。两义分别关注厚度与聚集程度。',
    senses: [
      sense('thick-1-dimension', 'Having a large distance between opposite surfaces.', '厚的', '用于书、墙或材料的厚度。', 'The book is thick.', '这本书很厚。', 'thick 说明 book 两个表面之间的距离较大。'),
      sense('thick-2-dense', 'Closely packed and difficult to see through.', '浓密的；稠密的', '用于雾、烟或密集物质。', 'The mist is thick.', '雾很浓。', 'thick 表示 mist 聚集得密而影响视线。'),
    ],
  },
  tight: {
    zh: '绷紧的；紧身的',
    definition: 'Firmly stretched or fixed; also fitting so closely that movement is limited.',
    definitionZh: '被牢固拉紧或固定；也可表示贴合过紧，以至活动受到限制。',
    rule: '用于 cord 等表示没有松弛；用于 clothing、shoe 等表示尺寸过紧。与 loose 相对。',
    senses: [
      sense('tight-1-stretched', 'Firmly stretched or fixed, not loose.', '绷紧的；牢固的', '用于绳索、连接或固定状态没有松动。', 'The cord is tight.', '这根绳子绷得很紧。', 'tight 表示 cord 没有松弛。'),
      sense('tight-2-close-fit', 'Fitting so closely that movement is limited.', '紧身的；过紧的', '用于衣物或鞋贴得太紧。', 'This shoe is tight.', '这只鞋太紧。', 'tight 说明 shoe 与脚贴合过紧。'),
    ],
  },
  waiting: {
    zh: '正在等候的',
    definition: 'Remaining in a place or state until a person comes or an event happens.',
    definitionZh: '留在某处或保持某种状态，直到某人到来或某事发生。',
    rule: '作为状态性质放在 person、room 等前，或与 be 组合；强调当前处于等待状态，通常不比较。',
    senses: [sense('waiting-core', 'Remaining until someone comes or something happens.', '正在等候的；待用的', '说明人或事物当前处于等待状态。', 'The waiting man is by the door.', '正在等候的男人在门边。', 'waiting 放在 man 前说明他当前的状态。', { patterns: modifier })],
  },
  warm: {
    zh: '温暖的；热情友好的',
    definition: 'Having a comfortably high temperature; also friendly and showing kind feeling.',
    definitionZh: '温度较高且令人舒适；也可表示友好并显露亲切感情。',
    rule: '温度义介于 cold 与 hot/boiling 之间；态度义用于 smile、welcome 等表示亲切。',
    senses: [
      sense('warm-1-temperature', 'Comfortably hot, but not extremely hot.', '温暖的；暖和的', '用于水、空气或物体具有舒适温度。', 'The water is warm.', '水是温的。', 'warm 说明 water 的温度舒适而不烫。'),
      sense('warm-2-friendly', 'Friendly and showing kind feeling.', '热情的；亲切的', '用于笑容、态度或接待传达友善。', 'She gave me a warm smile.', '她对我露出亲切的微笑。', 'warm 说明 smile 传达友善感情。', { patterns: modifier }),
    ],
  },
  wide: {
    zh: '宽的；范围广的',
    definition: 'Having a large distance from side to side; also covering many different things.',
    definitionZh: '从一侧到另一侧的距离较大；也可表示涵盖许多不同事物。',
    rule: '空间义与 narrow 相对；范围义常修饰 range、selection 等，表示覆盖面大。',
    senses: [
      sense('wide-1-distance', 'Having a large distance from side to side.', '宽的；宽阔的', '描述道路、开口或物体横向距离较大。', 'The road is wide.', '这条路很宽。', 'wide 说明 road 两侧之间的距离较大。'),
      sense('wide-2-range', 'Covering many different things or a large range.', '广泛的；范围广的', '说明选择、差异或覆盖范围较大。', 'There is a wide range of ideas.', '有各种各样的想法。', 'wide 说明 range 覆盖的 ideas 很多。', { patterns: modifier }),
    ],
  },
  wise: {
    zh: '明智且有智慧的',
    definition: 'Able to make good judgments from knowledge and experience.',
    definitionZh: '能够根据知识和经验作出良好判断。',
    rule: '可描述 person 的判断能力，也可描述 decision、suggestion 等体现出良好判断。',
    senses: [sense('wise-core', 'Showing good judgment based on knowledge or experience.', '明智的；有智慧的', '用于人或决定体现可靠判断。', 'That was a wise decision.', '那是一个明智的决定。', 'wise 说明 decision 基于良好判断。', { patterns: modifier })],
  },
  bitter: {
    zh: '苦的；怨愤的',
    definition: 'Having a sharp unpleasant taste; also feeling angry and hurt because of an unfair experience.',
    definitionZh: '具有强烈而令人不快的苦味；也可表示因不公平经历而愤怒、受伤。',
    rule: '味觉义用于 food、drink、taste；情绪义常用 bitter about + thing 指出产生怨愤的事情。',
    senses: [
      sense('bitter-1-taste', 'Having a sharp and unpleasant taste.', '苦的', '说明食物或饮料具有苦味。', 'The drink has a bitter taste.', '这种饮料有苦味。', 'bitter 限定 taste 的味觉性质。', { patterns: modifier }),
      sense('bitter-2-feeling', 'Angry and hurt because of an unfair experience.', '怨愤的；愤懑的', '描述人对某项经历长期不满。', 'He is bitter about the decision.', '他对这个决定感到愤懑。', 'bitter about 引出怨愤所针对的事情。'),
    ],
  },
  certain: {
    zh: '确信的；某一特定的',
    definition: 'Sure that something is true; also used for a particular person or thing not named exactly.',
    definitionZh: '确信某事为真；也可指没有明确说出名称的某个特定人或事物。',
    rule: 'be certain of/about 表示确信；a certain + thing 表示“某一个特定的”。不要把 certain 与 probable 的“很可能”混淆。',
    senses: [
      sense('certain-1-sure', 'Sure that something is true.', '确信的；确定的', '用于说话者没有疑问的判断。', 'I am certain of the answer.', '我确信这个答案。', 'certain of 表示对 answer 没有疑问。'),
      sense('certain-2-particular', 'A particular one not named exactly.', '某一特定的；某个', '用于知道或限定对象，但不明确说出名称。', 'A certain man gave me the letter.', '某个男人把这封信给了我。', 'a certain man 指某个特定但未具名的人。', { patterns: modifier }),
    ],
  },
  cold: {
    zh: '冷的；感冒',
    definition: 'Having a low temperature; also a common illness affecting the nose and throat.',
    definitionZh: '温度较低；也可指影响鼻子和喉咙的常见轻微疾病。',
    rule: '作 quality 时与 warm 相对；作 thing 时用 have a cold 表示感冒。两个词性需要分开掌握。',
    senses: [
      sense('cold-1-temperature', 'Having a low temperature.', '冷的；寒冷的', '说明物体、空气或天气温度低。', 'The water is cold.', '水是冷的。', 'cold 描述 water 的温度。'),
      sense('cold-2-illness', 'A common illness affecting the nose and throat.', '感冒', '作 thing，常与 have 组合说明患感冒。', 'She has a cold.', '她感冒了。', 'have a cold 是表示患感冒的固定组合。', { partOfSpeech: 'n. · thing', patterns: ['have-thing'] }),
    ],
  },
  dead: {
    zh: '死亡、失去生命的',
    definition: 'No longer living.',
    definitionZh: '已经不再有生命。',
    rule: '用于人、动物或植物失去生命的状态，与 living 相对；作为绝对状态通常不比较。',
    forms: 'dead（生命状态通常不比较）',
    senses: [sense('dead-core', 'No longer living.', '死亡的；失去生命的', '说明曾经有生命的对象已经失去生命。', 'The animal is dead.', '这只动物死了。', 'dead 说明 animal 已不再有生命。')],
  },
  dear: {
    zh: '亲爱的；昂贵的',
    definition: 'Loved or valued greatly; also costing a large amount of money.',
    definitionZh: '深受喜爱或珍视；也可表示价格很高。',
    rule: '感情义用于 friend、person 等；价格义在现代英语中较少见，但属于本词的 Basic 核心对立义，与 cheap 相对。',
    senses: [
      sense('dear-1-loved', 'Loved or valued greatly.', '亲爱的；珍爱的', '表示人与人之间亲近或珍视的关系。', 'She is a dear friend.', '她是一位亲爱的朋友。', 'dear 表示 friend 深受珍视。', { patterns: modifier }),
      sense('dear-2-expensive', 'Costing a large amount of money.', '昂贵的', '说明价格高，与 cheap 相对。', 'This coat is dear.', '这件外套很贵。', 'dear 在这里表示 coat 的价格高。'),
    ],
  },
  delicate: {
    zh: '易损的；需要谨慎处理的',
    definition: 'Easily damaged; also needing care because the matter is difficult or sensitive.',
    definitionZh: '容易受损；也可表示事情困难或敏感，因而需要谨慎处理。',
    rule: '物理义用于 glass、instrument 等易损物；情境义用于 question、position 等需要小心处理的事情。',
    senses: [
      sense('delicate-1-easily-damaged', 'Easily damaged and needing careful handling.', '易损的；精细脆弱的', '说明物品容易因压力或碰撞受损。', 'This glass is delicate.', '这件玻璃制品很易损。', 'delicate 说明 glass 需要小心拿放。'),
      sense('delicate-2-sensitive', 'Needing careful thought or action.', '微妙的；需要谨慎处理的', '用于问题或处境可能因处理不当而恶化。', 'This is a delicate question.', '这是一个需要谨慎处理的问题。', 'delicate 表示 question 不能草率处理。', { patterns: modifier }),
    ],
  },
  feeble: {
    zh: '虚弱的；微弱的',
    definition: 'Having little physical strength; also weak in force, light, or effect.',
    definitionZh: '身体力量很小；也可表示作用力、光线或效果微弱。',
    rule: '用于 person 时表示体力弱；用于 light、sound、attempt 等表示强度或效果弱。',
    senses: [
      sense('feeble-1-person', 'Having little physical strength.', '虚弱的；无力的', '描述人或动物体力不足。', 'The old man is feeble.', '这位老人身体虚弱。', 'feeble 说明 old man 的体力很弱。'),
      sense('feeble-2-force', 'Weak in force, light, sound, or effect.', '微弱的；无力的', '描述光、声音或作用的强度很低。', 'The light is feeble.', '光线很微弱。', 'feeble 说明 light 的强度低。'),
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
  word.provenance.definition = 'project-editorial-quality-review-batch-03';
  word.provenance.rule = 'project-editorial-quality-review-batch-03';
  word.provenance.example = 'project-editorial-quality-review-batch-03';
}

await writeFile(wordsPath, `${JSON.stringify(words, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ reviewed: targets.length, words: targets, reviewStatus }, null, 2));
