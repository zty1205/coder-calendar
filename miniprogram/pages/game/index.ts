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
    wx.showToast({
      title: '微信审核失败，敬请期待',
      icon: 'none',
    })
  },
  handleSoon() {
    comingSoon();
  }
});
