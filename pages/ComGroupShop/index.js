const APP = getApp()
import {
  getGroupOrdersCount,
  getList,
  getGroupParams,
} from './data.js'

Page({
  data: {
    user: wx.getStorageSync('user'), // 用户
    homeBgImg: APP.imgs.homeBgImg,
    orderCount: {
      wait_pay_num: 0,
      wait_team_num: 0,
      wait_finish_num: 0,
      wait_ship_num: 0,
    },
    // 商品列表
    list: [],
    page: 1,
    haveNoData: false,
    noContentImg: APP.imgs.noContentImg,
    groupParams: {}
  },
  onLoad() {},
  onShow() {
    this.setData({
      page: 1,
      list: [],
    })
    getGroupParams(this)
    getGroupOrdersCount(this)
  },
  onPullDownRefresh() {
    this.setData({
      page: 1,
      list: [],
    })
    getGroupParams(this)
    getGroupOrdersCount(this)
    wx.stopPullDownRefresh()
  },
  onReachBottom() {
    getGroupParams(this)
  },
  goOrderList(e) {
    let target = APP.util.getDataSet(e, 'target')
    wx.navigateTo({
      url: `/pages/UserGroupOrderList/index?status=${target}`,
    })
  },
  goGoodsDetail(e) {
    let id = APP.util.getDataSet(e, 'id')
    wx.navigateTo({
      url: `/pages/ComGroupGoodsDetail/index?id=${id}`,
    })
  },
})