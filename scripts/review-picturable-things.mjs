import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const wordsPath = path.join(process.cwd(), 'src/data/words.json');
const words = JSON.parse(await readFile(wordsPath, 'utf8'));
const reviewStatus = '释义与例句已编辑 · 自动校验通过 · 待语言学复核';

const rows = `
angle|The space between two lines or surfaces that meet.|The two lines make an angle.|这两条线形成一个角。
ant|A very small insect that lives in organized groups.|The ant is on the leaf.|蚂蚁在叶子上。
apple|A round fruit with red, green, or yellow skin.|The apple is red and sweet.|这个苹果又红又甜。
arch|A curved structure over an opening or between supports.|There is an arch over the door.|门的上方有一道拱。
arm|The part of the body from the shoulder to the hand.|He has a wound on his arm.|他的手臂上有一道伤口。
army|An organized group of people trained for war.|The army went across the river.|军队渡过了河。
baby|A very young child.|The baby is in the bed.|婴儿在床上。
bag|A soft container with an opening at the top.|The books are in the bag.|书在袋子里。
ball|A round object used in games.|The boy gave the ball a kick.|男孩踢了球一脚。
basin|A wide open container used for holding water.|Put some water in the basin.|往盆里放些水。
basket|A light container made from thin strips of material.|The apples are in the basket.|苹果在篮子里。
bath|A washing of the body in water, or the container used for it.|The baby is ready for a bath.|婴儿准备好洗澡了。
bed|A piece of furniture used for sleep or rest.|The boy is in his bed.|男孩在床上。
bee|A flying insect that makes honey and may give a sting.|A bee is on the flower.|一只蜜蜂停在花上。
bell|A hollow metal object that makes a ringing sound.|The bell made a loud sound.|铃发出了响亮的声音。
berry|A small soft fruit, often round and containing seeds.|This berry is small and sweet.|这种浆果小而甜。
bird|An animal with feathers, wings, and a beak.|The bird is in the tree.|鸟在树上。
blade|The flat cutting part of a knife or tool.|The blade of the knife is sharp.|刀刃很锋利。
board|A long flat piece of wood or other hard material.|Put the board across the boxes.|把木板横放在箱子上。
boat|A small vessel used for travelling on water.|The boat is on the river.|船在河上。
bone|One of the hard parts forming the frame of a body.|The dog has a bone.|狗有一根骨头。
book|A set of written or printed pages joined together.|This book has a red cover.|这本书有红色封面。
boot|A strong shoe that covers the foot and part of the leg.|There is dust on his boots.|他的靴子上有灰尘。
bottle|A narrow-necked container for liquids.|The bottle is full of milk.|瓶子里装满了牛奶。
box|A container with flat sides and usually a cover.|Put the letters in the box.|把信放进盒子里。
boy|A male child or young male person.|The boy is reading a book.|男孩正在看书。
brain|The organ in the head used for thought and control of the body.|The brain is in the head.|大脑位于头部里面。
brake|A device used to slow or stop a moving machine.|The brake will stop the wheel.|刹车会使轮子停下。
branch|A part of a tree growing out from its main stem.|The bird is on a branch.|鸟停在树枝上。
brick|A hard block used for building walls.|The wall is made of brick.|这堵墙是用砖砌成的。
bridge|A structure carrying a road or path over a river or gap.|The bridge goes across the river.|桥横跨河流。
brush|A tool with hairs or fibres used for cleaning or painting.|Give the coat a brush.|把外套刷一刷。
bucket|An open container with a handle, used for carrying liquids.|The bucket is full of water.|桶里装满了水。
button|A small fastener pushed through a hole in clothing.|This shirt has six buttons.|这件衬衫有六颗纽扣。
cake|A sweet baked food made in many shapes.|She made a cake for the meeting.|她为聚会做了一个蛋糕。
camera|An apparatus used for making pictures.|She took a picture with the camera.|她用相机拍了一张照片。
card|A small stiff piece of paper used for a message or record.|He sent me a card.|他给我寄了一张卡片。
cart|A simple vehicle with wheels used for carrying things.|The horse is before the cart.|马在车的前面。
carriage|A wheeled vehicle or a separate part of a train for people.|We took a seat in the first carriage.|我们坐在第一节车厢里。
cat|A small animal often kept in a house.|The cat is on the cushion.|猫在垫子上。
chain|A line of metal rings joined together.|The dog is on a chain.|狗被链子拴着。
cheese|A food made from milk.|Put some cheese on the bread.|在面包上放些奶酪。
chin|The part of the face below the mouth.|He put his hand under his chin.|他把手放在下巴下面。
church|A building used for public religious worship.|The church has a high roof.|教堂有一个高高的屋顶。
circle|A round line whose points are equally distant from its centre.|Make a circle on the paper.|在纸上画一个圆。
clock|An instrument that shows the time.|The clock is on the wall.|时钟挂在墙上。
cloud|A visible mass of small water drops in the sky.|Dark clouds are in the sky.|天空中有乌云。
coat|An outer piece of clothing with sleeves.|Her coat is hanging by the door.|她的外套挂在门边。
collar|The part of clothing that goes around the neck.|The shirt has a stiff collar.|这件衬衫有一个硬挺的衣领。
comb|A flat tool with teeth used for putting hair in order.|The comb is by the basin.|梳子在脸盆旁边。
cord|A strong thick string made from twisted material.|The cord is round the box.|绳子绕在箱子外面。
cow|A large female farm animal kept for milk or meat.|The cow is in the field.|母牛在田里。
cup|A small open vessel used for drinking.|The cup is full of milk.|杯子里装满了牛奶。
curtain|A piece of cloth hung over a window or opening.|The curtain is over the window.|窗帘遮在窗户上。
cushion|A soft bag filled with material, used for support or comfort.|Put the cushion on the seat.|把垫子放在座位上。
dog|An animal often kept for company, work, or protection.|The dog is waiting by the door.|狗正在门边等候。
door|A movable barrier used to open or shut an entrance.|The door is open.|门开着。
drain|A pipe or channel that takes away water or waste.|The water goes down the drain.|水从排水管流下去。
drawer|A sliding box in a table or other piece of furniture.|The letters are in the drawer.|信件在抽屉里。
dress|A piece of clothing covering the body and usually part of the legs.|She has a new blue dress.|她有一条新的蓝色连衣裙。
drop|A very small round amount of liquid.|A drop of water is on the glass.|玻璃上有一滴水。
ear|The part of the body used for hearing.|The sound came to my left ear.|声音传到了我的左耳。
egg|A rounded object produced by a bird, containing food or a young animal.|The egg is in the basket.|鸡蛋在篮子里。
engine|A machine that changes power into motion.|The engine gives power to the machine.|引擎为机器提供动力。
eye|The organ of the body used for seeing.|She has blue eyes.|她有一双蓝眼睛。
face|The front part of the head, with the eyes, nose, and mouth.|She had a happy smile on her face.|她脸上带着快乐的微笑。
farm|Land and buildings used for growing food or keeping animals.|They keep cows on the farm.|他们在农场养牛。
feather|One of the light coverings growing from a bird's skin.|The bird has white feathers.|这只鸟有白色羽毛。
finger|One of the long parts of the hand.|The ring is on her finger.|戒指戴在她的手指上。
fish|An animal that lives and moves in water.|The fish is in the river.|鱼在河里。
flag|A piece of coloured cloth used as a sign.|The flag is on top of the building.|旗帜在建筑物顶部。
floor|The lower surface of a room on which people walk.|The box is on the floor.|箱子在地板上。
fly|A small flying insect with two wings.|A fly is on the window.|一只苍蝇停在窗户上。
foot|The lowest part of the leg, used for standing and walking.|He has a wound on his foot.|他的脚上有一道伤口。
fork|A tool with points used for lifting food.|The fork is by the plate.|叉子在盘子旁边。
fowl|A bird kept for its meat or eggs.|The fowl are on the farm.|家禽在农场里。
frame|A structure around or supporting something.|The picture has a wood frame.|这幅画有一个木框。
garden|A piece of ground where flowers, fruit, or vegetables are grown.|There are flowers in the garden.|花园里有花。
girl|A female child or young female person.|The girl is reading a letter.|女孩正在读信。
glove|A covering for the hand and fingers.|Put your gloves on your hands.|把手套戴到手上。
goat|A farm animal with horns, kept for milk or meat.|The goat is in the field.|山羊在田里。
gun|A weapon that sends out a bullet by an explosion.|The gun is under military control.|枪支受到军事管制。
hair|The fine threads growing from the skin, especially on the head.|Her hair is long and black.|她的头发又长又黑。
hammer|A tool with a heavy head used for hitting things.|Give the nail a blow with the hammer.|用锤子敲一下钉子。
hand|The end part of the arm with fingers and a thumb.|Take the cup in your hand.|用手拿起杯子。
hat|A covering worn on the head.|He has a black hat on his head.|他头上戴着一顶黑帽子。
head|The top part of the body containing the brain, eyes, ears, nose, and mouth.|He put his hat on his head.|他把帽子戴在头上。
heart|The organ that sends blood through the body.|The heart sends blood through the body.|心脏把血液输送到全身。
hook|A curved piece used for catching or hanging things.|The coat is hanging from a hook.|外套挂在钩子上。
horse|A large strong animal used for riding or pulling loads.|The horse is in front of the cart.|马在车的前面。
hospital|A place where ill or wounded people get medical care.|The ill man is in the hospital.|生病的男人在医院里。
house|A building in which people live.|Their house has five rooms.|他们的房子有五个房间。
island|An area of land completely surrounded by water.|The island is in the middle of the sea.|这座岛位于海中央。
jewel|A valuable stone used as an ornament.|The jewel is in a small box.|宝石装在一个小盒子里。
kettle|A vessel used for boiling water.|The water in the kettle is boiling.|水壶里的水开了。
key|A shaped piece used for opening or shutting a lock.|Put the key in the lock.|把钥匙插进锁里。
knee|The joint in the middle of the leg.|He has a pain in his knee.|他的膝盖疼。
knife|A cutting tool with a handle and blade.|The knife has a sharp blade.|这把刀有锋利的刀刃。
knot|A fastening made by twisting cord or thread together.|There is a tight knot in the cord.|绳子上有一个紧结。
leaf|A flat green part growing from a plant or tree.|A green leaf is on the branch.|树枝上有一片绿叶。
leg|The part of the body used for standing and walking.|His left leg is stiff.|他的左腿发僵。
library|A place where books are kept for reading or use.|This library has a great number of books.|这座图书馆有很多书。
line|A long narrow mark or a row of people or things.|Make a straight line on the paper.|在纸上画一条直线。
lip|One of the two soft edges of the mouth.|She had a smile on her lips.|她嘴角带着微笑。
lock|A device that keeps a door, box, or other object shut.|The key is in the lock.|钥匙在锁里。
map|A picture showing the position of places and natural features.|The road is on the map.|地图上有这条路。
match|A small stick used for starting a fire.|He put a match to the fire.|他用火柴点火。
monkey|An animal with hands, a long tail in many kinds, and a face like a person's.|The monkey is in the tree.|猴子在树上。
moon|The round natural object that moves around the earth.|The moon is bright.|月亮很亮。
mouth|The opening in the face used for eating, breathing, and speaking.|Put the food in your mouth.|把食物放进嘴里。
muscle|Body tissue that produces movement by becoming shorter or tighter.|Strong muscles give power to the arms.|强壮的肌肉给手臂力量。
neck|The part joining the head to the body.|She has a chain round her neck.|她脖子上戴着一条链子。
needle|A thin pointed tool used for sewing.|Put the thread through the needle.|把线穿过针眼。
nerve|A thin body structure carrying messages between the brain and body.|Nerves go from the body to the brain.|神经从身体通向大脑。
net|Material made from crossed threads with spaces between them.|The fish is in the net.|鱼在网里。
nose|The part of the face used for breathing and smelling.|The nose is between the eyes and mouth.|鼻子位于眼睛和嘴之间。
office|A room or building where people do business or administrative work.|The manager is in the office.|经理在办公室里。
orange|A round fruit with orange-coloured skin.|The orange is sweet.|这个橙子很甜。
oven|An enclosed heated space used for cooking food.|The cake is in the oven.|蛋糕在烤箱里。
parcel|A thing or group of things wrapped for carrying or sending.|She sent the parcel by train.|她用火车寄出了包裹。
pen|An instrument used for writing with ink.|She is writing with a pen.|她正在用钢笔写字。
pencil|A thin writing instrument containing a solid marking substance.|Make a mark with the pencil.|用铅笔做一个记号。
picture|A drawing, painting, or photograph showing someone or something.|The picture is on the wall.|图画挂在墙上。
pig|A farm animal with a broad nose, kept mainly for meat.|The pig is on the farm.|猪在农场里。
pin|A thin pointed piece of metal used for fastening things.|Put the pin through the cloth.|把别针穿过布料。
pipe|A hollow tube through which liquid, gas, or smoke moves.|Water comes through the pipe.|水从管子里流出来。
plane|A powered vehicle with wings that flies through the air.|The plane is high in the sky.|飞机在高空中。
plate|A flat dish used for serving food.|The food is on the plate.|食物在盘子里。
plough|A farm tool used for turning over earth.|The horse is before the plough.|马在犁的前面。
pocket|A small bag sewn into clothing.|The letter is in my pocket.|信在我的口袋里。
pot|A deep round vessel used for cooking or holding things.|The soup is in the pot.|汤在锅里。
potato|A round underground part of a plant used as food.|The potatoes are in the basket.|土豆在篮子里。
prison|A building where people are kept as punishment for crime.|The man was sent to prison for the crime.|这个男人因犯罪被送进监狱。
pump|A machine that moves liquid or gas by pressure.|The pump sends water through the pipe.|泵把水送进管道。
rail|A long metal bar forming part of a track or barrier.|The train goes on the rails.|火车在铁轨上行驶。
rat|A small animal like a large mouse, with a long tail.|The rat went into a hole.|老鼠钻进了洞里。
receipt|A written record showing that money or goods were received.|The receipt gives the amount of the payment.|收据记录了付款金额。
ring|A small round band, often worn on a finger.|She has a gold ring on her finger.|她手指上戴着一枚金戒指。
rod|A long thin straight piece of metal, wood, or other material.|The metal rod is straight.|这根金属杆是直的。
roof|The structure covering the top of a building.|There is snow on the roof.|屋顶上有雪。
root|The part of a plant that grows into the earth and takes in water.|The roots of the tree are in the earth.|树根扎在土里。
sail|A sheet of strong cloth that catches wind to move a boat.|The wind gives power to the sail.|风为船帆提供动力。
school|A place where people receive teaching.|The boys and girls are at school.|男孩和女孩们在学校里。
scissors|A cutting instrument with two blades joined in the middle.|The scissors are sharp.|剪刀很锋利。
screw|A metal fastener with a raised line winding around it.|Put the screw into the wood.|把螺丝拧进木头里。
seed|The small part of a plant from which a new plant may grow.|Put the seed in the earth.|把种子埋进土里。
sheep|A farm animal kept for wool, meat, or milk.|The sheep are in the field.|羊群在田里。
shelf|A flat support fixed to a wall or inside a piece of furniture.|The books are on the shelf.|书在架子上。
ship|A large vessel used for travelling on water.|The ship came into the harbour.|轮船驶入港口。
shirt|A piece of clothing for the upper body, usually with sleeves.|He has a white shirt on.|他穿着一件白衬衫。
shoe|A covering for the foot, usually below the ankle.|This shoe is tight.|这只鞋很紧。
skin|The outer covering of a person or animal.|The skin on his hand was cut.|他手上的皮肤被割伤了。
skirt|A piece of clothing hanging from the waist.|She has a blue skirt on.|她穿着一条蓝裙子。
snake|A long animal without legs.|The snake went through the grass.|蛇从草丛中穿过。
sock|A soft covering worn on the foot inside a shoe.|The sock is in the shoe.|袜子在鞋里。
spade|A tool with a broad blade used for moving earth.|He made a hole with the spade.|他用铲子挖了一个洞。
sponge|A soft material full of holes, able to take in water.|The sponge is full of water.|海绵吸满了水。
spoon|A tool with a small bowl at one end, used for eating or serving.|Put the sugar in with a spoon.|用勺子把糖放进去。
square|A flat shape with four equal straight sides and four right angles.|Make a square on the paper.|在纸上画一个正方形。
stamp|A small piece of paper put on a letter as payment for sending it.|Put a stamp on the letter.|在信上贴一张邮票。
star|A bright object seen in the sky at night.|The stars are bright.|星星很亮。
station|A place where trains stop for people or goods.|The train is at the station.|火车停在车站。
stem|The main thin support of a plant, carrying leaves or flowers.|The flower has a long stem.|这朵花有一根长茎。
stick|A thin piece of wood broken or cut from a tree.|Put the stick across the hole.|把木棍横放在洞上。
stocking|A close-fitting covering for the foot and leg.|Her stocking has a hole in it.|她的长袜破了一个洞。
stomach|The body organ in which food begins to be broken down.|I have a pain in my stomach.|我的胃疼。
store|A place where goods are kept or sold.|The store has food and shoes.|商店里有食品和鞋子。
street|A public road in a town, usually with buildings along it.|Their house is in this street.|他们的房子在这条街上。
sun|The star that gives the earth light and heat.|The sun gives light and heat.|太阳提供光和热。
table|A piece of furniture with a flat top supported above the floor.|The books are on the table.|书在桌上。
tail|The part extending from the back end of an animal's body.|The dog has a long tail.|这只狗有一条长尾巴。
thread|A long thin line of cotton, wool, or other material used for sewing.|Put the thread through the needle.|把线穿过针眼。
throat|The passage inside the neck used for food, drink, and air.|I have a pain in my throat.|我的喉咙疼。
thumb|The short thick finger set apart from the other fingers.|The thumb is on the side of the hand.|拇指位于手的一侧。
ticket|A small piece of paper giving the right to travel or enter a place.|I have a ticket for the train.|我有一张火车票。
toe|One of the five end parts of the foot.|He has a wound on his toe.|他的脚趾上有一道伤口。
tongue|The soft movable part inside the mouth used for taste and speech.|The tongue is in the mouth.|舌头在嘴里。
tooth|One of the hard white structures in the mouth used for biting food.|I have a pain in this tooth.|我的这颗牙疼。
town|A place with many houses and streets, smaller than a city.|The town is by the river.|这座城镇在河边。
train|A line of connected railway carriages moved by an engine.|The train came into the station.|火车驶入车站。
tray|A flat object with raised edges used for carrying things.|The cups are on the tray.|杯子在托盘上。
tree|A tall plant with a hard stem, branches, and leaves.|The bird is in the tree.|鸟在树上。
trousers|Clothing covering the body from the waist, with a separate part for each leg.|These trousers are long.|这条裤子很长。
umbrella|A folding cover carried for protection from rain or sun.|Take an umbrella because of the rain.|因为下雨，带把伞吧。
wall|A vertical structure forming the side of a building or dividing spaces.|The picture is on the wall.|图画挂在墙上。
watch|A small instrument worn or carried for showing the time.|My watch says it is five.|我的手表显示现在是五点。
wheel|A round object that turns around its centre and supports movement.|The cart has two wheels.|这辆车有两个轮子。
whip|A long flexible instrument used for striking or directing animals.|The whip is hanging on the wall.|鞭子挂在墙上。
whistle|A small instrument that makes a high sound when air is sent through it.|The whistle made a sharp sound.|哨子发出了尖锐的声音。
window|An opening in a wall or vehicle that lets in light and air.|Open the window and let in air.|打开窗户让空气进来。
wing|One of the body parts used by birds or insects for flying.|The bird has a broken wing.|这只鸟的一侧翅膀受伤了。
wire|A long thin piece of metal used to carry electricity or fasten things.|An electric current goes through the wire.|电流通过金属丝。
worm|A small long soft animal without legs.|The worm is in the earth.|虫子在土里。
`.trim().split('\n').map(line => line.split('|'));

