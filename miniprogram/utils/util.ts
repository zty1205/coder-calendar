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

export function stampToDay(n: number): number {
  return n / 24 / 60 / 60 / 1000;
}

export function getRandomOneByList(arr: Array<any>) {
  const idx = getRandomNumber(arr.length);
  return arr[idx];
}

export function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}

export function midFind(array: number[] = [], num: number, start: number, end: number) {
  while (start + 1 < end) {
    const mid = Math.floor((start + end) / 2);
    if (array[mid] > num) end = mid;
    else start = mid;
  }
  return end;
}

export function getRandomByWeight<T extends { weight: number }>(list: T[]): T {
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
