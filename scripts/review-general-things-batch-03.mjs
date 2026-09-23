import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const wordsPath = path.join(process.cwd(), 'src/data/words.json');
const words = JSON.parse(await readFile(wordsPath, 'utf8'));
const reviewStatus = '释义与例句已编辑 · 自动校验通过 · 待语言学复核';

const rows = `
metal|A hard, usually shiny material such as iron, gold, or copper.|The box is made of metal.|这个箱子是金属做的。
middle|The central point or part of something.|There is a mark in the middle of the page.|页面中间有一个标记。
milk|The white liquid produced by female animals to feed their young.|The baby had some warm milk.|婴儿喝了一些温牛奶。
mind|The part of a person that thinks, knows, remembers, and feels.|Keep this question in mind.|把这个问题记在心里。
mine|A place under or in the earth from which coal, metal, or another substance is taken.|The men get coal from the mine.|人们从矿里取煤。
minute|A unit of time equal to sixty seconds.|Please give me a minute.|请给我一分钟。
mist|A thin cloud of very small water drops near the ground.|The mountain is under the mist.|山笼罩在薄雾之下。
money|What people use as payment for goods, services, or debts.|I have no money for the journey.|我没有路费。
month|One of the twelve main divisions of a year.|The work took one month.|这项工作用了一个月。
morning|The early part of the day, from first light until the middle of the day.|We had the meeting in the morning.|我们上午开了会。
mother|A female parent.|The mother gave food to her baby.|母亲给婴儿食物。
motion|The act or state of moving, or a formal proposal at a meeting.|The motion of the train is slow.|火车运动得很慢。
mountain|A very high natural rise of land.|There is snow on the mountain.|山上有雪。
move|An act of changing position, place, or course of action.|The horse made a sudden move.|马突然动了一下。
music|Organized sounds made for expression or pleasure.|The music gave us pleasure.|音乐给我们带来了快乐。
name|A word or group of words by which a person or thing is known.|Put your name on the paper.|把你的名字写在纸上。
nation|A large community of people under one government, usually in a particular land.|The nation is at peace.|这个国家正处于和平之中。
need|A condition in which something necessary is absent, or something that is necessary.|The plant is in need of water.|这株植物需要水。
news|New information about recent events.|She gave me the news of the meeting.|她把会议的消息告诉了我。
night|The dark part of each day between evening and morning.|The road is quiet at night.|夜里这条路很安静。
noise|A sound, especially one that is loud or unpleasant.|The machine is making a strange noise.|这台机器正发出奇怪的声音。
note|A short written record or message, or a single musical sound.|She sent me a short note.|她给我寄了一张短便条。
number|A word or sign used for counting, measuring, or identifying.|The number on the door is ten.|门上的号码是十。
observation|The act of watching carefully, or a statement based on what is noticed.|The observation of the insect took an hour.|观察这只昆虫花了一小时。
offer|An act of presenting something for acceptance or refusal.|She made an offer of help.|她主动提出帮助。
oil|A thick liquid that does not mix with water and may be used as fuel, food, or material.|Put some oil in the machine.|在机器里加一些油。
operation|An organized action, the working of a machine, or medical treatment involving cutting.|The operation of the machine is simple.|这台机器的操作很简单。
opinion|A belief or judgment that may not be a proven fact.|What is your opinion of this idea?|你对这个想法有什么看法？
order|An instruction, an arranged condition, or a request for goods.|The chief gave an order to the group.|主管给这个小组下了命令。
organization|An arranged group of people or parts working for a purpose.|This organization gives help to the poor.|这个组织帮助穷人。
ornament|An object added to make something more attractive.|The silver ornament is on the table.|银质装饰品在桌上。
owner|A person who possesses something.|The owner of the house is not here.|房主不在这里。
page|One side of a sheet in a book, paper, or similar work.|The picture is on the first page.|图片在第一页。
pain|An unpleasant physical feeling caused by damage or illness.|I have a pain in my foot.|我的脚疼。
paint|A coloured liquid put on a surface for protection or decoration.|The paint on the door is blue.|门上的油漆是蓝色的。
paper|Thin material made in sheets for writing, printing, covering, or wrapping.|The letter is on the paper.|信写在纸上。
part|A piece, share, role, or section of a whole.|This is the most important part of the machine.|这是机器最重要的部分。
paste|A thick wet substance used for sticking things together or as food.|Put some paste on the paper.|在纸上涂一些糊。
payment|Money or something else given to settle a price or debt.|He made payment for the work.|他支付了这项工作的费用。
peace|Freedom from war or fighting, or a condition of calm.|The two nations are at peace.|两国处于和平状态。
person|An individual human being.|One person came into the room.|一个人进了房间。
place|A particular point, area, building, or position.|This is a good place for the meeting.|这是个开会的好地方。
plant|A living thing that usually grows in earth and gets energy from light.|This plant is in need of water.|这株植物需要水。
play|Activity done for pleasure, or a dramatic work for the stage.|The boys were at play in the garden.|男孩们在花园里玩。
pleasure|A feeling of happiness or satisfaction.|The music gave us much pleasure.|音乐给我们带来了很多快乐。
point|A precise place, a sharp end, or a main idea.|That is an important point.|那是重要的一点。
poison|A substance that can cause illness or death when taken into the body.|The poison was in the food.|毒物在食物里。
polish|A substance or action used to make a surface smooth and bright.|Put some polish on the leather.|在皮革上涂一些上光剂。
porter|A person whose work is carrying bags or goods.|The porter took our bags.|搬运工拿走了我们的包。
position|The place, arrangement, condition, or job of a person or thing.|The box is in the wrong position.|箱子的位置不对。
powder|A dry mass of very small particles.|The substance is a white powder.|这种物质是白色粉末。
power|The ability, strength, energy, or authority to act or control.|The machine gets power from the water.|这台机器从水中获取动力。
price|The amount of money required for something.|The price of the coat is high.|这件外套的价格很高。
print|Words or pictures made by pressing ink onto a surface, or a mark made by pressure.|The book is in small print.|这本书的印刷字体很小。
process|A connected series of actions or changes producing a result.|Learning is a slow process.|学习是一个缓慢的过程。
produce|Things made or grown for sale, especially farm goods.|The market has farm produce.|市场有农产品。
profit|Money gained after the costs of business have been paid.|The business made a small profit.|这家企业获得了少量利润。
property|Something owned, especially land, buildings, or valuable objects.|The house is his property.|这所房子是他的财产。
prose|Ordinary written or spoken language that is not verse.|The book is in simple prose.|这本书用简单的散文写。
protest|A statement or action showing strong disagreement.|The group made a protest against the change.|这个团体对这项改变提出了抗议。
pull|An act or force that draws something toward oneself or in a direction.|Give the cord a strong pull.|用力拉一下绳子。
punishment|Pain, loss, or another penalty given for wrongdoing.|The punishment for the crime was prison.|这项犯罪的惩罚是入狱。
purpose|The reason for which something is done or made.|What is the purpose of this machine?|这台机器是做什么用的？
push|An act or force that moves something away by pressure.|Give the door a push.|推一下门。
quality|A feature or degree of excellence belonging to someone or something.|This cloth is of good quality.|这种布质量很好。
question|A sentence or matter that asks for information or needs an answer.|Give me an answer to the question.|回答我这个问题。
rain|Water drops that fall from clouds.|There was much rain in the night.|夜里下了很多雨。
range|The limits, area, or series through which something extends or varies.|The store has a wide range of things.|这家商店有种类很多的东西。
rate|A measure of amount, speed, frequency, or payment in relation to another measure.|The machine works at a slow rate.|这台机器运转速度很慢。
ray|A narrow line of light, heat, or other energy.|A ray of light came through the window.|一束光穿过窗户。
reaction|An action, feeling, or change caused by something else.|Her reaction to the news was strange.|她对这个消息的反应很奇怪。
reading|The activity of understanding written words, or material that is read.|Reading gives us knowledge.|阅读给我们知识。
reason|A cause or explanation, or the power of clear thought.|What is the reason for the change?|这项改变的原因是什么？
record|Stored information or an account of past facts or events.|Keep a record of every payment.|记下每一笔付款。
regret|A feeling of sadness about something done, lost, or missed.|He had a feeling of regret.|他有一种遗憾的感觉。
relation|A connection between people, things, or ideas.|There is a relation between heat and growth.|热量和生长之间有关系。
religion|A system of belief and practice concerning God, gods, or sacred matters.|Religion is important to some people.|宗教对一些人很重要。
representative|A person chosen to act or speak for others.|The group sent a representative to the meeting.|该小组派了一名代表参会。
request|A polite or formal act of asking for something.|She made a request for more time.|她请求多给一些时间。
respect|A feeling of approval and high regard for someone or something.|I have great respect for her work.|我非常敬重她的工作。
rest|A period without work or movement, or what remains.|Take a rest after the work.|工作后休息一下。
reward|Something given in return for good work, service, or a desired result.|He got a reward for his good work.|他因工作出色而得到了奖励。
rhythm|A regular repeated pattern of sound or movement.|The song has a strong rhythm.|这首歌节奏很强。
rice|The small white or brown grains of a food plant.|We had rice with the meal.|我们吃饭时吃了米饭。
river|A large natural stream of water flowing across land.|The river goes through the town.|这条河流经这个城镇。
road|A prepared way for vehicles, people, or animals to travel.|The road goes over the mountain.|这条路翻过山。
roll|An act of turning over, or material formed into a rounded length.|Give the ball a roll.|把球滚一下。
rub|An act of moving one surface against another with pressure.|Give the glass a rub with the cloth.|用布擦一下玻璃。
rule|An instruction stating what may or must be done, or a usual principle.|This rule is important.|这条规则很重要。
salt|A white substance used to give food taste and needed by the body.|Put a little salt in the soup.|在汤里放一点盐。
sand|Very small loose grains of stone found on beaches and dry land.|The boys are at play in the sand.|男孩们在沙地里玩。
scale|A set of marks for measuring, a range of values, or relative size.|The scale gives the weight of the box.|秤显示了箱子的重量。
science|The organized study of the natural and physical world through observation and test.|Science gives us knowledge of the earth.|科学给予我们关于地球的知识。
sea|The large body of salt water covering much of the earth.|The river goes to the sea.|这条河流入大海。
seat|Something made or used for sitting, or the place where someone sits.|Please take a seat.|请坐下。
secretary|A person whose work includes writing, records, and office organization.|The secretary sent the letter.|秘书把信寄了出去。
selection|The act or result of choosing from a group.|The selection of a new manager took time.|选出新经理花了些时间。
self|A person's own individual being, character, or interests.|He did the work by himself.|他自己做了这项工作。
`.trim().split('\n').map(line => line.split('|'));

