import hoildayList from '../../data/holidays'
import mouthData from '../../data/mouth'
import { getUserSalaryInfo, comingSoon, getSalaryDay } from '../../utils/common'
import { DAY_STAMP } from '../../utils/constant'
import { getCountDays, getCountStamp, stampToDay } from "../../utils/util"

let timer = 0

Page({
  data: {
    weekName: "",
    lunarMouth: "",
    lunarDay: "",
    term: "",
    status: "",
    year: "",
    mouth: "",
    day: "",
    beforeMoneyDay: 0,
    beforeWeek: 0,
    beforeHoilday: 0,
    nextHoilday: {
      name: '',
      date: ''
    },
    salary: 0,
    currentSalary: 0,
    salaryDay: 0
  },
  onLoad() {
    this.setToday()
    this.setBeforeWeek()
    this.setBeforeHoilday()
  },
  onShow() {
    this.setBeforeMoney()
    this.setSalary()
  },
  onUnload() {
    this.clearTick()
  },
  setToday() {
    const now = new Date()
    const nowMouth = now.getMonth() + 1
    const nowDay = now.getDate()

    if (String(nowMouth) === this.data.mouth && String(nowDay) === this.data.day) return
    const nowMouthData = mouthData[String(nowMouth) as "1"].find(x => x.day === String(nowDay))

    this.setData({
      weekName: nowMouthData?.weekName,
      lunarMouth: nowMouthData?.lunarMouth,
      lunarDay: nowMouthData?.lunarDay,
      term: nowMouthData?.term,
      status: nowMouthData?.status,
      year: nowMouthData?.year,
      mouth: nowMouthData?.mouth,
      day: nowMouthData?.day,
    })
  },
  setBeforeMoney() {
    const { year, mouth, day } = this.data
    const nowDate = new Date(`${year}/${mouth}/${day}`)
    const salaryDay = getSalaryDay();
    console.log('salaryDay = ', salaryDay)
    console.log('nowDate = ', nowDate)
    if (salaryDay === this.data.salaryDay) return
    const afterMoneyMouth = +mouth + (salaryDay < +day ? 1 : 0)
    const afterMoneyYear = +year + (afterMoneyMouth > 12 ? 1 : 0)
    const afterMoneyDate = new Date(`${afterMoneyYear}/${afterMoneyMouth}/${salaryDay}`)
    console.log('afterMoneyDate = ', afterMoneyDate)
    const beforeMoneyDay = stampToDay(afterMoneyDate.getTime() - nowDate.getTime())
    this.setData({
      beforeMoneyDay: beforeMoneyDay
    })
  },
  setBeforeWeek() {
    const nowDate = new Date(`${this.data.year}/${this.data.mouth}/${this.data.day}`)
    const nDay = nowDate.getDay() // 0-6
    const beforeWeek = nDay === 0 || nDay === 6 ? 0 : (6 - nDay)
    this.setData({
      beforeWeek: beforeWeek
    })
  },
  setBeforeHoilday() {
    const nowDate = new Date(`${this.data.year}/${this.data.mouth}/${this.data.day}`)

    const hoilday = hoildayList.find(x => {
      return new Date(x.date) >= nowDate
    })

    if (hoilday) {
      const beforeHoilday = stampToDay(new Date(hoilday.date).getTime() - nowDate.getTime())
      const nextHoilday = {
        name: hoilday.name,
        date: hoilday.date
      }
      this.setData({ beforeHoilday, nextHoilday })
    } else {
      this.setData({ beforeHoilday: -1 })
    }
  },
  setSalary() {
    // 计算时薪 按24小时计算
    const { salary, salaryDay } = getUserSalaryInfo();
    if (salary === this.data.salary && salaryDay === this.data.salaryDay) return
    this.setData({
      salary: salary || 0,
      salaryDay: salaryDay || 0
    })
    this.calcSalary(new Date(), salary)
  },
  calcSalary(date: Date, salary?: number) {
    if (!salary) return
    const dates = getCountDays(date)
    // 按月计算 平均日薪
    const avg = salary / dates
    // // 已经过去的天数
    // const overDays =  date.getDate() - 1
    // 今天已经过去的时间，时间戳
    const overStamp = getCountStamp(date)
    // 豪秒薪
    const secondsSalary = avg / DAY_STAMP
    const currentSalary = secondsSalary * overStamp  // + overDays * avg
    this.setData({
      currentSalary: currentSalary
    })
    this.tick(secondsSalary)
  },
  tick(secondsSalary: number) {
    this.clearTick()
    timer = setInterval(() => {
      this.setData({
        currentSalary: this.data.currentSalary + secondsSalary
      })
      // console.log('tick', this.data.currentSalary)
    }, 1000)
  },
  clearTick() {
    clearInterval(timer)
  },
  handleTodayEat() {
    comingSoon()
    // wx.navigateTo({
    //   url: '/pages/food/index'
    // })
  },
  handleTodayDo() {
    comingSoon()
  },
  handleSetSalary() {
    wx.navigateTo({
      url: '/pages/user/index'
    })
  },
  handleAbout() {
    wx.navigateTo({
      url: '/pages/about/index'
    })
  }
})
