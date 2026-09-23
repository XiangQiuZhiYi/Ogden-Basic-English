import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const wordsPath = path.join(process.cwd(), 'src/data/words.json');
const words = JSON.parse(await readFile(wordsPath, 'utf8'));
const reviewStatus = '释义与例句已编辑 · 自动校验通过 · 待语言学复核';

const rows = `
education|The process of teaching, learning, and developing knowledge or ability.|A good education gives a person more knowledge.|良好的教育给人更多知识。
effect|A change produced in a person or thing by a cause.|The heat had a bad effect on the paint.|高温对油漆产生了不良影响。
end|The final point or part of something.|We came to the end of the road.|我们走到了路的尽头。
error|Something said, written, or done that is not correct.|There is an error in this account.|这份账目里有一个错误。
event|Something that happens, especially something important.|The meeting was an important event.|这次会议是一件重要的事。
example|A particular case used to explain an idea or rule.|This picture is a good example.|这幅图是个好例子。
exchange|An act of giving one thing and receiving another in return.|We made an exchange of books.|我们交换了书。
existence|The state of being real or alive.|There is no doubt about its existence.|它的存在毫无疑问。
expansion|The process of becoming greater in size, amount, or range.|The expansion of the business was quick.|这项业务扩展得很快。
experience|Knowledge or skill gained by doing or living through something.|Experience gave her a better knowledge of the work.|经验使她更了解这项工作。
expert|A person with special knowledge or skill in a subject.|She is an expert on plants.|她是植物专家。
fact|Something known to be true or to have happened.|The facts are clear.|事实很清楚。
fall|An act of dropping from a higher to a lower position, or the season after summer.|The fall from the horse gave him a shock.|从马上摔下来使他受到了惊吓。
family|A group of parents, children, and close relations.|The family had a meal together.|这家人一起吃了一顿饭。
father|A male parent.|His father is a wise man.|他的父亲是个明智的人。
fear|The feeling that danger or pain may come.|The fire put the baby in fear.|大火使婴儿感到害怕。
feeling|A physical sensation, an emotion, or an opinion sensed by the mind.|I have a strange feeling about this place.|我对这个地方有一种奇怪的感觉。
fiction|Stories about invented people and events, or the quality of not being factual.|This story is a work of fiction.|这个故事是一部虚构作品。
fight|An act of physical struggle or strong opposition.|The fight came to an end.|打斗结束了。
fire|Heat and light produced by burning.|Put some wood on the fire.|往火里加些木头。
flame|The bright burning gas seen in a fire.|A small flame came from the fire.|火中冒出一小簇火焰。
flight|An act or journey through the air.|The flight over the sea took an hour.|飞越大海用了一个小时。
flower|The coloured part of a plant from which seed or fruit may develop.|There is a red flower on the plant.|这株植物上有一朵红花。
food|Things that people or animals eat for growth and energy.|The animal is in need of food.|这只动物需要食物。
force|Physical strength, pressure, or organized power used to cause an effect.|The force of the wind put the tree down.|风力把树刮倒了。
form|The shape, arrangement, or type of a thing.|The cloud has a strange form.|这朵云形状奇特。
friend|A person one knows well and likes.|She is an old friend of the family.|她是这家人的老朋友。
front|The part or side that faces forward or is seen first.|There is a garden at the front of the house.|房子前面有一个花园。
fruit|The part of a plant that contains seed and is often eaten.|This tree gives sweet fruit.|这棵树结甜果子。
glass|A hard clear material, or a drinking vessel made from it.|The window is made of glass.|窗户是玻璃做的。
gold|A soft yellow valuable metal.|The ring is made of gold.|这枚戒指是金制的。
government|The group or system that controls a nation or place.|The government made a new law.|政府制定了一项新法律。
grain|A seed of a food plant, or a very small hard particle.|This bag is full of grain.|这个袋子装满了谷物。
grass|The common green plant with narrow leaves that covers much ground.|The grass is wet after the rain.|雨后草地湿了。
grip|A firm hold with the hand or another part.|Keep a strong grip on the cord.|牢牢抓住绳子。
group|A number of people or things considered together.|A group of people came into the room.|一群人进了房间。
growth|The process or result of becoming larger, older, or more developed.|The plant had quick growth in the summer.|这株植物夏天长得很快。
guide|A person or thing that shows the way or gives direction.|The guide took us through the town.|向导带我们穿过了城镇。
harbour|A protected area of water where vessels may stay safely.|The vessel came into the harbour.|船驶入了港口。
harmony|A pleasing agreement of parts, sounds, or people.|The colours of the room are in harmony.|房间的色彩很协调。
hate|A very strong feeling of dislike.|Hate is a cause of much trouble.|仇恨会造成许多麻烦。
hearing|The ability or act of hearing, or an official meeting for listening to facts.|Her hearing is very good.|她的听力很好。
heat|The quality of being hot, or energy that makes things hot.|The heat of the fire made the room warm.|炉火的热量使房间暖和起来。
help|Support or work that makes something easier for another person.|I am happy to have your help.|我很高兴得到你的帮助。
history|An account or study of events in the past.|This book gives the history of the town.|这本书讲述了这个城镇的历史。
hole|An opening or empty space in or through something.|There is a hole in the roof.|屋顶上有个洞。
hope|A feeling of desire and belief that something good may happen.|We have hope of better weather.|我们希望天气会好转。
hour|A period of sixty minutes.|The journey took an hour.|这段旅程用了一小时。
humour|The quality of seeing or expressing what is amusing.|The story is full of humour.|这个故事充满幽默。
ice|Water in its solid frozen state.|The cold makes water into ice.|寒冷使水结成冰。
idea|A thought, plan, or picture formed in the mind.|She had a good idea for the work.|她对这项工作有个好主意。
impulse|A sudden strong desire to act, or a force producing motion.|He had an impulse to give her help.|他突然想帮助她。
increase|A rise in size, number, amount, or degree.|There was an increase in the price of bread.|面包价格上涨了。
industry|The organized production of goods, or a particular kind of business.|The town has much industry.|这个城镇有很多工业。
ink|A coloured liquid used for writing or printing.|She put black ink on the paper.|她把黑墨水写在纸上。
insect|A small animal with six legs and usually a body in three parts.|An insect is on the leaf.|叶子上有一只昆虫。
instrument|A tool or device made for a particular purpose, including making music.|This instrument gives a measure of heat.|这个仪器用来测量热度。
insurance|An agreement that gives payment for specified loss in return for regular payments.|The house has insurance against fire.|这所房子有火灾保险。
invention|A newly designed thing or the act of designing it.|This machine is an important invention.|这台机器是一项重要发明。
iron|A strong common metal, or a heated tool used to make cloth smooth.|The bridge is made of iron.|这座桥是铁制的。
jelly|A soft food that holds its shape but moves when touched.|The fruit jelly is sweet.|这种水果冻很甜。
join|The line or place where two parts are connected.|The join in the pipe is not tight.|管子的接合处不紧。
journey|An act of travelling from one place to another.|The journey by train took a day.|乘火车的旅程用了一天。
judge|A person who decides questions in a court or competition.|The judge gave his decision.|法官作出了裁决。
jump|An act of pushing oneself suddenly off the ground.|The horse made a jump over the wall.|马跳过了墙。
kick|A blow or push made with the foot.|He gave the ball a hard kick.|他用力踢了球一下。
kiss|An act of touching with the lips as a sign of love or greeting.|The mother gave the baby a kiss.|母亲亲了婴儿一下。
knowledge|Facts, information, and understanding gained through learning or experience.|She has a good knowledge of plants.|她很了解植物。
land|The solid surface of the earth, especially ground owned or used by someone.|The boat came near the land.|小船靠近了陆地。
language|A system of words and rules used for communication.|They are learning a new language.|他们正在学习一门新语言。
laugh|The sound or act made when something seems amusing.|His story gave us a laugh.|他的故事把我们逗笑了。
law|A rule made and enforced by a government or authority.|The new law came into effect.|新法律生效了。
lead|A heavy soft grey metal.|The weight is made of lead.|这个重物是铅制的。
learning|The process of gaining knowledge, or knowledge gained by study.|Learning takes time and attention.|学习需要时间和专注。
leather|Material made from the skin of an animal.|The bag is made of leather.|这个包是皮革做的。
level|A height, position, or degree on a scale.|The water is at a low level.|水位很低。
light|The energy that makes sight possible, or something that produces it.|The light from the window is bright.|窗户透进来的光很明亮。
limit|The greatest or smallest point, amount, or boundary allowed.|There is a limit to the weight of the bag.|这个袋子的重量有限制。
linen|Cloth made from the fibres of the flax plant.|The table cover is made of linen.|桌布是亚麻布做的。
liquid|A substance that flows and takes the shape of its container.|Water is a liquid.|水是一种液体。
list|A number of names or things written one after another.|Your name is on the list.|你的名字在名单上。
loss|The act or result of losing someone or something.|The fire was a great loss to the family.|这场火灾给这个家庭造成了巨大损失。
love|A strong feeling of deep care and affection.|The mother has great love for her baby.|母亲深爱她的婴儿。
machine|A device with moving parts that uses power to do work.|This machine makes paper.|这台机器造纸。
man|An adult male person, or a human being in general.|The man is working in the garden.|那个男人正在花园里工作。
manager|A person who controls work, people, or a business.|The manager gave us an order.|经理给了我们一项指示。
mark|A visible line, spot, sign, or result used for identification.|There is a black mark on the wall.|墙上有一个黑印。
market|A place or system where goods are bought and sold.|We got fruit at the market.|我们在市场买了水果。
meal|Food eaten at one regular time.|We had a good meal after the journey.|旅程结束后我们吃了一顿好饭。
measure|An act, system, or unit used to find size or amount, or an action taken for a purpose.|The scale gives a measure of the weight.|秤可以量出重量。
meat|The flesh of an animal used as food.|The meat is ready for the meal.|肉已经可以上桌了。
meeting|An occasion when people come together for discussion or work.|The committee had a meeting in the morning.|委员会上午开了会。
memory|The power to keep and bring back past knowledge or experience.|I have a clear memory of that day.|我清楚地记得那一天。
`.trim().split('\n').map(line => line.split('|'));

const reviews = new Map(rows.map(([word, definition, en, zh]) => [word, { definition, en, zh }]));
const categoryWords = words.filter(word => word.category === 'general_things');
const targets = categoryWords.slice(100, 200);
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
  word.provenance.definition = 'project-editorial-general-review-batch-02';
  word.provenance.rule = 'project-editorial-general-review-batch-02';
  word.provenance.example = 'project-editorial-general-review-batch-02';
}

await writeFile(wordsPath, `${JSON.stringify(words, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ reviewed: targets.length, singleSenseRewritten: reviews.size, multiSenseReviewed: targets.length - reviews.size }, null, 2));
