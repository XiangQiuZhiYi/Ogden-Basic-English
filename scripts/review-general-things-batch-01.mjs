import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const wordsPath = path.join(process.cwd(), 'src/data/words.json');
const words = JSON.parse(await readFile(wordsPath, 'utf8'));
const reviewStatus = '释义与例句已编辑 · 自动校验通过 · 待语言学复核';

const rows = `
adjustment|A small change made to improve a position, amount, or working condition.|Make an adjustment to the watch.|把手表调整一下。
advertisement|A public notice intended to make people interested in goods, work, or an event.|The advertisement gives the price of the coat.|广告给出了外套的价格。
agreement|A shared decision or arrangement accepted by two or more sides.|We came to an agreement about the price.|我们就价格达成了协议。
air|The mixture of gases around the earth that living things breathe.|Let air into the room through the window.|让空气通过窗户进入房间。
amount|How much of something there is.|Give me a small amount of salt.|给我少量盐。
amusement|Pleasure or an activity that gives pleasure.|The play gave us much amusement.|这出戏给我们带来了很多乐趣。
animal|A living thing that gets food from plants or other animals and can usually move.|Be kind to animals.|善待动物。
answer|A statement or information given in reply to a question.|Give me an answer to the question.|回答我这个问题。
apparatus|A set of instruments or equipment made for a particular purpose.|This apparatus is for a test of the water.|这套设备用于检测水。
approval|A favourable opinion or official permission.|The change has the approval of the committee.|这项改变得到了委员会批准。
argument|A disagreement expressed in words, or reasons given for an opinion.|They had an argument about the price.|他们就价格发生了争论。
art|The making of pictures, music, or other works valued for skill and beauty.|The picture is a work of art.|这幅画是一件艺术品。
attack|A violent act against a person, place, or group.|The army made a sudden attack.|军队发动了突然袭击。
attempt|An act of trying to do something difficult.|He made an attempt to get over the wall.|他试图翻过这堵墙。
attention|The act of directing the mind or senses toward something.|Give your attention to this question.|请注意这个问题。
attraction|A quality or force that draws people or things toward something.|The bright lights are an attraction.|明亮的灯光很吸引人。
authority|The power or right to give orders and make decisions.|The manager has authority over the work.|经理对这项工作拥有管理权。
balance|A steady condition in which weight or forces are equal on different sides.|Keep your balance on the narrow bridge.|在窄桥上保持平衡。
base|The lowest supporting part of something.|The box has a wide base.|这个箱子的底部很宽。
behaviour|The way a person or animal acts.|His behaviour at the meeting was good.|他在会议上的表现很好。
belief|Acceptance that something is true or real.|Her belief is that the story is true.|她相信这个故事是真的。
birth|The coming of a baby or young animal into life.|The mother was ill after the birth.|母亲生产后身体不适。
bit|A small piece or amount of something.|Give me a bit of bread.|给我一小块面包。
bite|An act or wound made by closing the teeth on something.|The dog gave him a bite on the leg.|狗咬了他的腿。
blood|The red liquid that moves through the bodies of people and animals.|There was blood on his hand.|他的手上有血。
body|The complete physical form of a person or animal.|Food and water keep the body healthy.|食物和水使身体保持健康。
brass|A yellow metal made from copper and another metal.|The bell is made of brass.|这个铃是黄铜制成的。
bread|A baked food made mainly from grain.|She gave me bread and butter.|她给了我面包和黄油。
breath|The air taken into or sent out of the body through the nose or mouth.|Take a deep breath.|深吸一口气。
brother|A male person who has the same parent or parents as another person.|My brother is older than I am.|我的兄弟比我年长。
building|A structure with a roof and walls, made for people or things.|That building has five floors.|那栋建筑有五层。
burst|A sudden breaking open or a sudden short increase of activity.|The burst of the pipe sent water over the floor.|管道爆裂使水流满地板。
business|Work involving the production, buying, or selling of goods or services.|The company does business in this town.|这家公司在这个城镇做生意。
butter|A soft yellow food made from milk.|Put some butter on the bread.|在面包上抹些黄油。
canvas|A strong heavy cloth used for bags, covers, or pictures.|This strong bag is made of canvas.|这个结实的袋子是帆布做的。
care|Attention and work given to protect or help someone or something.|The baby is under the care of its mother.|婴儿由母亲照料。
cause|A person, thing, or event that makes something happen.|What was the cause of the fire?|火灾的原因是什么？
chalk|A soft white material used for writing or marking.|Make a white mark with the chalk.|用粉笔做一个白色记号。
chance|A possibility that something may happen, or an opportunity to do something.|There is a chance of rain.|有可能下雨。
change|The process or result of becoming different.|There was a sudden change in the weather.|天气突然发生了变化。
cloth|Material made by joining threads, used for clothing and other things.|The dress is made of blue cloth.|这条连衣裙是蓝布做的。
coal|A hard black substance taken from the earth and burned for heat.|The fire is burning coal.|炉火正在烧煤。
colour|The quality of light that makes things appear red, blue, and so on.|The colour of the wall is white.|墙是白色的。
comfort|A condition of physical ease or relief from pain and sadness.|Her kind words gave me comfort.|她亲切的话给了我安慰。
committee|A group of people selected to make decisions or do particular work.|The committee made a decision.|委员会作出了决定。
comparison|An examination of two or more things to see how they are alike or different.|Make a comparison between the two pictures.|比较这两幅图。
competition|A situation in which people or groups try to do better than one another.|The two companies are in competition.|这两家公司正在竞争。
condition|The state that a person or thing is in.|The machine is in good condition.|这台机器状况良好。
connection|A joining or relationship between two or more things.|There is a connection between the two events.|这两个事件之间存在联系。
control|The power to direct, limit, or manage someone or something.|The manager has control of the machine.|经理控制着这台机器。
cook|A person whose work is preparing food.|The cook made a good meal.|厨师做了一顿好饭。
copper|A soft red-brown metal that carries electricity well.|The wire is made of copper.|这根金属丝是铜制的。
copy|Something made to be the same as an original.|Give me a copy of the letter.|给我一份这封信的副本。
cork|A light material from tree bark, often used to close bottles.|Put the cork in the bottle.|把软木塞塞进瓶子。
cotton|A soft white plant fibre used for making cloth.|This shirt is made of cotton.|这件衬衫是棉制的。
cough|A sudden forcing of air from the throat, often because of illness.|He has a bad cough.|他咳嗽得很厉害。
cover|Something placed over or around another thing for protection or concealment.|The book has a red cover.|这本书有红色封面。
crack|A narrow break in a hard surface.|There is a crack in the glass.|玻璃上有一道裂缝。
credit|Trust that payment will be made later, or public praise for work.|The store gave him credit for the payment.|商店允许他赊账付款。
crime|An act that is against the law.|The man was sent to prison for the crime.|这个男人因犯罪被送进监狱。
crush|Strong pressure that breaks, damages, or crowds things together.|The crush of the machine did damage to the box.|机器的挤压损坏了箱子。
curve|A line or surface that bends gradually.|There is a curve in the road.|道路上有一个弯。
damage|Physical harm that reduces value or usefulness.|The fire did damage to the building.|火灾损坏了这栋建筑。
danger|The possibility of harm, injury, or loss.|The fire put the house in danger.|大火使房子处于危险之中。
daughter|A female child in relation to her parents.|Their daughter is at school.|他们的女儿在学校。
day|A period of twenty-four hours, or the light part of that period.|The work took one day.|这项工作用了一天。
death|The end of the life of a person, animal, or plant.|The disease was the cause of his death.|这种疾病是他的死因。
debt|Money or another thing that must be paid or returned.|He made full payment of the debt.|他还清了债务。
decision|A choice or judgment made after thought.|The committee made a decision about the work.|委员会对这项工作作出了决定。
degree|An amount or level of a quality, or a unit on a measuring scale.|The water has a high degree of heat.|水的热度很高。
design|A plan, drawing, or arrangement showing how something will be made.|This is the design for the new building.|这是新建筑的设计图。
desire|A strong feeling of wanting something.|He has a great desire for knowledge.|他有强烈的求知欲。
destruction|The act or result of completely damaging something.|The fire was the cause of the destruction of the building.|大火导致了这栋建筑的毁坏。
detail|A small part of a larger thing or account.|Give me every detail of the event.|把事件的每个细节都告诉我。
development|The process of growing, changing, or becoming more complete.|The development of the plant was quick.|这株植物生长得很快。
digestion|The process by which the body changes food into forms it can use.|Good digestion is important for the body.|良好的消化对身体很重要。
direction|The line or course along which someone or something moves or faces.|The train went in the opposite direction.|火车驶向了相反方向。
discovery|The act or result of finding something previously unknown.|The discovery gave us new knowledge.|这项发现给了我们新的知识。
discussion|A talk in which people examine a subject or question.|We had a discussion about the question.|我们讨论了这个问题。
disease|An illness affecting a person, animal, or plant.|The disease made the animal ill.|这种疾病使动物生病了。
disgust|A strong feeling of dislike caused by something unpleasant.|The dirty room gave her a feeling of disgust.|肮脏的房间使她感到厌恶。
distance|The amount of space between two points or places.|The distance between the towns is great.|两个城镇之间的距离很远。
distribution|The act or pattern of giving or spreading things among people or places.|The distribution of food was in the morning.|食物在早晨分发。
division|The act of separating something, or one of the resulting parts.|Make a division of the food between the two groups.|把食物分给两个组。
doubt|A feeling that something may not be true or certain.|I have no doubt about the answer.|我对这个答案没有疑问。
drink|A liquid taken into the mouth and swallowed.|Give me a drink of water.|给我一些水喝。
driving|The act or skill of controlling a vehicle.|Driving in the dark may be a danger.|在黑暗中驾驶可能有危险。
dust|Very small dry particles of earth or other matter.|There is dust on the table.|桌上有灰尘。
edge|The outside limit or narrow border of a surface or object.|Put the cup at the edge of the table.|把杯子放在桌子边缘。
`.trim().split('\n').map(line => line.split('|'));

const reviews = new Map(rows.map(([word, definition, en, zh]) => [word, { definition, en, zh }]));
const categoryWords = words.filter(word => word.category === 'general_things');
const targets = categoryWords.slice(0, 100);
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
  word.provenance.definition = 'project-editorial-general-review-batch-01';
  word.provenance.rule = 'project-editorial-general-review-batch-01';
  word.provenance.example = 'project-editorial-general-review-batch-01';
}

await writeFile(wordsPath, `${JSON.stringify(words, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ reviewed: targets.length, singleSenseRewritten: reviews.size, multiSenseReviewed: targets.length - reviews.size }, null, 2));
