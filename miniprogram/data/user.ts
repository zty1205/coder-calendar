import { STORAGE_KEY, WORK_MODE } from "../utils/constant";
export function saveUserSync(user: User): void {
  wx.setStorageSync(STORAGE_KEY.USER, user)
}

export function getUserSync(): User {
  return wx.getStorageSync(STORAGE_KEY.USER)
}

export function getUser() {
  return wx.getStorage({
    key: STORAGE_KEY.USER
  })
}

export async function getUserMode() {
  return new Promise((resolve) => {
    getUser().then(res => {
      const data = res.data as User
      resolve(data.mode)
    }).catch(() => {
      resolve(WORK_MODE.NORMAL)
    })
  })
}


export function getSalarySync(): number {
  const user = getUserSync() || {}
  return user.salary || 0
}

export function getSalaryDaySync(): number {
  const user = getUserSync() || {}
  return user.salaryDay || 0
}
