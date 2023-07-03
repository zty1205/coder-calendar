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
  handleSoon() {
    comingSoon();
  }
});
