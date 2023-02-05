import { getSalary, getSalaryDay } from './utils/common';

// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {},
  onShow() {
    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        wx.showToast({
          title: '检查到有新版本，下载新版本中...',
          icon: 'none'
        });
      }
    });

    updateManager.onUpdateReady(function () {
      wx.hideToast();
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否更新？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        }
      });
    });

    updateManager.onUpdateFailed(function () {
      wx.showToast({
        title: '新版本更新失败！',
        icon: 'none'
      });
    });
  }
});
