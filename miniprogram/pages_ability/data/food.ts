import { getRandomNumber } from '../../utils/util';

// 主食划分 简单点
const FOOD_CATEGORY = {
  CEREALS: 1, // 谷类
  TUBERS: 2, // 薯类
  FRY: 3, // 油炸食品
  GOD: 4 // 神
};

export default function getFoodList(): Food[] {
  const randMT = getRandomNumber(10, 1);
  const randELM = getRandomNumber(10, 1);
  return [
    {
      name: '我也不知道',
      level: 12,
      weight: 2,
      img: '',
      desc: '想吃啥就吃啥',
      category: 3,
      hPrice: ' ∞ ',
      lPrice: ' ∞ '
    },
    {
      name: '汉帝茅台',
      level: 16,
      weight: 1,
      img: 'https://img1.baidu.com/it/u=4276346879,820869573&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=541',
      desc: '传承茅台酒酿造悠久历史，弘扬“国酒”声誉',
      category: FOOD_CATEGORY.GOD,
      hPrice: ' ∞ ',
      lPrice: ' ∞ '
    },
    {
      name: '小龙虾',
      level: 10,
      weight: 4,
      img: 'https://img1.baidu.com/it/u=4223402328,1225768665&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '小龙虾体内的蛋白质含量很高，且肉质松软，易消化，对身体虚弱以及病后需要调养的人是食物；',
      category: FOOD_CATEGORY.TUBERS,
      hPrice: '200',
      lPrice: '50'
    },
    {
      name: '海底捞',
      level: 8,
      weight: 4,
      img: 'https://img2.baidu.com/it/u=2790789860,3973677241&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '服务周到，味道地道，特色突出，选择自由',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '100',
      lPrice: '40'
    },
    {
      name: 'KFC',
      level: 8,
      weight: 4,
      img: 'https://img0.baidu.com/it/u=1015854743,3396866972&fm=253&fmt=auto&app=138&f=JPEG?w=250&h=250',
      desc: '“生活如此多娇”、“尽情自在肯德基”。看看有没有出新品。',
      category: FOOD_CATEGORY.FRY,
      hPrice: '100',
      lPrice: '40'
    },
    {
      name: '汉堡王',
      level: 8,
      weight: 4,
      img: 'https://img1.baidu.com/it/u=523515692,3422274915&fm=253&fmt=auto&app=138&f=JPEG?w=250&h=250',
      desc: '我选我味,带着它上路,按着你自己的方式去做。',
      category: FOOD_CATEGORY.FRY,
      hPrice: '100',
      lPrice: '40'
    },
    {
      name: '麦当劳',
      level: 8,
      weight: 4,
      img: 'https://img2.baidu.com/it/u=78441800,1571237255&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500',
      desc: "i'm lovin'it",
      category: FOOD_CATEGORY.FRY,
      hPrice: '100',
      lPrice: '40'
    },
    {
      name: '德克士',
      level: 8,
      weight: 4,
      img: 'https://img2.baidu.com/it/u=1983728754,4205836223&fm=253&fmt=auto&app=138&f=JPEG?w=480&h=500',
      desc: '开心就要咔滋咔滋，我选择来一份手枪腿',
      category: FOOD_CATEGORY.FRY,
      hPrice: '100',
      lPrice: '40'
    },
    {
      name: '烧烤',
      level: 6,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=938672791,2707704908&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=378',
      desc: '肥皂快乐水 + BBQ + 下饭视频 = 快乐的滋味！',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '100',
      lPrice: '30'
    },
    {
      name: '生煎',
      level: 5,
      weight: 8,
      img: 'https://img0.baidu.com/it/u=946314603,465355950&fm=253&fmt=auto&app=138&f=JPEG?w=461&h=346',
      desc: '形态饱满，上半部有黄澄澄的芝麻和碧绿的葱花，松软适口，下半部包底金黄脆香；馅心汤汁饱满、味鲜浓郁',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '25'
    },
    {
      name: '饺子',
      level: 5,
      weight: 8,
      img: 'https://img0.baidu.com/it/u=946314603,465355950&fm=253&fmt=auto&app=138&f=JPEG?w=461&h=346',
      desc: '好吃不过饺子！！！',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '25'
    },
    {
      name: '杂粮煎饼',
      level: 5,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=3597244695,1688847446&fm=253&fmt=auto&app=138&f=PNG?w=300&h=300',
      desc: '中华传统小吃。主要特色是香、里外全脆、味美。烹饪简单。',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '25'
    },
    {
      name: '永和king',
      level: 5,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=755231845,3935357180&fm=253&fmt=auto&app=138&f=JPEG?w=507&h=500',
      desc: '大磨王现磨豆浆、非矾油条、大王卤肉Fun、酥嫩鸡腿排卤肉Fun和御品番茄牛肉面',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '25'
    },
    {
      name: '披萨',
      level: 5,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=870325693,517332299&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '一种由特殊的酱汁和馅料做成的具有意大利风味的食品',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '50',
      lPrice: '20'
    },
    {
      name: '酸菜鱼',
      level: 5,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=2045049891,38357253&fm=253&fmt=auto&app=138&f=PNG?w=451&h=449',
      desc: '酸菜鱼我只吃没有鱼刺的！！！',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '50',
      lPrice: '20'
    },
    {
      name: '正新鸡排',
      level: 5,
      weight: 8,
      img: 'https://img0.baidu.com/it/u=3943301117,2852482766&fm=253&fmt=auto&app=138&f=JPEG?w=492&h=386',
      desc: '鸡排我只吃正新鸡排！！',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '25'
    },
    {
      name: `饿了吗订单第${randELM}个`,
      level: 5,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=883420648,1925931227&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500',
      desc: `饿了吗我选第${randELM}个！`,
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '9999',
      lPrice: '0'
    },
    {
      name: '肉夹馍',
      level: 5,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=1119617079,1235066150&fm=253&fmt=auto&app=120&f=JPEG?w=408&h=405',
      desc: '肉夹馍合腊汁肉、白吉馍为一体，互为烘托，将各自滋味发挥到极致。馍香肉酥，肥而不腻，回味无穷。',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '25'
    },
    {
      name: '肉蟹煲',
      level: 5,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=2083755255,3108754200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '肉蟹煲，是一道由肉蟹、鸡爪、辣酱做成的美食。肉蟹，味道鲜、嫩，蟹肉味浓香。',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '25'
    },
    {
      name: '过桥米线',
      level: 5,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=3136306874,4285191404&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '过桥米线是云南省滇南地区的一种特有的小吃，属滇菜系，该菜品起源于蒙自地区。',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '25'
    },
    {
      name: '麻辣烫',
      level: 4,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=4047841690,142565994&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=397',
      desc: '麻辣烫（Spicy Hot Pot）是源于四川乐山，经东北做法改良之后流行于各地的汉族特色小吃。',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '20'
    },
    {
      name: '干拌麻辣烫',
      level: 4,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=2095400197,4058338773&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '“拌”先淋上秘制的“灵魂汤汁”再用筷子趁热搅拌盘边堆着的辣椒面、蒜泥堆和油光亮泽的麻辣烫',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '20'
    },
    {
      name: '麻辣香锅',
      level: 4,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=3247468734,2723150621&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '麻辣香锅（Spicy incense pot），发源于中国重庆市，是川渝地方麻辣风味菜品，为四川菜系。',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '20'
    },
    {
      name: '烤冷面',
      level: 4,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=4222467853,3321085781&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '回味学校外那一碗烤冷面的味道',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '20'
    },
    {
      name: '大盘鸡',
      level: 4,
      weight: 8,
      img: 'https://img0.baidu.com/it/u=3096593626,1997447587&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=380',
      desc: '寻找最正宗的大盘鸡',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '20'
    },
    {
      name: '淮安牛肉汤',
      level: 4,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=1283162287,1755827390&fm=253&fmt=auto&app=138&f=JPEG?w=479&h=392',
      desc: '咸的牛肉汤肉肥汤鲜，特别是加上葱段后，滋味更鲜',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '20'
    },
    {
      name: '轻食沙拉',
      level: 4,
      weight: 8,
      img: 'https://img0.baidu.com/it/u=2255250048,3713138211&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '简单好做颜值高,减脂好吃又养眼,多种蔬菜随意搭。 ',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '20'
    },
    {
      name: '喝粥',
      level: 4,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=864626027,1572903808&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '我就想养生下！',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '20'
    },
    {
      name: '汤圆',
      level: 4,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=3214872048,3091284510&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
      desc: '太阳已经落土，汤圆担子已经上了街了！',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '20'
    },
    {
      name: '猪肚鸡',
      level: 4,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=2770111424,622173874&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=426',
      desc: '广东省传统的地方名菜，属于客家菜系，又名猪肚煲鸡、凤凰投胎',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '20'
    },
    {
      name: `美团订单第${randMT}个`,
      level: 6,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=3946680113,2926592815&fm=253&fmt=auto&app=138&f=JPG?w=500&h=500',
      desc: `美团我选第${randMT}个！`,
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '9999',
      lPrice: '0'
    },
    {
      name: '沙县国际大酒店',
      level: 3,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=984711823,2687986691&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=499',
      desc: '沙县小吃以其品种繁多、风味独特和经济实惠而著称，成为福建饮食文化百花园中的一朵奇葩。',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '15'
    },
    {
      name: '喇面',
      level: 3,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=3140615778,3183768969&fm=253&fmt=auto&app=138&f=JPEG?w=255&h=255',
      desc: '一清（汤）二白（萝卜）三绿（香菜蒜苗）四红（辣子） 五黄（面条黄亮）',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '15'
    },
    {
      name: '豆腐脑',
      level: 2,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=2640955861,1963215928&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375',
      desc: '咸豆腐脑还是甜豆腐脑？？？',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '20',
      lPrice: '10'
    },
    {
      name: '重庆鸡公煲',
      level: 5,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=3398487224,3600646377&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '浓香滑嫩，入味彻底，特点麻辣鲜香，口感醇厚，香辛料味渗入鸡块中，食后令人回味无穷',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '100',
      lPrice: '25'
    },
    {
      name: '叫花鸡',
      level: 5,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=3732213268,1705570392&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500',
      desc: '打开泥壳，满屋飘香，入口酥烂肥嫩，风味独特。若配葱白、甜面酱进食，口味更佳。',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '25'
    },
    {
      name: '长沙臭豆腐',
      level: 4,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=3429931273,3528930377&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '其色墨黑，外焦里嫩，鲜而香辣， 焦脆而不糊、细嫩而不腻、初闻臭气扑鼻，细嗅浓香诱人。',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '20'
    },
    {
      name: '桥头排骨',
      level: 5,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=29422621,3024666730&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '桥头排骨，表皮金黄，肉色红润，入口鲜香酥脆，肉质劲道，食用不上火!',
      category: FOOD_CATEGORY.FRY,
      hPrice: '40',
      lPrice: '25'
    },
    {
      name: '狼牙土豆',
      level: 4,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=13784060,3011919491&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '主料为土豆，用特制刀具将土豆切成波浪外型，因恰似犬齿而得名',
      category: FOOD_CATEGORY.TUBERS,
      hPrice: '40',
      lPrice: '20'
    },
    {
      name: '胡辣汤',
      level: 4,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=1980924160,3967991096&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '胡辣，虽然美味，不宜多吃，易上火',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '20'
    },
    {
      name: '鸭血粉丝汤',
      level: 4,
      weight: 8,
      img: 'https://img0.baidu.com/it/u=4229521469,1260178615&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '鸭血的滑嫩、鸭胗的柔韧、鸭肠的爽滑、鸭肝的绵软、鸭汤的清鲜,再配上Q弹有嚼劲的粉丝,吃一口永远忘不了',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '40',
      lPrice: '20'
    },
    {
      name: '螺s粉',
      level: 6,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=1702948608,3256685016&fm=253&fmt=auto&app=120&f=JPEG?w=760&h=760',
      desc: '鲜、酸、爽、烫、辣',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '60',
      lPrice: '30'
    },
    {
      name: '北京烤鸭',
      level: 6,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=2802778230,2059682382&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '优质肉食鸭，果木炭火烤制，色泽红润，肉质肥而不腻，外脆里嫩',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '60',
      lPrice: '30'
    },
    {
      name: '肠粉',
      level: 6,
      weight: 8,
      img: 'https://img0.baidu.com/it/u=329394501,2774420901&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '清淡，入口即化，富有弹性，美味鲜香',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '60',
      lPrice: '30'
    },
    {
      name: '烧腊',
      level: 6,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=1429411311,1855563284&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
      desc: '色泽金黄，咸香味浓',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '60',
      lPrice: '30'
    },
    {
      name: '蛋包饭',
      level: 5,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=3693113459,3799549962&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '鸡蛋煎成厚薄均匀的蛋皮，再放上炒好的炒饭、番茄酱、色拉油',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '50',
      lPrice: '25'
    },
    {
      name: '韩国烤肉',
      level: 8,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=2849054287,1659932794&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '尤以烤牛里脊和烤牛排最有名，因为其肉质最鲜美爽嫩。',
      category: FOOD_CATEGORY.FRY,
      hPrice: '100',
      lPrice: '50'
    },
    {
      name: '泰式炒饭',
      level: 8,
      weight: 8,
      img: 'https://img0.baidu.com/it/u=3121008202,2323550924&fm=253&fmt=auto&app=138&f=JPEG?w=475&h=475',
      desc: '泰式炒饭使用鸡丁和虾仁加上米饭一起做成的炒饭。',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '100',
      lPrice: '50'
    },
    {
      name: '印度咖喱',
      level: 8,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=1186635043,826057904&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '地道的印度咖喱是以丁香、小茴香子、胡荽子、芥末子、黄姜粉和辣椒等香料调配而成的。',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '100',
      lPrice: '50'
    },
    {
      name: '越南春卷',
      level: 8,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=1401169520,2976051308&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '饼皮并不用薄面皮而是用稻米磨浆制成的米皮包裹，馅料以虾肉、猪肉和当地蔬菜为主',
      category: FOOD_CATEGORY.CEREALS,
      hPrice: '100',
      lPrice: '50'
    },
    {
      name: '墨西哥塔可',
      level: 8,
      weight: 8,
      img: 'https://img0.baidu.com/it/u=1567220361,3145789764&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '用玉米粉制作墨西哥薄饼，卷成U字型后，烤制。 将已熟的肉馅、蔬菜、芝士酱等馅料配搭一起食用',
      category: FOOD_CATEGORY.FRY,
      hPrice: '100',
      lPrice: '50'
    },
    {
      name: '酸辣粉',
      level: 6,
      weight: 8,
      img: 'https://img2.baidu.com/it/u=928788847,609211192&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '麻、辣、鲜、香、酸且油而不腻。',
      category: FOOD_CATEGORY.FRY,
      hPrice: '50',
      lPrice: '30'
    },
    {
      name: '三明治',
      level: 6,
      weight: 8,
      img: 'https://img0.baidu.com/it/u=4128116375,155723392&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '三明治是一种典型的西方食品，以两片面包夹几片肉和奶酪、炼乳等各种调料制作而成',
      category: FOOD_CATEGORY.FRY,
      hPrice: '50',
      lPrice: '30'
    },
    {
      name: '炸酱面',
      level: 6,
      weight: 8,
      img: 'https://img1.baidu.com/it/u=3563081129,149004062&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      desc: '主要材料为面条，酱油，豆芽，黄瓜等，口味咸、酸辣，清新爽口，有劲道。',
      category: FOOD_CATEGORY.FRY,
      hPrice: '50',
      lPrice: '30'
    }
  ];
}
