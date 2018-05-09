//index.js
//获取应用实例
const app = getApp();


Page({
  data: {

  },
  onLoad() {
    // 判断是否登陆
    app.globalData.hasLogin = wx.getStorageSync('token') ? true : false;
  }
})
