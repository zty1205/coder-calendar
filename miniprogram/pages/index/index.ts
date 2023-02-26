import hoildayList from '../../data/holidays';
import monthData from '../../data/month';
import { comingSoon, getSalaryDay, getSalary } from '../../utils/common';
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
      // 星期几
      weekName: '',
      // 阴历
      lunarMonth: '',
      lunarDay: '',
      // 节日
      term: '',
      // 0 正常 1 调休 2 补班
      status: '0',
      year: '',
      month: '',
      day: ''
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
  },
  setDay() {
    const now = this.data.curDate;
    const nowMonth = now.getMonth() + 1;
    const nowDay = now.getDate();

    // 日期没变 页面onshow时
    if (String(nowMonth) === this.data.curDateInfo.month && String(nowDay) === this.data.curDateInfo.day) return;

    const nowDataInfo = monthData[String(nowMonth) as '1'].find((x) => x.day === String(nowDay));

    this.setData({
      curDateInfo: {
        weekName: nowDataInfo?.weekName as string,
        lunarMonth: nowDataInfo?.lunarMonth as string,
        lunarDay: nowDataInfo?.lunarDay as string,
        term: nowDataInfo?.term as string,
        status: nowDataInfo?.status as string,
        year: nowDataInfo?.year as string,
        month: nowDataInfo?.month as string,
        day: nowDataInfo?.day as string
      }
    });
  },
  setMoney() {
    // 计算时薪 按24小时计算
    const salary = getSalary();
    if (!salary){ 
      this.setData({
        'dayMoney.show': false,
        'monthMoney.show': false
      });
      return 
    };
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
        'monthMoney.content':  this.data.monthMoney.content + secondsSalary,
      });
    }, 1000);
  },
  clearTick() {
    clearInterval(timer);
  },
  setSalary() {
    const { year, month, day } = this.data.curDateInfo;
    const nowDate = new Date(`${year}/${month}/${day}`);
    const salaryDay = getSalaryDay();

    const salaryInfo = {
      did: 'salary',
      show: false,
      content: '',
      title: '',
      term: '工资日',
      path: '/pages/user/index'
    };

    if (salaryDay) {
      const afterMoneymonth = +month + (salaryDay < +day ? 1 : 0);
      const afterMoneyYear = +year + (afterMoneymonth > 12 ? 1 : 0);
      const afterMoneyDate = new Date(`${afterMoneyYear}/${afterMoneymonth}/${salaryDay}`);
      const leftDay = stampToDay(afterMoneyDate.getTime() - nowDate.getTime());

      salaryInfo.show = true;
      if (leftDay === 0) {
        salaryInfo.content = '发钱';
        salaryInfo.title = `今天是个好日子！！！`;
      } else {
        salaryInfo.content = String(leftDay);
        salaryInfo.title = `距离 ${formatMonthday(afterMoneyDate)} 还有几天`;
      }
    }

    this.setData({
      salary: salaryInfo
    });
  },
  setHoilday() {
    const nowDate = new Date(
      `${this.data.curDateInfo.year}/${this.data.curDateInfo.month}/${this.data.curDateInfo.day}`
    );

    const hoildayInfo = {
      did: 'hoilday',
      show: true,
      content: '',
      title: '',
      term: '',
      path: ''
    };

    const hoilday = hoildayList.find((x) => {
      return new Date(x.date) >= nowDate;
    });

    if (hoilday) {
      const hoildayDate = new Date(hoilday.date);
      const leftDay = stampToDay(hoildayDate.getTime() - nowDate.getTime());

      hoildayInfo.show = true;
      if (leftDay === 0) {
        hoildayInfo.content = '过节';
        hoildayInfo.title = `今天是 ${hoilday.name} 节哦！`;
        hoildayInfo.term = '节假日';
      } else {
        hoildayInfo.content = String(leftDay);
        hoildayInfo.title = `距离 ${formatMonthday(hoildayDate)} 还有几天`;
        hoildayInfo.term = hoilday.name;
      }
    }

    this.setData({ hoilday: hoildayInfo });
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
  handleTodayEat() {
    wx.navigateTo({
      url: '/pages/food/index'
    });
  },
  handleTodayDo() {
    comingSoon();
  }
});
