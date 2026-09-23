import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const wordsPath = path.join(root, 'src/data/words.json');
const patternsPath = path.join(root, 'src/data/patterns.json');
const words = JSON.parse(await readFile(wordsPath, 'utf8'));
const patterns = JSON.parse(await readFile(patternsPath, 'utf8'));

const patternRefsByOperator = new Map();
for (const pattern of patterns) {
  for (const operator of pattern.operators) {
    if (!patternRefsByOperator.has(operator)) patternRefsByOperator.set(operator, []);
    patternRefsByOperator.get(operator).push(pattern.id);
  }
}

const s = (glossZh, glossEn, en, zh, noteZh, patterns = []) => ({
  glossZh,
  glossEn,
  en,
  zh,
  noteZh,
  patterns,
});

// Only distinctions that materially change meaning or sentence structure are split.
// Chinese near-synonyms joined with "、" remain one sense unless listed here.
const senseOverrides = {
  get: [
    s('得到、取得', 'To come to have a thing.', 'I got a letter from him.', '我从他那里收到一封信。', 'get + thing 表示取得。', ['get-thing-from']),
    s('变得', 'To come into a condition.', 'The water gets cold.', '水变冷了。', 'get + quality 表示状态变化。', ['get-quality']),
  ],
  keep: [
    s('保留、继续拥有', 'To continue to have a thing.', 'You may keep this book.', '你可以留下这本书。', '直接接 thing，表示保留。', ['keep-thing']),
    s('使保持某状态', 'To cause a condition to continue.', 'Keep the door open.', '让门保持开着。', 'thing 后的 quality 表示持续状态。', ['keep-thing-quality']),
  ],
  make: [
    s('制作、产生', 'To produce or form a thing.', 'Make a copy of the letter.', '把这封信复制一份。', 'make + thing 强调产出。', ['make-thing']),
    s('使成为、造成', 'To cause a thing to have a condition.', 'Make the room clean.', '把房间弄干净。', 'make + thing + quality 表示结果。', ['make-thing-quality']),
  ],
  be: [
    s('是、属于', 'To have an identity or be in a class.', 'This is a book.', '这是一本书。', 'be 连接主语和身份。', ['be-thing']),
    s('处于某状态或位置', 'To have a condition or position.', 'The book is on the table.', '书在桌上。', 'be 连接主语和状态或位置。', ['be-quality', 'be-direction']),
  ],
  have: [
    s('拥有、包含', 'To be in possession of a thing or include it.', 'The house has two rooms.', '这所房子有两个房间。', 'have + thing 表示拥有或包含。', ['have-thing']),
    s('经历、进行', 'To experience or take part in an activity.', 'We had a talk.', '我们谈了一次。', 'have + action-thing 表示经历或活动。', ['have-action-thing']),
  ],
  see: [
    s('看见', 'To become conscious of a thing through the eyes.', 'I see the light.', '我看见了光。', '直接接被看见的 thing。', ['see-thing']),
    s('理解、明白', 'To get the sense of an idea or fact.', 'Now I see your point.', '现在我明白你的观点了。', '宾语是观点或内容。', ['see-content']),
  ],
  may: [
    s('可以、获准', 'To have permission to do something.', 'You may go now.', '你现在可以走了。', '在许可语境中使用。', ['may-operator']),
    s('可能', 'To indicate that something is possible.', 'It may be true.', '这可能是真的。', '在可能性语境中使用。', ['may-operator']),
  ],
  will: [
    s('将会', 'To mark a future event.', 'I will come tomorrow.', '我明天会来。', 'will + operator 原形表示将来。', ['will-operator']),
    s('愿意、决意', 'To indicate willingness or intention.', 'I will give you help.', '我愿意帮助你。', '上下文突出意愿而非单纯时间。', ['will-operator']),
  ],
  about: [
    s('关于', 'In connection with a subject.', 'This book is about science.', '这本书是关于科学的。', '引出主题。'),
    s('大约', 'A little more or less than an amount.', 'There were about ten people.', '当时大约有十个人。', '放在数量前表示近似。'),
  ],
  against: [
    s('靠着、接触', 'Touching or supported by something.', 'The seat is against the wall.', '座位靠着墙。', '表示空间接触。'),
    s('反对', 'In opposition to something.', 'They are against the change.', '他们反对这项改变。', '表示立场上的反对。'),
  ],
  by: [
    s('在旁边', 'At the side of something.', 'The house is by the river.', '房子在河边。', '表示位置接近。'),
    s('通过、借助', 'Using a means or method.', 'I will go by train.', '我会乘火车去。', '表示方式或手段。'),
  ],
  off: [
    s('离开、分离', 'Away from or no longer on a surface.', 'Take the book off the table.', '把书从桌上拿下来。', '表示从接触状态分开。', ['take-thing-direction']),
    s('关闭、停止连接', 'Not operating or not connected.', 'The light is off.', '灯关着。', '表示设备或作用停止。'),
  ],
  on: [
    s('在……上面', 'Supported by or touching a surface.', 'The book is on the table.', '书在桌上。', '表示空间位置。', ['be-direction']),
    s('开启、正在作用', 'Operating or connected.', 'The light is on.', '灯开着。', '表示设备或作用开始。'),
  ],
  over: [
    s('在……上方', 'At a higher position than something.', 'The light is over the table.', '灯在桌子上方。', '表示较高的位置。'),
    s('越过、横过', 'From one side to the other above something.', 'The bird went over the wall.', '鸟越过了墙。', '表示移动路径。', ['come-go-path']),
  ],
  through: [
    s('从内部穿过', 'From one end or side to another through the inside.', 'Go through the door.', '穿过这扇门。', '表示空间路径。', ['come-go-path']),
    s('通过、借助', 'By means of an intervening thing or process.', 'We got the news through him.', '我们通过他得到了消息。', '表示媒介或途径。'),
  ],
  little: [
    s('小的', 'Small in size.', 'This is a little box.', '这是一个小盒子。', '说明尺寸。'),
    s('少量的', 'Small in amount.', 'There is little water.', '水很少。', '说明不可数数量。'),
  ],
  while: [
    s('在……期间', 'During the time that something happens.', 'He came while I was at work.', '我工作时他来了。', '连接同时发生的事情。', ['connect-statements']),
    s('虽然、而', 'Introducing a contrast between statements.', 'The box is small while the other is great.', '这个盒子小，而另一个很大。', '连接对比信息。', ['connect-statements']),
  ],
  well: [
    s('好地、令人满意地', 'In a good or satisfactory way.', 'She did the work well.', '她把工作做得很好。', '修饰动作方式。'),
    s('健康的', 'In good health.', 'He is well again.', '他恢复健康了。', '在 be 后表示健康状态。'),
  ],
  account: [
    s('叙述、说明', 'A statement giving details of an event.', 'He gave an account of the event.', '他叙述了这件事。', '用 give an account 表达叙述。', ['give-action-thing']),
    s('账目、账户记录', 'A record of money received, paid, or held.', 'This account gives the amount of my money.', '这个账户记录了我的钱数。', '表示钱款记录。'),
  ],
  act: [
    s('行为、举动', 'A thing done by a person.', 'His act was kind.', '他的行为很友善。', '表示一次行为。'),
    s('法案', 'A law made by an authority.', 'This act is now the law.', '这项法案现在已经成为法律。', '表示正式制定的法律。'),
  ],
  addition: [
    s('加法', 'The operation of putting numbers together.', 'Do this addition.', '做这道加法。', '数学运算意义。'),
    s('增加物、附加部分', 'A thing added to something.', 'This room is a new addition to the house.', '这个房间是房子新增的部分。', '表示后来增加的部分。'),
  ],
  back: [
    s('背部', 'The rear part of a person or animal body.', 'I have a pain in my back.', '我的背部疼。', '身体部位。'),
    s('后面、背面', 'The part furthest from the front.', 'The door is at the back of the house.', '门在房子的后面。', '空间位置。'),
  ],
  blow: [
    s('一击', 'A hard hit.', 'He gave the ball a blow.', '他击了一下球。', '用 give a blow 表示击打。', ['give-action-thing']),
    s('吹动', 'An act or current of moving air.', 'The wind gave the door a strong blow.', '风猛吹了一下门。', '表示风的作用。'),
  ],
  burn: [
    s('燃烧', 'The process of being on fire.', 'The wood is burning.', '木头正在燃烧。', '表示燃烧过程。'),
    s('烧伤', 'An injury caused by heat or fire.', 'The burn on his hand is bad.', '他手上的烧伤很严重。', '表示受伤结果。'),
  ],
  company: [
    s('公司', 'An organization doing business.', 'The company made a new machine.', '这家公司制造了一台新机器。', '组织意义。'),
    s('陪伴', 'The state of being with another person.', 'I was happy in her company.', '有她陪伴我很开心。', '表示与人相伴。'),
  ],
  country: [
    s('国家', 'A nation and its land.', 'This country is at peace.', '这个国家处于和平状态。', '政治地理单位。'),
    s('乡村', 'Land away from towns.', 'They have a house in the country.', '他们在乡村有一所房子。', '与城镇相对的地区。'),
  ],
  cry: [
    s('哭泣', 'An act of crying with tears.', 'The boy had a cry.', '那个男孩哭了一场。', '表示哭泣行为。', ['have-action-thing']),
    s('呼喊', 'A loud call or sound.', 'We gave a loud cry for help.', '我们大声呼救。', '表示喊声。', ['give-action-thing']),
  ],
  current: [
    s('水流、气流', 'A steady movement of water or air.', 'The current in the river is strong.', '河里的水流很急。', '物质流动。'),
    s('电流', 'A movement of electricity.', 'An electric current goes through the wire.', '电流通过电线。', '电学意义。'),
  ],
  earth: [
    s('地球', 'The world on which people live.', 'The earth goes round the sun.', '地球绕着太阳运行。', '星体意义。'),
    s('泥土、土地', 'The material forming the ground.', 'Put the seed in the earth.', '把种子放进土里。', '地面物质。'),
  ],
  field: [
    s('田地、场地', 'An open area of land.', 'The cows are in the field.', '牛在田里。', '实际土地。'),
    s('领域', 'An area of work or knowledge.', 'This is a new field of science.', '这是一个新的科学领域。', '抽象范围。'),
  ],
  fold: [
    s('折叠动作', 'An act of bending one part over another.', 'Give the paper one fold.', '把纸折一次。', '表示折叠动作。'),
    s('褶、折痕', 'A doubled part in cloth or paper.', 'There is a fold in the cloth.', '布上有一道褶。', '表示折叠形成的部分。'),
  ],
  interest: [
    s('兴趣、关注', 'A desire to know or take part in something.', 'I have an interest in science.', '我对科学有兴趣。', '心理关注。'),
    s('利息', 'Money paid for the use of money.', 'The interest on the money is high.', '这笔钱的利息很高。', '金融意义。'),
  ],
  letter: [
    s('信件', 'A written message sent to a person.', 'She sent me a letter.', '她给我寄了一封信。', '通信内容。', ['send-thing-direction']),
    s('字母', 'A written sign used in an alphabet.', 'A is the first letter.', 'A 是第一个字母。', '书写符号。'),
  ],
  lift: [
    s('电梯', 'A machine for taking people up or down.', 'Take the lift to the top floor.', '乘电梯到顶层。', '设备意义。'),
    s('抬起、提举', 'An act of raising something.', 'Give the box a lift.', '把箱子抬一下。', '动作名词。', ['give-action-thing']),
  ],
  look: [
    s('看一下', 'An act of directing the eyes at something.', 'Take a look at this.', '看看这个。', '动作名词。', ['take-action-thing']),
    s('样子、外观', 'The appearance of a person or thing.', 'The room has a new look.', '这个房间有了新面貌。', '外观意义。'),
  ],
  mass: [
    s('质量、物质的量', 'The amount of material in a body.', 'The two bodies have the same mass.', '这两个物体质量相同。', '物理意义。'),
    s('大量、一团', 'A large amount gathered together.', 'A mass of people came together.', '许多人聚到了一起。', '表示聚集的大量事物。'),
  ],
  room: [
    s('房间', 'A part of a building enclosed by walls.', 'This is my room.', '这是我的房间。', '建筑空间。'),
    s('空间、余地', 'Space available for something.', 'There is room for another seat.', '还有地方再放一个座位。', '可用空间。'),
  ],
  run: [
    s('跑动', 'An act or period of running.', 'He had a run in the field.', '他在田里跑了一阵。', '动作名词。', ['have-action-thing']),
    s('运行过程', 'A period during which a machine operates.', 'The machine had a long run.', '这台机器运行了很长一段时间。', '设备运行。'),
  ],
  slip: [
    s('滑倒、滑动', 'An accidental slide or loss of footing.', 'He had a slip on the ice.', '他在冰上滑倒了。', '事件意义。'),
    s('小纸条、窄条', 'A small narrow piece of material.', 'Put your name on this slip of paper.', '把你的名字写在这张纸条上。', '物件意义。'),
  ],
  tin: [
    s('锡', 'A soft light metal.', 'This box is made of tin.', '这个盒子是锡制的。', '材料意义。'),
    s('罐头、罐', 'A metal container for food.', 'Give me a tin of food.', '给我一罐食物。', '容器意义。'),
  ],
  vessel: [
    s('容器', 'A container for liquid or other material.', 'The water is in a vessel.', '水在容器里。', '一般容器。'),
    s('船只', 'A large boat or ship.', 'The vessel came into the harbour.', '船驶入了港口。', '水上交通工具。'),
  ],
  view: [
    s('视野、景象', 'What can be seen from a place.', 'The mountain is in view.', '这座山在视野之内。', '视觉范围。'),
    s('观点、看法', 'An opinion about something.', 'In my view, this is right.', '在我看来，这是对的。', '抽象观点。'),
  ],
  band: [
    s('带子、条带', 'A narrow strip around something.', 'Put a band round the box.', '在盒子外绕一条带子。', '物件意义。'),
    s('乐队', 'A group of people making music together.', 'The band made music.', '乐队演奏了音乐。', '人员团体。'),
  ],
  bulb: [
    s('灯泡', 'The glass part of an electric light.', 'The electric bulb gives a bright light.', '电灯泡发出明亮的光。', '照明设备。'),
    s('球茎', 'A rounded underground part from which a plant grows.', 'Put the bulb in the earth.', '把球茎埋进土里。', '植物部分。'),
  ],
  chest: [
    s('胸部', 'The front upper part of the body.', 'He has a pain in his chest.', '他胸口疼。', '身体部位。'),
    s('箱子', 'A strong box used for keeping things.', 'The papers are in the chest.', '文件在箱子里。', '容器意义。'),
  ],
  horn: [
    s('角', 'A hard pointed growth on an animal head.', 'The cow has two horns.', '这头牛有两只角。', '动物身体部分。'),
    s('号角、喇叭', 'An instrument making a loud sound.', 'The horn made a loud sound.', '号角发出了响亮的声音。', '发声器具。'),
  ],
  nail: [
    s('钉子', 'A thin pointed piece of metal used for fixing things.', 'Put the nail into the wood.', '把钉子钉进木头。', '固定材料。'),
    s('指甲', 'The hard covering at the end of a finger or toe.', 'The nail on my finger is broken.', '我手指上的指甲断了。', '身体部分。'),
  ],
  nut: [
    s('坚果', 'A seed with a hard shell used as food.', 'The nut is good food.', '这种坚果是很好的食物。', '食物意义。'),
    s('螺母', 'A small metal part turned onto a screw.', 'Put the nut on the screw.', '把螺母拧到螺钉上。', '机械零件。'),
  ],
  spring: [
    s('弹簧', 'A coiled piece that returns to its form after pressure.', 'The spring in the machine is broken.', '机器里的弹簧坏了。', '机械部件。'),
    s('春天', 'The season after winter.', 'The flowers come in spring.', '花在春天开放。', '季节意义。'),
  ],
  free: [
    s('自由的、不受限制的', 'Able to act or move without control.', 'The bird is free.', '这只鸟自由了。', '没有约束。'),
    s('免费的', 'Given without payment.', 'This book is free.', '这本书是免费的。', '不需要付款。'),
  ],
  hard: [
    s('坚硬的', 'Not soft and not easily bent or cut.', 'The stone is hard.', '这块石头很硬。', '物理性质。'),
    s('困难的', 'Needing much work or thought.', 'This question is hard.', '这个问题很难。', '任务难度。'),
  ],
  kind: [
    s('友善的', 'Ready to give help or care.', 'She is kind to animals.', '她对动物很友善。', '人的态度。'),
    s('种类', 'A group of things of the same sort.', 'What kind of plant is this?', '这是什么种类的植物？', '分类意义。'),
  ],
  present: [
    s('现在的、当前的', 'Existing or happening now.', 'This is the present condition.', '这是目前的状况。', '时间关系。'),
    s('在场的', 'Being at a place or event.', 'He was present at the meeting.', '他出席了会议。', '人员位置状态。'),
  ],
  right: [
    s('正确的', 'In agreement with fact or rule.', 'Your answer is right.', '你的答案是对的。', '正确性。'),
    s('右边的、向右', 'On or toward the right side.', 'The station is on the right.', '车站在右边。', '方向或位置。'),
  ],
  dear: [
    s('亲爱的、珍爱的', 'Loved or valued greatly.', 'She is my dear friend.', '她是我亲爱的朋友。', '感情关系。'),
    s('昂贵的', 'High in price.', 'This coat is very dear.', '这件外套很贵。', '价格高；属于较旧但符合项目时代语境的用法。'),
  ],
  thin: [
    s('瘦的', 'Having little flesh on the body.', 'The man is thin.', '这个男人很瘦。', '描述人的体形。'),
    s('薄的', 'Having little distance between opposite surfaces.', 'The paper is thin.', '这张纸很薄。', '描述物体厚度。'),
  ],
};

