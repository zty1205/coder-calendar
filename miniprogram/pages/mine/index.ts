import { getUserSync } from '../../data/user';
import { removeCache } from '../../utils/cache';
import { comingSoon, wxConfirm } from '../../utils/common';
import { formatSize } from '../../utils/util';

// pages/mine/index.ts
Page({
  data: {
    user: {
      name: '', // 昵称
      desc: '', // desc 描述
      sex: '' // 性别 0女1男
    },
    cacheSize: ''
  },
  onShow() {
    this.init();
  },
  init() {
    this.getUser();
    this.getCacheSize();
  },
  getUser() {
    const user = getUserSync();
    this.setData({
      user: {
        name: user.name || `打工人${Math.floor(Math.random() * 10000)}号`,
        desc: user.desc || '地表最强打工人',
        sex: user.sex
      }
    });
  },
  getCacheSize() {
    const info = wx.getStorageInfoSync();

    const size = info.currentSize;

    console.log('size = ', size, info.keys);
    this.setData({
      cacheSize: size && info.keys.length ? formatSize(size) : ''
    });
  },
  handleEat() {
    wx.navigateTo({
      url: '/pages_ability/food/index'
    });
  },
  handleDo() {
    comingSoon();
  },
  handleDiary() {
    wx.navigateTo({
      url: '/pages_about/version/index'
    });
  },
  handleAbout() {
    wx.navigateTo({
      url: '/pages_about/about/index'
    });
  },
  handleUser() {
    wx.navigateTo({
      url: '/pages/user/index'
    });
  },
  handleCache() {
    wxConfirm('确认删除所有存储数据？').then((bol) => {
      if (bol) {
        removeCache();
        wx.nextTick(() => {
          this.init();
        });
      }
    });
  }
});
