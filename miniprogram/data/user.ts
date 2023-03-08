import { STORAGE_KEY } from "../utils/constant";


export function saveUserSync(user: User): void {
  wx.setStorageSync(STORAGE_KEY.USER, user)
}

export function getUserSync(): User {
  return wx.getStorageSync(STORAGE_KEY.USER)
}