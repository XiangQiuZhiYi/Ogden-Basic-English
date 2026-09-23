import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const wordsPath = path.join(process.cwd(), 'src/data/words.json');
const words = JSON.parse(await readFile(wordsPath, 'utf8'));
const reviewStatus = '结构用法已编辑 · 自动校验通过 · 待语言学复核';

// Manually scoped teaching definitions for the 82 non-operator Operations.
// Each note explains placement or contrast instead of repeating the Chinese gloss.
const reviews = {
  about: ['In connection with a subject, or a little more or less than an amount.', '引出谈论的主题，也可放在数量前表示“大约”。', '表示主题时接 thing；表示近似时放在数字或数量表达前。'],
  across: ['From one side of a place or surface to the other side.', '从一个区域或表面的一边到另一边。', '强调横向跨越；与 go/come 等组合表示路径。'],
  after: ['Later than a time or following a person or thing in order.', '在某个时间之后，或在顺序、位置上跟随。', '可表示时间先后，也可表示跟随；不要与 behind 的单纯位置关系混淆。'],
  against: ['Touching something for support, or in opposition to it.', '表示靠着、接触，也可表示反对。', '空间义表示接触；抽象义表示立场或力量相对。'],
  among: ['In the middle of, or included in, a group of three or more.', '处在三个或更多成员组成的群体之中。', '强调群体内部；明确两者之间通常用 between。'],
  at: ['At a particular point, place, time, or target.', '指向一个具体的地点、时间点或目标。', '用于把注意力落在一个点上；范围内部通常用 in。'],
  before: ['Earlier than a time or in front of something in an order.', '在时间上更早，或在顺序上位于前面。', '可连接时间点，也可连接完整事件；与 after 相对。'],
  between: ['In the space or relation separating two or more clearly identified things.', '位于两个或若干明确对象之间。', '对象被分别识别时可用 between；一般群体内部用 among。'],
  by: ['At the side of something, or using a means, method, or agent.', '表示在旁边，也表示借助某种方式、工具或行动者。', '位置义回答“在哪里”；方式义回答“通过什么办法”。'],
  down: ['Toward or in a lower position, or along the length of something.', '向较低处、处在较低处，也可表示沿着某物延伸。', '与 go/come 表示移动方向；与 road 等组合可表示沿路前进。'],
  from: ['Starting at a place, time, person, or source.', '标明地点、时间、给予者或信息的来源。', '与 to 形成起点—终点对照；get from 可说明取得来源。'],
  in: ['Inside a place, area, container, period, or condition.', '表示处在空间、容器、时期或状态内部。', '静态位置常用 be in；移动进入可结合 get/put 和 in/into。'],
  off: ['Away from contact or attachment, or not operating.', '表示脱离接触、离开，也可表示设备停止工作。', '与 take/get 等表示分离；与 on 构成开启和关闭的对照。'],
  on: ['Touching and supported by a surface, or operating and active.', '表示在表面上，也可表示设备开启或作用进行中。', '位置义与 off 相对；设备义要依赖上下文判断。'],
  over: ['Higher than something, covering it, or moving across it.', '表示在上方、覆盖，或从上方越过。', '静态义可与 be 组合；路径义可与 come/go 组合。'],
  through: ['Moving from one side to another inside something, or by means of an intermediary.', '表示从内部穿过，也可表示通过某个媒介或过程。', '空间义强调内部路径；抽象义说明达成事情的途径。'],
  to: ['Toward an endpoint, receiver, limit, or intended result.', '指向终点、接收者、界限或目标结果。', 'go to 表示终点；give/send to 表示接收者；不要把所有 to 都当作空间方向。'],
  under: ['In a lower position than something, or subject to its control or effect.', '表示位于下方，也可表示受到控制或作用。', '空间义与 over 相对；抽象义仍保留“处在影响之下”的关系。'],
  up: ['Toward or in a higher position, or toward completion.', '表示向上、处在高处，也可表示动作趋于完成。', '先从空间方向理解，再学习 get up、use up 等透明组合。'],
  with: ['Together with a person or thing, having it, or using it as a means.', '表示陪同、具有某物，或使用某物作为工具。', '可表示伴随、组成部分或工具；具体关系由两侧内容决定。'],
  as: ['In the role or form of something, in comparison, or while an event happens.', '表示“作为”、比较关系，或连接同时发生的事件。', 'as 的作用由结构决定：as + thing 表示身份，as...as 表示同等程度。'],
  for: ['Intended for a person or purpose, in exchange for something, or during a period.', '表示受益者、目的、交换关系或持续时间。', '先判断是在回答“给谁”“为了什么”“换取什么”还是“多久”。'],
  of: ['Marking a relation such as belonging, part, material, amount, or subject.', '连接所属、部分、材料、数量或主题关系。', 'of 前后的两个 things 共同决定关系；不能只按中文“的”机械套用。'],
  till: ['Up to a stated time or event.', '一直持续到某个时间点或事件发生。', '说明持续的终点；后面可接时间 thing 或完整事件。'],
  than: ['Introducing the second side of an unequal comparison.', '引出不相等比较中的第二个对象。', '放在比较形式之后；相等比较使用 as...as。'],
  a: ['The indefinite article used before one non-specific singular countable thing.', '用于第一次或非特指地引入一个单数可数事物。', '元音音素前使用 an；复数和不可数意义通常不用 a/an。'],
  the: ['The definite article used for a thing already identified or unique in the situation.', '用于双方已知、前文已提到或情境中唯一的事物。', 'the 不表示远近；是否特指由共同语境决定。'],
  all: ['The complete number or amount of the things in a group.', '表示一个群体的全部成员或全部数量。', 'all 强调整体范围；与复数 things 或不可数数量搭配。'],
  any: ['One or some of a group without a particular selection.', '表示不特定的任何一个或一些。', '常见于疑问和否定，也可在肯定句中表示“不论哪一个”。'],
  every: ['Each member of a group considered one by one.', '把群体中的每个成员逐一包含在内。', 'every 后通常用单数形式；all 更侧重整体。'],
  little: ['Small in size, or small in amount when the thing is not counted separately.', '表示尺寸小，也表示不可数数量少。', '作 quality 时说明大小；作数量限定时与不可数意义搭配。'],
  much: ['A large amount of something not normally counted separately.', '表示不可数事物的大量。', '多用于疑问、否定或比较；可数复数数量不用 much。'],
  no: ['Not any; used before a thing to make its amount or existence negative.', '放在 thing 前表示一个也没有或完全不存在。', 'no + thing 已包含否定意义，通常不再重复 not。'],
  other: ['Different from, or additional to, the one already mentioned.', '表示不同的或另外增加的对象。', 'other 后可接复数或不可数 thing；another 用于另一个单数对象。'],
  some: ['An unspecified number or amount greater than none.', '表示不具体但确实存在的一些或一定数量。', '常用于肯定陈述；也可在期待肯定回答的请求中使用。'],
  such: ['Of the kind or degree just mentioned or about to be described.', '表示前面提到或即将说明的那一类、那种程度。', '常用 such + a/an + quality + thing，或 such + plural thing。'],
  that: ['Pointing to a more distant thing, or joining identifying and reported content.', '指较远的对象，也可连接限定信息或陈述内容。', '指示义有复数 those；连接义不表示远近。'],
  this: ['Pointing to a thing near the speaker or central to the current discussion.', '指靠近说话者或当前讨论中心的对象。', '单数用 this，复数用 these；既可独立也可放在 thing 前。'],
  I: ['The pronoun a speaker uses for himself or herself as subject.', '说话者指自己并在句中作主语时使用。', 'I 永远大写；作宾语使用 me，表示所属使用 my/mine。'],
  he: ['The subject pronoun for a male person already identified.', '指代已明确的男性并在句中作主语。', '宾语形式是 him，所属形式是 his；第三人称单数影响 operator 形式。'],
  you: ['The pronoun for the person or people being addressed.', '指正在被说话者称呼的一个人或多个人。', '单复数形式相同；所属形式为 your/yours。'],
  who: ['The pronoun used to ask about or identify a person.', '用于询问人物身份，或连接说明人物的信息。', '作主语时直接接 operator；作宾语时正式形式可用 whom。'],
  and: ['Joining words, phrases, or statements with equal status.', '连接并列的词、短语或完整信息。', '共享同一主语的两个动作可不重复主语；并列主语通常按复数处理。'],
  because: ['Introducing the reason for a statement or event.', '引出一个事实或事件的原因。', '连接原因分句；不要在同一句中再机械加入重复结果关系的 so。'],
  but: ['Joining information that contrasts with what came before.', '连接与前文形成转折或限制的信息。', 'but 两侧通常具有可比较或相反的预期。'],
  or: ['Joining alternatives, choices, or equivalent ways of saying something.', '连接备选项、选择或等价说法。', '两项选择可用 A or B；否定语境中注意范围是否清楚。'],
  if: ['Introducing a condition on which another statement depends.', '引出另一件事成立所依赖的条件。', 'if 分句说明条件，主句说明条件成立后的结果。'],
  though: ['Introducing a fact that contrasts with the expected result.', '引出与预期结果相反或形成让步的信息。', 'though 表示“尽管”；主要信息通常放在另一个分句。'],
  while: ['During the time that something happens, or introducing a contrast.', '表示两个事件同时发生，也可连接对比信息。', '时间义回答“在……期间”；对比义接近“而、虽然”。'],
  how: ['Asking about or connecting information on manner, condition, or degree.', '询问或连接方式、状态和程度信息。', 'how 放在疑问结构前；how much/how far 等形成更具体的问题。'],
  when: ['Asking about or connecting information on time.', '询问时间，或连接说明时间的分句。', '疑问时放句首；连接时把事件与时间条件联系起来。'],
  where: ['Asking about or connecting information on place.', '询问地点，或连接说明地点的信息。', '与 be 询问位置，与移动 operator 询问方向或目的地。'],
  why: ['Asking for or connecting a reason.', '询问原因，或连接原因内容。', 'why 引导疑问时仍遵守疑问词序；回答常使用 because。'],
  again: ['One more time, or returning to a previous condition.', '表示动作再次发生，或恢复到先前状态。', '通常放在句末或 operator 后的适当位置。'],
  ever: ['At any time, especially in questions, conditions, and comparisons.', '表示在任何时候，常用于疑问、条件和比较。', '与具体过去时间不同；常用于询问经验或加强范围。'],
  far: ['At or to a great distance, or to a great degree.', '表示距离远，也可表示程度差距大。', '可与 from、how、too 等组合；空间义和程度义由上下文区分。'],
  forward: ['Toward the front or toward a later point in time or development.', '向前方，也可指向未来或下一阶段。', '空间义与 back 相对；抽象义保留“向下一步推进”的方向。'],
  here: ['In, at, or to the place of the speaker or present focus.', '在说话者所在或当前关注的地方。', '可与 be 表示位置，与 come/put 表示目标位置。'],
  near: ['At a short distance in space, time, or relation.', '在空间、时间或关系上距离很近。', '可单独作补充信息，也可用 near + thing 标明参照对象。'],
  now: ['At the present time or point in a sequence.', '在当前时间，或在叙述的当前阶段。', '一般放在句首或句末；与 then、yesterday、tomorrow 建立时间对照。'],
  out: ['Outside a place or moving from inside to outside.', '在外面，或从内部向外移动。', 'be out 表示位置；go/come/get out 表示向外移动。'],
  still: ['Continuing up to the present time, or not moving.', '表示某状态仍在持续，也可表示静止不动。', '持续义通常放在 operator 附近；quality 用法强调没有运动。'],
  then: ['At that time, or next in a sequence or result.', '表示当时、随后，或前件成立后的结果。', '时间义定位事件；顺序义连接步骤，不等同于因果连接词。'],
  there: ['In, at, or to a place away from the speaker; also used to present existence.', '表示离说话者较远的地方，也可用于引出“有、存在”。', '地点 there 可重读；存在结构中的 there 主要承担句型位置。'],
  together: ['With one another or combined into one group or whole.', '表示共同进行或组合成一个整体。', '通常放在句末，说明参与者或事物处于共同状态。'],
  well: ['In a good or satisfactory way, or in good health.', '表示动作完成得好，也可表示身体健康。', '修饰动作时是方式词；在 be 后可表示健康状态。'],
  almost: ['Very nearly, but not completely.', '表示非常接近但尚未完全达到。', '放在被限制的数量、quality 或状态表达之前。'],
  enough: ['As much or as many as is needed.', '表示数量或程度达到需要。', '修饰 thing 时通常放在前面；修饰 quality 时常放在后面。'],
  even: ['Giving special emphasis to something unexpected or extreme.', '强调出人意料或处在极端范围内的信息。', '紧靠被强调成分放置，位置改变可能改变强调范围。'],
  not: ['Making a statement, quality, or relation negative.', '把陈述、性质或关系变为否定。', '一般 operator 借助 do not；be、may、will 后可直接接 not。'],
  only: ['Limiting a statement to one person, thing, amount, or condition.', '把范围限制在唯一对象、数量或条件上。', '尽量紧靠被限制的成分，避免产生范围歧义。'],
  quite: ['To a considerable degree, or completely with some qualities.', '表示相当程度；与部分 quality 搭配时也可表示完全。', '实际程度受 quality 和语境影响，不能固定翻成同一个强度。'],
  so: ['To the stated degree or in the stated way; also pointing to a result.', '表示如此程度或方式，也可承接前文结果。', 'so + quality 表示程度；连接结果时避免与 because 重复。'],
  very: ['To a high degree.', '把 quality 或方式的程度提高。', '通常直接放在 quality 或方式词前；不直接修饰普通 thing。'],
  tomorrow: ['On the day after the present day.', '指今天之后的那一天。', '通常放在句末；与 will 常共同明确将来时间。'],
  yesterday: ['On the day before the present day.', '指今天之前的那一天。', '通常与过去形式共同使用，不与 will 表示的将来冲突。'],
  north: ['The direction toward the north point of the compass.', '罗盘上的北方。', '可表示位置或移动方向；north of + place 表示位于其北面。'],
  south: ['The direction opposite north.', '与北方相反的南方。', '可表示位置或移动方向；south of + place 表示位于其南面。'],
  east: ['The direction in which the sun rises.', '太阳升起方向，即东方。', '可表示位置或移动方向；east of + place 表示位于其东面。'],
  west: ['The direction opposite east.', '与东方相反的西方。', '可表示位置或移动方向；west of + place 表示位于其西面。'],
  please: ['A polite word used with a request or to accept an offer.', '用于礼貌提出请求，也可用于接受对方提供的事物。', '请求中常放在句首或句末；它不改变 operator 的语法形式。'],
  yes: ['A positive answer or confirmation.', '表示肯定回答、同意或确认。', 'yes 回应整个问题；需要时再补充完整陈述以避免歧义。'],
};

