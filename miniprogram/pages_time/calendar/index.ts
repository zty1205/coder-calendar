import { getHoildayMap } from '../../data/hoildayList';
import { getLieuMap } from '../../data/lieuList';
import { getYearRange, stampToDay } from '../../utils/util';

interface Day {
  date: Date;
  type: 'selected' | 'start' | 'middle' | 'end' | 'disabled';
  text: number | string;
  topInfo?: string;
  bottomInfo?: string;
  className?: string;
}

Page({
  data: {
    now: new Date().getTime(),
    minDate: new Date('2023/1/1').getTime(),
    maxDate: new Date('2023/12/31').getTime(),
    formatter(day: Day) {
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();
      const key = `${month}/${date}`;

      // @ts-ignore
      const currentDate = this.currentDate || Date.now();

      const hoildayMap = getHoildayMap();
      if (hoildayMap.has(key)) {
        day.className = 'calendar--hoilday';
        day.type = 'middle';
        // @ts-ignore
        const hoilday: TimeItem = hoildayMap.get(key);
        day.bottomInfo = hoilday.t;
        const time = new Date(`${hoilday.y}/${hoilday.m}/${hoilday.d}`).getTime();
        if (time > currentDate) {
          day.topInfo = `${stampToDay(time - currentDate)}天`;
        }
        return day;
      }

      const lieuMap = getLieuMap();
      if (lieuMap.has(key)) {
        day.className = 'calendar--lieu';
        day.bottomInfo = '补';
        return day;
      }

      if (day.date.getTime() === currentDate) {
        day.bottomInfo = '今日';
      }

      return day;
    }
  },
  onLoad() {
    this.setCurDate();
  },
  setCurDate() {
    const now = new Date();
    const { minDate, maxDate } = getYearRange(now);
    this.setData({
      now: now.getTime(),
      minDate: minDate.getTime(),
      maxDate: maxDate.getTime()
    });
  }
});