function slugPart(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/gu, '-').replace(/^-|-$/gu, '').slice(0, 42) || 'sense';
}

for (const word of words) {
  const override = senseOverrides[word.word];
  const operatorPatternRefs = patternRefsByOperator.get(word.word) ?? [];
  if (override) {
    word.senses = override.map((sense, index) => ({
      id: `${word.id}-${index + 1}-${slugPart(sense.glossEn)}`,
      partOfSpeech: word.pos,
      glossEn: sense.glossEn,
      glossZh: sense.glossZh,
      scopeNoteZh: sense.noteZh,
      patterns: sense.patterns,
      examples: [{
        en: sense.en,
        zh: sense.zh,
        noteZh: sense.noteZh,
        tokenStatus: 'pending',
        reviewStatus: '项目编辑待人工复核',
      }],
      sourceRefs: ['ogden-850', 'project-editorial'],
      reviewStatus: '项目编辑待人工复核',
    }));
  } else {
    word.senses = [{
      id: `${word.id}-core`,
      partOfSpeech: word.pos,
      glossEn: word.definition,
      glossZh: word.zh,
      scopeNoteZh: '按当前 Basic English 教学义项使用；中文近义表达不自动拆成多个义项。',
      patterns: operatorPatternRefs,
      examples: [{
        en: word.example,
        zh: word.exampleZh,
        noteZh: '展示该词在 Basic English 受控表达中的核心用法。',
        tokenStatus: 'pending',
        reviewStatus: word.reviewStatus,
      }],
      sourceRefs: ['ogden-850', 'project-editorial'],
      reviewStatus: word.reviewStatus,
    }];
  }
  word.patternRefs = [...new Set([
    ...operatorPatternRefs,
    ...word.senses.flatMap(sense => sense.patterns),
  ])];
}

await writeFile(wordsPath, `${JSON.stringify(words, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({
  words: words.length,
  senses: words.reduce((total, word) => total + word.senses.length, 0),
  examples: words.reduce((total, word) => total + word.senses.reduce((sum, sense) => sum + sense.examples.length, 0), 0),
  multiSenseWords: words.filter(word => word.senses.length > 1).length,
}, null, 2));