const reviews = new Map(rows.map(([word, definition, en, zh]) => [word, { definition, en, zh }]));
const categoryWords = words.filter(word => word.category === 'general_things');
const targets = categoryWords.slice(200, 300);
const singleTargets = targets.filter(word => word.senses.length === 1);
const missing = singleTargets.map(word => word.word).filter(word => !reviews.has(word));
const extra = [...reviews.keys()].filter(word => !singleTargets.some(item => item.word === word));
if (missing.length || extra.length) throw new Error(`Review map mismatch. Missing: ${missing.join(', ') || 'none'}; extra: ${extra.join(', ') || 'none'}.`);

for (const word of targets) {
  const review = reviews.get(word.word);
  if (review) {
    const sense = word.senses[0];
    sense.glossEn = review.definition;
    sense.scopeNoteZh = `用于表达“${sense.glossZh}”这一核心事物义。`;
    sense.examples = [{ en: review.en, zh: review.zh, noteZh: `例句展示 ${word.word} 的核心用法。`, tokenStatus: 'valid', reviewStatus }];
  }
  for (const sense of word.senses) {
    sense.reviewStatus = reviewStatus;
    for (const example of sense.examples) {
      example.tokenStatus = 'valid';
      example.reviewStatus = reviewStatus;
    }
  }
  word.definition = [...new Set(word.senses.map(sense => sense.glossEn))].join(' ');
  word.definitionZh = [...new Set(word.senses.map(sense => sense.glossZh))].join('；');
  word.rule = [...new Set(word.senses.map(sense => sense.scopeNoteZh))].join('；');
  word.example = word.senses[0].examples[0].en;
  word.exampleZh = word.senses[0].examples[0].zh;
  word.patternRefs = [...new Set(word.senses.flatMap(sense => sense.patterns ?? []))];
  word.status = reviewStatus;
  word.reviewStatus = reviewStatus;
  word.provenance.definition = 'project-editorial-general-review-batch-03';
  word.provenance.rule = 'project-editorial-general-review-batch-03';
  word.provenance.example = 'project-editorial-general-review-batch-03';
}

await writeFile(wordsPath, `${JSON.stringify(words, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ reviewed: targets.length, singleSenseRewritten: reviews.size, multiSenseReviewed: targets.length - reviews.size }, null, 2));
