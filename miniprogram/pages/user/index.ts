import { setSalary, setSalaryDay, getUserSalaryInfo } from "../../utils/common"
import salaryDays from '../../data/salaryDays'

Page({
  data: {
    salary: 0,
    salaryDay: 0,
    showSalaryDayPopup: false,
    salaryDayColumns: salaryDays
  },
  onLoad() {
    this.getSalaryInfo()
  },
  getSalaryInfo() {
    const { salary, salaryDay } = getUserSalaryInfo();
    this.setData({
      salary: salary || 0,
      salaryDay: salaryDay || 0
    })
  },
  handleSalaryBlur(event: VantWeAppEvent) {
    this.handleSalaryConfirm(event)
  },
  handleSalaryConfirm(event: VantWeAppEvent) {
    const val = event.detail.value
    if (this.data.salary != val) {
      this.setData({
        salary: Number(val)
      })
      setSalary(Number(val))
    }
  },
  handleSalaryDayClick() {
    this.setData({
      showSalaryDayPopup: true
    })
  },
  handleSalaryDayCancel() {
    this.setData({
      showSalaryDayPopup: false
    })
  },
  handleSalaryDayConfirm(event: VantWeAppEvent) {
    const val = event.detail.value
    if (this.data.salaryDay != val) {
      this.setData({
        salaryDay: Number(val)
      })
      setSalaryDay(Number(val))
    }
    this.setData({
      showSalaryDayPopup: false
    })
  },
})