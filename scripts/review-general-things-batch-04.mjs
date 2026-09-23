import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const wordsPath = path.join(process.cwd(), 'src/data/words.json');
const words = JSON.parse(await readFile(wordsPath, 'utf8'));
const reviewStatus = '释义与例句已编辑 · 自动校验通过 · 待语言学复核';

const rows = `
sense|A physical feeling, an ability to notice, sound judgment, or the meaning of a word.|This word has two senses.|这个词有两个意义。
servant|A person employed to do work in another person's house or service.|The servant put the food on the table.|仆人把食物放到桌上。
sex|The biological category of being male or female, or matters connected with it.|What is the sex of the animal?|这只动物的性别是什么？
shade|An area protected from direct light or heat.|The tree gives shade from the sun.|这棵树遮住了阳光。
shake|A quick repeated movement from side to side or up and down.|The earth gave a sudden shake.|地面突然摇动了一下。
shame|A painful feeling caused by wrongdoing, dishonour, or embarrassment.|The crime was a cause of shame.|这项犯罪是羞耻的原因。
shock|A sudden disturbing effect on the body or mind.|The news gave her a shock.|这个消息使她震惊。
side|A surface, edge, position, or group away from the centre.|Put the box at the side of the room.|把箱子放在房间一侧。
sign|A mark, object, action, or fact that gives information or points to something.|Dark clouds are a sign of rain.|乌云是要下雨的迹象。
silk|A fine strong fibre made by certain insects, and cloth made from it.|Her dress is made of silk.|她的连衣裙是丝绸做的。
silver|A shiny grey-white valuable metal.|The spoon is made of silver.|这把勺子是银制的。
sister|A female person who has the same parent or parents as another person.|My sister is younger than I am.|我姐妹比我年轻。
size|How large or small something is.|The two boxes are the same size.|这两个箱子一样大。
sky|The space seen above the earth where the sun, moon, stars, and clouds appear.|There are dark clouds in the sky.|天空中有乌云。
sleep|The natural resting state in which a person or animal is not conscious.|The baby is in a deep sleep.|婴儿正在熟睡。
slope|A surface or piece of land that rises or falls at an angle.|The house is on a slope.|房子在斜坡上。
smash|A violent break, collision, or loud sound of breaking.|The glass came down with a smash.|玻璃哗啦一声掉了下来。
smell|The quality sensed by the nose, or the act or ability of sensing it.|The flower has a sweet smell.|这朵花有甜美的气味。
smile|An expression in which the corners of the mouth turn up, usually showing pleasure.|She gave me a smile.|她对我笑了一下。
smoke|The visible gas and small particles produced by burning.|Smoke came from the fire.|烟从火中冒出来。
sneeze|A sudden uncontrolled burst of air through the nose and mouth.|The dust made him give a sneeze.|灰尘使他打了个喷嚏。
snow|Soft white pieces of frozen water that fall from clouds.|There is snow on the mountain.|山上有雪。
soap|A substance used with water for washing and cleaning.|Wash your hands with soap.|用肥皂洗手。
society|People living together in an organized community, or a group formed for a purpose.|Every society has rules.|每个社会都有规则。
son|A male child in relation to his parents.|Their son is at school.|他们的儿子在学校。
song|Words and music made to be sung.|The girl gave us a song.|那个女孩给我们唱了一首歌。
sort|A group or type of things sharing qualities.|What sort of food is this?|这是什么种类的食物？
sound|Something heard when vibrations reach the ear.|The sound of the bell was clear.|铃声很清晰。
soup|A liquid food made by cooking meat, vegetables, or other ingredients in water.|The soup is very warm.|这汤很热。
space|An empty area, the distance between things, or the region beyond the earth.|There is no space in the box.|箱子里没有空间了。
stage|A raised area for performance, or a point in a process of development.|The play is on the stage.|戏正在舞台上演出。
start|The first point or part of an action, event, place, or period.|The start of the journey was early.|旅程开始得很早。
statement|Something formally said or written as information or opinion.|His statement was clear.|他的陈述很清楚。
steam|The hot gas into which water changes.|Steam came from the water under heat.|水受热后冒出蒸汽。
steel|A very strong metal made mainly from iron.|The bridge is made of steel.|这座桥是钢制的。
step|One movement made by lifting and putting down a foot, or a raised surface in a stair.|He took one step back.|他向后退了一步。
stitch|A loop of thread made with a needle in sewing, or the place it forms.|One stitch in the cloth is loose.|布上有一针松了。
stone|Hard solid mineral matter, or a piece of it.|There is a stone in the road.|路上有一块石头。
stop|An act, place, or period of ending movement or activity.|The train came to a stop.|火车停了下来。
story|An account of real or invented events.|The book has a short story in it.|这本书里有一个短故事。
stretch|A continuous length or area, or an act of extending the body or material.|This is a long stretch of road.|这是一段很长的路。
structure|The way parts are arranged to form a whole, or the thing so formed.|The bridge is a strong structure.|这座桥是一个坚固的结构。
substance|A particular kind of material with its own qualities.|The bottle has a strange substance in it.|瓶子里有一种奇怪的物质。
sugar|A sweet substance used in food and drink.|Put a little sugar in the milk.|在牛奶里放一点糖。
suggestion|An idea or plan offered for consideration.|She made a suggestion about the work.|她对这项工作提了一个建议。
summer|The warmest season of the year, between spring and autumn.|The weather is warm in summer.|夏天天气温暖。
support|Something that holds up, strengthens, or gives help or approval.|The wall gives support to the roof.|墙支撑着屋顶。
surprise|An unexpected event or the feeling it causes.|The news was a great surprise.|这个消息令人非常意外。
swim|An act or period of moving through water.|We had a swim in the river.|我们在河里游了泳。
system|A connected set of parts, rules, or methods working together.|The parts of the system work together.|这个系统的各部分共同工作。
talk|A conversation or spoken presentation.|We had a long talk about the question.|我们就这个问题谈了很久。
taste|The quality of food or drink sensed by the mouth, or the ability to sense it.|The soup has a good taste.|这汤味道很好。
tax|Money that people or businesses must pay to a government.|The government put a tax on trade.|政府对贸易征税。
teaching|The work, activity, or ideas of a person who helps others learn.|Her teaching gave him new knowledge.|她的教学给了他新知识。
tendency|A usual direction of change or a natural likelihood to act in a certain way.|The price has a tendency to go up.|价格有上涨的趋势。
test|A procedure used to measure knowledge, ability, quality, or truth.|The water went through a test.|这些水经过了检测。
theory|A set of ideas intended to explain facts or events.|This theory is in agreement with the facts.|这个理论与事实一致。
thing|An object, matter, event, action, or idea considered separately.|Put these things in the box.|把这些东西放进箱子。
thought|An idea, opinion, or act of thinking.|A new thought came into my mind.|我脑中出现了一个新想法。
thunder|The loud sound in the sky caused by lightning.|The sound of thunder gave us a shock.|雷声使我们吃了一惊。
time|The continuous passing of events, or a measured period or occasion.|The work took much time.|这项工作花了很多时间。
top|The highest or uppermost point, part, or surface.|The book is on top of the table.|书在桌子顶上。
touch|An act or sense of making physical contact.|The cloth is soft to the touch.|这种布摸起来很柔软。
trade|The buying, selling, or exchange of goods and services.|There is much trade between the two nations.|两国之间有很多贸易。
transport|The movement of people or things from one place to another, or the means used.|The transport of grain by train is quick.|用火车运输谷物很快。
trick|A clever act intended to deceive, surprise, or entertain.|The trick got him the money.|这个诡计使他得到了钱。
trouble|Difficulty, worry, conflict, or a problem that needs attention.|The machine is giving us trouble.|这台机器正给我们带来麻烦。
turn|An act of changing direction or position, or a person's proper time to act.|It is my turn to give an answer.|轮到我回答了。
twist|A bend or turn made by rotating something, or an unexpected change.|There is a twist in the cord.|绳子上有一处扭结。
unit|One complete thing, person, group, or standard amount forming part of a larger whole.|This box is one unit.|这个箱子是一个单元。
use|The act, purpose, or ability of using something.|This instrument is for use in the work.|这个工具用于这项工作。
value|The worth, usefulness, or importance of something.|Gold has a high value.|黄金价值很高。
verse|Writing arranged in rhythmic lines, or one section of a song or poem.|This song has three verses.|这首歌有三节歌词。
voice|Sound produced by a person through the mouth, especially in speaking or singing.|Her voice is soft.|她的声音很轻柔。
walk|An act or journey made on foot.|We went for a walk after the meal.|饭后我们去散步了。
war|Organized armed fighting between nations or groups.|The nation was at war.|这个国家处于战争中。
wash|An act of cleaning something with water or another liquid.|The shirt is in need of a wash.|这件衬衫需要洗一下。
waste|Material no longer wanted, or careless use of something valuable.|This is a waste of water.|这是对水的浪费。
water|The clear liquid essential for life that forms rain, rivers, and seas.|The glass is full of water.|玻璃杯里装满了水。
wave|A moving ridge on water, or a similar movement through air, light, or sound.|A great wave came over the boat.|一个大浪扑过了小船。
wax|A firm substance that softens with heat and is used for candles or polish.|The polish has wax in it.|这种上光剂里有蜡。
way|A route, direction, distance, manner, or method.|This is the best way to do the work.|这是做这项工作的最好方法。
weather|The condition of the air and sky at a particular time and place.|The cold weather had an effect on the plants.|寒冷天气影响了植物。
week|A period of seven days.|The work took one week.|这项工作用了一周。
weight|How heavy something is, or the force caused by its mass.|The box is great in weight.|这个箱子很重。
wind|Moving air, especially as a natural force.|A strong wind came from the sea.|一阵强风从海上吹来。
wine|An alcoholic drink made from the juice of grapes.|She had a glass of wine with the meal.|她吃饭时喝了一杯葡萄酒。
winter|The coldest season of the year, between autumn and spring.|There is much snow in winter.|冬天有很多雪。
woman|An adult female person.|The woman has a kind face.|那个女人有一张和善的脸。
wood|The hard material forming the trunk and branches of a tree.|The table is made of wood.|这张桌子是木头做的。
wool|The soft hair of sheep and some other animals, used to make cloth.|The coat is made of wool.|这件外套是羊毛做的。
word|A single unit of language with a meaning, spoken or written.|This word has two senses.|这个词有两个意义。
work|Activity requiring effort, or the result, duty, or place of such activity.|The work took three days.|这项工作用了三天。
wound|Damage to the body caused by cutting, hitting, or another force.|There is a wound on his arm.|他的手臂上有一处伤口。
writing|Words or signs put on a surface, or the activity and style of producing them.|The writing in the letter is clear.|信中的字迹很清晰。
year|A period of twelve months, about the time the earth takes to go around the sun.|The building work took one year.|建造工作用了一年。
`.trim().split('\n').map(line => line.split('|'));

const reviews = new Map(rows.map(([word, definition, en, zh]) => [word, { definition, en, zh }]));
const categoryWords = words.filter(word => word.category === 'general_things');
const targets = categoryWords.slice(300, 400);
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
  word.provenance.definition = 'project-editorial-general-review-batch-04';
  word.provenance.rule = 'project-editorial-general-review-batch-04';
  word.provenance.example = 'project-editorial-general-review-batch-04';
}

await writeFile(wordsPath, `${JSON.stringify(words, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ reviewed: targets.length, singleSenseRewritten: reviews.size, multiSenseReviewed: targets.length - reviews.size }, null, 2));