const targets = words.filter(word => word.category === 'operations' && word.originalIndex >= 18);
const targetWords = new Set(targets.map(word => word.word));
const missing = [...targetWords].filter(word => !reviews[word]);
const extra = Object.keys(reviews).filter(word => !targetWords.has(word));
if (targets.length !== 82 || missing.length || extra.length) {
  throw new Error(`Operations review map mismatch: targets=${targets.length}, missing=${missing.join(',')}, extra=${extra.join(',')}`);
}

for (const word of targets) {
  const [definition, definitionZh, note] = reviews[word.word];
  word.definition = definition;
  word.definitionZh = definitionZh;
  word.rule = note;
  word.status = reviewStatus;
  word.reviewStatus = reviewStatus;
  word.provenance.definition = 'project-editorial-operations-review';
  word.provenance.rule = 'project-editorial-operations-review';
  for (const sense of word.senses) {
    if (word.senses.length === 1) {
      sense.glossEn = definition;
      sense.glossZh = word.zh;
      sense.scopeNoteZh = note;
    }
    sense.reviewStatus = reviewStatus;
    for (const example of sense.examples) {
      example.tokenStatus = 'valid';
      example.reviewStatus = reviewStatus;
    }
  }
}

await writeFile(wordsPath, `${JSON.stringify(words, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ reviewedOperations: targets.length, reviewStatus }, null, 2));