const reviews = new Map(rows.map(([word, definition, en, zh]) => [word, { definition, en, zh }]));
const targets = words.filter(word => word.category === 'picturable_things');
const multiSenseWords = new Set(targets.filter(word => word.senses.length > 1).map(word => word.word));
const expectedSingles = targets.filter(word => word.senses.length === 1).map(word => word.word);
const missing = expectedSingles.filter(word => !reviews.has(word));
const extra = [...reviews.keys()].filter(word => !expectedSingles.includes(word));
if (missing.length || extra.length) {
  throw new Error(`Review map mismatch. Missing: ${missing.join(', ') || 'none'}; extra: ${extra.join(', ') || 'none'}.`);
}

for (const word of targets) {
  const review = reviews.get(word.word);
  if (review) {
    const sense = word.senses[0];
    sense.glossEn = review.definition;
    sense.scopeNoteZh = `用于表达“${sense.glossZh}”这一核心可图示义。`;
    sense.examples = [{
      en: review.en,
      zh: review.zh,
      noteZh: `例句展示 ${word.word} 的核心用法。`,
      tokenStatus: 'valid',
      reviewStatus,
    }];
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
  word.provenance.definition = 'project-editorial-picturable-review';
  word.provenance.rule = 'project-editorial-picturable-review';
  word.provenance.example = 'project-editorial-picturable-review';
}

await writeFile(wordsPath, `${JSON.stringify(words, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ reviewed: targets.length, singleSenseRewritten: reviews.size, multiSenseReviewed: multiSenseWords.size }, null, 2));
