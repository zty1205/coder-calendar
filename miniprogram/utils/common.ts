import { STORAGE_KEY } from './constant';

export function getSalary(): number {
  return wx.getStorageSync(STORAGE_KEY.SALARY);
}

export function setSalary(salary: number) {
  wx.setStorageSync(STORAGE_KEY.SALARY, salary);
}

export function getSalaryDay(): number {
  return wx.getStorageSync(STORAGE_KEY.SALARY_DAY);
}

export function setSalaryDay(day: number) {
  wx.setStorageSync(STORAGE_KEY.SALARY_DAY, day);
}

export function getUserSalaryInfo() {
  return {
    salary: getSalary(),
    salaryDay: getSalaryDay()
  };
}

const ComingText = [
  '程序员正在飞速撸代码中！',
  '程序员正在加班中！',
  '程序员抓掉一把头发！',
  '程序员开启了996模式！',
  '程序员已经秃头！',
  '对不起，你的程序员正在ICU!'
];
let comingIndex = 0;
export function comingSoon() {
  return new Promise((resolve) => {
    wx.showModal({
      title: '提示',
      content: ComingText[comingIndex++] || ComingText[ComingText.length - 1],
      showCancel: false,
      confirmText: '我知道了',
      success: resolve
    });
  });
}

export function wxConfirm(content: string): Promise<Boolean> {
  return new Promise((resolve) => {
    wx.showModal({
      title: '确认',
      content: content,
      cancelText: '取消',
      confirmText: '我知道了',
      success: (res) => {
        if (res.confirm) {
          resolve(true);
        } else {
          resolve(false);
        }
      },
      fail: () => resolve(false)
    });
  });
}
