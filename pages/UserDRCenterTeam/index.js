const APP = getApp()
import {
  getLevel,
  getList,
} from './data.js'
Page({
  data: {
    tabList: [],
    tabSelectedId: 1,
    list: [],
    page: 1,
    haveNoData: false,
    noContentImg: APP.imgs.noContentImg,
    user: {},
    team_info: {},
  },
  onLoad(options) {
    this.setData({
      user: wx.getStorageSync('user')
    })
    getList(this)
    getLevel(this)
  },
  // 点击切换顶部的标签
  tabChange(event) {
    this.setData({
      page: 1,
      list: [],
      tabSelectedId: event.detail
    })
    getList(this)
  },
  onPullDownRefresh() {
    this.setData({
      page: 1,
      list: [],
    })
    getList(this)
    getLevel(this)
    wx.stopPullDownRefresh()
  },
  onReachBottom() {
    getList(this)
  }
})