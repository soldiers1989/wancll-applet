const app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onShow() {
    if (!app.globalData.hasLogin) {
      wx.redirectTo({
        url: '../../pages/login/login',
      })
    }
  }
})