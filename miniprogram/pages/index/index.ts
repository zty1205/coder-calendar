import hoildayList from '../../data/hoildayList';
import lieuList from '../../data/lieuList';
import timeList from '../../data/timeList';

import { getSalaryDay, getSalary } from '../../utils/common';
import { DAY_SECONDS } from '../../utils/constant';
import { getCountDays, getCountStamp, stampToDay, getYearRange, formatMonthday } from '../../utils/util';

let timer: NodeJS.Timer;

Page({
  data: {
    showCalendar: false,
    // 当前的日期 默认今天
    curDate: new Date(),
    // 今年的最大和最小
    minDate: 0,
    maxDate: 0,
    curDateInfo: {
      y: '',
      m: '',
      d: '',
      lm: '',
      ld: '',
      gy: '',
      gm: '',
      gd: '',
      an: '',
      cd: '',
      av: '',
      st: '',
      s: '',
      t: '',
      hd: ''
    },
    dayMoney: {
      did: 'day-money',
      show: false,
      content: '',
      title: '今日搬砖工钱',
      term: '工钱',
      path: '/pages/user/index'
    },
    monthMoney: {
      did: 'month-money',
      show: false,
      content: '',
      title: '本月打工工资',
      term: '小钱钱',
      path: '/pages/user/index'
    },
    salary: {
      did: 'salary',
      show: false,
      content: '',
      title: '',
      term: '',
      path: ''
    },
    hoilday: {
      did: 'hoilday',
      show: true,
      content: '',
      title: '',
      term: '',
      path: ''
    },
    hoildayBalance: {
      did: 'hoilday-balance',
      show: true,
      content: '零蛋',
      title: '今年还有多少节假日',
      term: '假期余额',
      path: '/pages_time/calendar/index'
    },
    lieuBalance: {
      did: 'lieu-balance',
      show: true,
      content: '零蛋',
      title: '今年还要补多少班',
      term: '补班余额',
      path: '/pages_time/calendar/index'
    }
  },
  onLoad() {
    this.setCurDate();
  },
  onShow() {
    this.init();
  },
  onUnload() {
    this.clearTick();
  },
  setCurDate() {
    const now = new Date();
    const { minDate, maxDate } = getYearRange(now);
    this.setData({
      curDate: now,
      minDate: minDate.getTime(),
      maxDate: maxDate.getTime()
    });
  },
  init() {
    this.setDay();
    this.setMoney();
    this.setHoilday();
    this.setSalary();
    this.setLieu();
  },
  setDay() {
    const now = this.data.curDate;
    const nowMonth = String(now.getMonth() + 1);
    const nowDay = String(now.getDate());

    // 日期没变 页面onshow时
    if (nowMonth === this.data.curDateInfo.m && nowDay === this.data.curDateInfo.d) return;

    const nowDataInfo = timeList.find((t) => t.m === nowMonth && t.d === nowDay);

    this.setData({
      // @ts-ignore
      curDateInfo: nowDataInfo
    });
  },
  setMoney() {
    // 计算时薪 按24小时计算
    const salary = getSalary();
    if (!salary) {
      this.setData({
        'dayMoney.show': false,
        'monthMoney.show': false
      });
      return;
    }
    const date = new Date();
    // 这个月有几天
    const dates = getCountDays(date);

    // 按月计算 平均日薪
    const avg = salary / dates;
    // 已经过去的天数
    const overDay = date.getDate() - 1;
    // 今天0点起算 已经过去的时间，时间戳
    const overSeconds = getCountStamp(date) / 1000;
    // 豪秒薪
    const secondsMoney = avg / DAY_SECONDS;
    const dayMoney = secondsMoney * overSeconds;
    const monthMoney = overDay * avg + dayMoney;
    this.setData({
      'dayMoney.content': dayMoney,
      'dayMoney.show': true,
      'monthMoney.content': monthMoney,
      'monthMoney.show': true
    });
    this.tick(secondsMoney);
  },
  tick(secondsSalary: number) {
    this.clearTick();
    timer = setInterval(() => {
      this.setData({
        'dayMoney.content': this.data.dayMoney.content + secondsSalary,
        'monthMoney.content': this.data.monthMoney.content + secondsSalary
      });
    }, 1000);
  },
  clearTick() {
    clearInterval(timer);
  },
  setSalary() {
    const { y, m, d } = this.data.curDateInfo;
    const nowDate = new Date(`${y}/${m}/${d}`);
    const salaryDay = getSalaryDay();

    const salaryInfo = {
      did: 'salary',
      show: false,
      content: '',
      title: '',
      path: '/pages/user/index',
      term: ''
    };

    if (salaryDay) {
      const afterMoneymonth = +m + (salaryDay < +d ? 1 : 0);
      const afterMoneyYear = +y + (afterMoneymonth > 12 ? 1 : 0);
      const afterMoneyDate = new Date(`${afterMoneyYear}/${afterMoneymonth}/${salaryDay}`);
      const leftDay = stampToDay(afterMoneyDate.getTime() - nowDate.getTime());

      salaryInfo.show = true;
      if (leftDay === 0) {
        salaryInfo.content = '发钱';
        salaryInfo.title = `今天是个好日子！`;
      } else {
        salaryInfo.content = String(leftDay);
        salaryInfo.title = `距离发工资还有几天`;
      }
      salaryInfo.term = `工资日 ${formatMonthday(afterMoneyDate)}`
    }

    this.setData({
      salary: salaryInfo
    });
  },
  setHoilday() {
    const nowDate = new Date(`${this.data.curDateInfo.y}/${this.data.curDateInfo.m}/${this.data.curDateInfo.d}`);

    const hoildayInfo = {
      did: 'hoilday',
      show: true,
      content: '',
      title: '',
      term: '',
      path: '/pages_time/calendar/index'
    };

    const hoildayIndex = hoildayList.findIndex((x) => {
      return new Date(`${x.y}/${x.m}/${x.d}`) >= nowDate;
    });

    const balance = hoildayIndex !== -1 ? String(hoildayList.length - hoildayIndex) : '零蛋'

    if (hoildayIndex !== -1) {
      const hoilday = hoildayList[hoildayIndex]
      const hoildayDate = new Date(`${hoilday.y}/${hoilday.m}/${hoilday.d}`);
      const leftDay = stampToDay(hoildayDate.getTime() - nowDate.getTime());

      if (leftDay === 0) {
        hoildayInfo.content = '过节';
        hoildayInfo.title = `今天是 ${hoilday.t || hoilday.hd} 节哦！`;
        hoildayInfo.term = '节假日';
      } else {
        hoildayInfo.content = String(leftDay);
        hoildayInfo.title = `距离节假日还有几天`;
        hoildayInfo.term = `${hoilday.t} ${formatMonthday(hoildayDate)}`;
      }
    }

    this.setData({ hoilday: hoildayInfo, 'hoildayBalance.content': balance });
  },
  setLieu() {
    const nowDate = new Date(`${this.data.curDateInfo.y}/${this.data.curDateInfo.m}/${this.data.curDateInfo.d}`);
    const lieuIndex = lieuList.findIndex((x) => {
      return new Date(`${x.y}/${x.m}/${x.d}`) >= nowDate;
    });
    const balance = lieuIndex !== -1 ? String(lieuList.length - lieuIndex) : '零蛋'
    this.setData({
      'lieuBalance.content': balance
    })
  },
  handleClickDay() {
    this.setData({
      showCalendar: true
    });
  },
  onCalendarClose() {
    this.setData({
      showCalendar: false
    });
  },
  onCalendarConfirm(e: VantWeAppEvent<Date>) {
    this.setData({
      curDate: e.detail
    });
    this.onCalendarClose();
    wx.nextTick(() => {
      this.init();
    });
  },
  onShareAppMessage() {}
});
