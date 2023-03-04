interface TimeStatistItem {
  m: number;
  // total 总天数
  t: number;
  // work 上班日
  w: number;
  // rest 休息日 周末且不是补班 + 节假日
  r: number;
  // holiday 节假日
  h: number;
  // lieu 补班天数
  l: number;
}

interface TimeItem {
  // 年月日
  y: string;
  m: string;
  d: string;
  // 农历月日
  lm: string;
  ld: string;
  // 天干地支年月日
  gy: string;
  gm: string;
  gd: string;
  // 十二生肖年
  an: string;
  // 星期
  cd: string;
  // 忌 宜
  av: string;
  st: string;
  // 放假1 补班2
  s: string;
  // 节假日
  t: string;
  // hoilday 节假假期
  hd: string;
}
