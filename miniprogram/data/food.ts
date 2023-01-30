// 主食划分 简单点
const FOOD_CATEGORY = {
  CEREALS: 1, // 谷类
  TUBERS: 2, // 薯类
  FRY: 3, // 油炸食品
  GOOD: 4, // 神
};

export default [
  {
    name: "汉帝茅台",
    level: 16,
    priority: 1,
    img: "https://u.thsi.cn/imgsrc/sns/fa8aa284d6925c1657a8e60f16b912cd_1095_1280.jpg",
    desc: "传承茅台酒酿造悠久历史，弘扬“国酒”声誉",
    category: FOOD_CATEGORY.GOOD,
    hPrice: " ∞ ",
    lPrice: " ∞ ",
  },
  {
    name: "黄焖鸡",
    level: 4,
    priority: 1,
    img: "https://www.1688e.com/file/upload/202110/07/090858657086.jpg",
    desc: "俗话说：遇事不决，黄焖鸡！",
    category: FOOD_CATEGORY.CEREALS,
    hPrice: "40",
    lPrice: "20",
  },
  {
    name: "麻辣烫",
    level: 4,
    priority: 1,
    img: "https://img2.baidu.com/it/u=4047841690,142565994&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=397",
    desc: "你还在为吃什么而烦恼吗？麻辣烫，你的绝佳选择。",
    category: FOOD_CATEGORY.CEREALS,
    hPrice: "50",
    lPrice: "20",
  },
  {
    name: "麻辣香锅",
    level: 5,
    priority: 1,
    img: "https://nimg.ws.126.net/?url=https://dingyue.ws.126.net/2021/0624/08589f7dj00qv66tn0018c000b4009nc.jpg&thumbnail=650x2147483647&quality=80&type=jpg",
    desc: "麻辣香锅以麻辣为主，具有辣而不燥、鲜而不腥、入口窜香、回味悠长的独特口味，其特色明显，口味独特。",
    category: FOOD_CATEGORY.CEREALS,
    hPrice: "60",
    lPrice: "25",
  },
];
