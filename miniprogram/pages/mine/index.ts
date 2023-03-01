import { comingSoon } from "../../utils/common";

// pages/mine/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleEat() {
    wx.navigateTo({
      url: '/pages_ability/food/index'
    })
  },
  handleDo() {
    comingSoon();
  },
  handleDiary() {
    wx.navigateTo({
      url: '/pages_about/version/index'
    })
  },
  handleAbout() {
    wx.navigateTo({
      url: '/pages_about/about/index'
    })
  }
})

