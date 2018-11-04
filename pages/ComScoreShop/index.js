const APP = getApp()
import {
  getData,
  getList,
  sign,
} from './data.js'
Page({
  data: {
    // 商品列表
    list: [],
    page: 1,
    haveNoData: false,
    noContentImg: APP.imgs.noContentImg,
    // 用户
    user: {},
    userAsset: {},
    isSign: {
      is_sign_in: 0
    },
    scoreParams: {},
    orderCount: {},
    homeBgImg: APP.imgs.homeBgImg,
  },
  onLoad() {},
  onShow() {
    this.setData({
      page: 1,
      list: []
    })
    getList(this)
    getData(this)
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      page: 1,
      list: []
    })
    getList(this)
    getData(this)
  },
  onReachBottom() {
    getList(this)
  },
  // 签到
  signIn() {
    sign(this)
  },
  // 去订单列表
  goOrderList(e) {
    let target = APP.util.getDataSet(e, 'target')
    wx.navigateTo({
      url: `/pages/UserScoreOrderList/index?status=${target}`,
    })
  },
  // 积分记录
  goScoreLog() {
    wx.navigateTo({
      url: `/pages/UserScoreLog/index`,
    })
  },
  // 商品详情
  goGoodsDetail(e) {
    let id = APP.util.getDataSet(e, 'id')
    wx.navigateTo({
      url: `/pages/ComScoreGoodsDetail/index?id=${id}`,
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  }
})