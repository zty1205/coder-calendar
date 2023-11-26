import { comingSoon } from '../../utils/common';

Page({
  data: {},
  onLoad() {},
  onUnload() {},
  onShareAppMessage() {
    return {};
  },
  handleTF() {
    wx.navigateTo({
      url: '/pages_ability/twenty-four/index'
    });
  },
  handleBoom() {
    wx.navigateTo({
      url: '/pages_ability/boom/index'
    });
  },
  handleSoon() {
    comingSoon();
  }
});
