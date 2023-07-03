import { getUserSync } from '../../data/user';
import { removeCache } from '../../utils/cache';
import { comingSoon, resetComing, wxConfirm } from '../../utils/common';
import { WORK_MODE } from '../../utils/constant';
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
    resetComing();
    this.init();
  },
  onShareAppMessage() {
    return {
      title: '打工人，打工魂',
      path: '/pages/index/index'
    };
  },
  init() {
    this.getUser();
    this.getCacheSize();
  },
  getUser() {
    const user = getUserSync();
    this.setData({
      user: {
        name: user.name || `打工人996号`,
        desc: user.desc || '地表最强打工人',
        sex: user.sex
      }
    });
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: user.mode === WORK_MODE['996'] ? '#f5f5f5' : '#ffffff'
    });
  },
  getCacheSize() {
    const info = wx.getStorageInfoSync();
    const size = info.currentSize;

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
    wx.navigateTo({
      url: '/pages_ability/something/index'
    });
  },
  handlePlay() {
    wx.navigateTo({
      url: '/pages/game/index'
    });
  },
  handleDiary() {
    wx.navigateTo({
      url: '/pages_about/version/index'
    });
  },
  handleHelper() {
    wx.navigateTo({
      url: '/pages_about/helper/index'
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
