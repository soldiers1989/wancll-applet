const APP = getApp()
import {
  getData,
  queryAuthStatus,
  checkDRPage,
  checkDBPage,
} from './data.js'
Page({
  data: {
    homeBgImg: APP.imgs.homeBgImg,
    user: {},
    orderCount: {},
    userAsset: {},
    systemInfo: {
      is_open_bonus: false,
      is_open_drp: false,
    },
    systemParams: {},
    loading: false,
  },
  onLoad(options) {},
  onShow() {
    // 判断登录状态
    if (!wx.getStorageSync('token')) {
      wx.redirectTo({
        url: '/pages/ComLogin/index',
      })
    } else {
      getData(this)
    }
    APP.ajax({
      url: APP.api.systemParams,
      data: {
        type: 'basic'
      }
    }).then(res => {
      this.setData({
        systemParams: res.data
      })
    }).catch(err => {})
  },
  // 拨打客服电话
  call(){
    wx.makePhoneCall({
      phoneNumber: this.data.systemParams.customer_telephone,
    })
  },
  // 跳转到订单状态页面
  goOrderList(e) {
    let status = APP.util.getDataSet(e, 'status')
    console.log(status)
    wx.navigateTo({
      url: `/pages/UserOrderList/index?status=${status}`,
    })
  },
  // 跳转到子页面
  goSubPages(e) {
    let target = APP.util.getDataSet(e, 'target')
    wx.navigateTo({
      url: `/pages/${target}/index`,
    })
  },
  // 检查分销
  checkDRPage() {
    if (!this.data.loading) {
      this.setData({
        loading: true,
      })
      checkDRPage(this)
    }
  },
  // 检查分红
  checkDBPage() {
    if (!this.data.loading) {
      this.setData({
        loading: true,
      })
      checkDBPage(this)
    }
  },
  // 跳转到购物车页面
  goCarts(e) {
    let target = APP.util.getDataSet(e, 'target')
    wx.switchTab({
      url: `/pages/${target}/index`,
    })
  },
  // 跳转成长值记录
  goLevel() {
    wx.navigateTo({
      url: `/pages/UserLevel/index`,
    })
  },
  // 跳转到设置页面
  goSetting() {
    wx.navigateTo({
      url: `/pages/UserSetting/index`,
    })
  },
  auth() {
    queryAuthStatus()
  },
  onPullDownRefresh() {
    getData(this)
    wx.stopPullDownRefresh()
  },
  onShareAppMessage() {

  }
})