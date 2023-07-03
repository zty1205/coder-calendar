import { STORAGE_KEY } from "./constant"

export function removeCache(): void {
  wx.clearStorageSync()
}

export function setPokesRate(val: string) {
  wx.setStorageSync(STORAGE_KEY.POKES_RATE, val)
}

export function getPokesRate(): string {
  return wx.getStorageSync(STORAGE_KEY.POKES_RATE) as string
}