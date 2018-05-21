const APP = getApp()
import { getUserData } from './user-data.js';
Page({
  data: {
    user: {},
    count: {},
    asset: {},
  },
  onLoad: function (options) {

  },
  // 跳转到订单状态页面
  goOrderList(e) {
    let target = APP.utils.getDataSet(e, 'target')
    wx.navigateTo({
      url: `/pages/userSubPage/order/order?target=${target}`,
    })
  },
  // 跳转到子页面
  goSubPages(e) {
    let target = APP.utils.getDataSet(e, 'target')
    wx.navigateTo({
      url: `/pages/userSubPage/${target}/${target}`,
    })
  },
  // 跳转到购物车页面 这个有问题，多余
  goCarts(e) {
    let target = APP.utils.getDataSet(e, 'target')
    wx.switchTab({
      url: `/pages/${target}/${target}`,
    })
  },
  // 跳转成长值记录
  showGrow() {
    wx.navigateTo({
      url: `/pages/userSubPage/grow/grow`,
    })
  },
  // 跳转到设置页面
  settingInfo() {
    wx.navigateTo({
      url: `/pages/userSubPage/setting/setting`,
    })
  },
  onReady: function () {
  },
  onShow: function () {
    // 判断登录状态
    if (!wx.getStorageSync('token')) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    } else {
      // 发起请求
      getUserData(this);
    }
  },
  onPullDownRefresh: function () {
    getUserData();
  },
  onShareAppMessage: function () {

  }
})