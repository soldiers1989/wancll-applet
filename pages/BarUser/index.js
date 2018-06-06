const APP = getApp()
import { getUserData, queryAuthStatus } from './data.js';
Page({
  data: {
    user: {},
    count: {},
    asset: {},
  },
  onLoad(options) {

  },
  // 跳转到订单状态页面
  goOrderList(e) {
    let target = APP.utils.getDataSet(e, 'target')
    wx.navigateTo({
      url: `/pages/UserOrderList/index?target=${target}`,
    })
  },
  // 跳转到子页面
  goSubPages(e) {
    let target = APP.utils.getDataSet(e, 'target')
    wx.navigateTo({
      url: `/pages/${target}/index`,
    })
  },
  // 跳转到购物车页面
  goCarts(e) {
    let target = APP.utils.getDataSet(e, 'target')
    wx.switchTab({
      url: `/pages/${target}/index`,
    })
  },
  // 跳转成长值记录
  showGrow() {
    wx.navigateTo({
      url: `/pages/UserGrow/index`,
    })
  },
  // 跳转到设置页面
  settingInfo() {
    wx.navigateTo({
      url: `/pages/UserSetting/index`,
    })
  },
  onShow: function () {
    // 判断登录状态
    if (!wx.getStorageSync('token')) {
      wx.redirectTo({
        url: '/pages/ComLogin/index',
      })
    } else {
      // 发起请求
      getUserData(this);
    }
  },
  auth() {
    queryAuthStatus();
  },
  onPullDownRefresh() {
    getUserData(this);
    wx.stopPullDownRefresh();
  },
  onShareAppMessage() {

  }
})