function formatNumber(n: number) {
  const s = n.toString();
  return s[1] ? s : '0' + s;
}

export function formatTime(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

export function formatMonthday(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}/${day}`;
}

export function getCountDays(date: Date): number {
  const d1 = new Date(date);
  d1.setMonth(d1.getMonth() + 1);
  d1.setDate(0);
  return d1.getDate();
}

export function getCountStamp(date: Date): number {
  const d0 = new Date(date);
  d0.setMilliseconds(0);
  const d1 = new Date(d0);
  d1.setHours(0);
  d1.setMinutes(0);
  d1.setSeconds(0);
  d1.setMilliseconds(0);
  return d0.getTime() - d1.getTime();
}

export function getYearRange(date: Date): { minDate: Date; maxDate: Date } {
  const year = date.getFullYear();
  return {
    minDate: new Date(`${year}/1/1 00:00:00`),
    maxDate: new Date(`${year}/12/31 23:59:59`)
  };
}

export function stampToDay(n: number): number {
  return n / 24 / 60 / 60 / 1000;
}

export function getRandomOneByList(arr: Array<any>) {
  const idx = getRandomNumber(arr.length);
  return arr[idx];
}

export function getRandomNumber(max: number, min?: number): number {
  if (min !== undefined) {
    return Math.ceil(Math.random() * (min - max + 1) + max - 1);
  }
  return Math.floor(Math.random() * max);
}
export function getRandomDiscount(): number {
 return Math.floor(Math.random() * 10) / 10
}

export function midFind(array: number[] = [], num: number, start: number, end: number) {
  while (start + 1 < end) {
    const mid = Math.floor((start + end) / 2);
    if (array[mid] > num) end = mid;
    else start = mid;
  }
  return end;
}

export function getRandomByPriority<T extends { weight: number }>(list: T[]): T {
  const weights: number[] = [0];
  let weightTotal = 0;
  for (let item of list) {
    weightTotal += item.weight;
    weights.push(weights[weights.length - 1] + item.weight);
  }
  const random = Math.random() * weightTotal;

  // 二分查找
  try {
    const idx = midFind(weights, random, 0, weights.length);
    return list[idx];
  } catch (e) {
    console.warn('getRandomByWeight e = ', e);
    return list[0];
  }
}

export function formatSize(kb: number): string {
  if (kb > 1000) {
    return `${(kb / 1024).toFixed(2)} MB`;
  }
  return `${kb} KB`;
}
