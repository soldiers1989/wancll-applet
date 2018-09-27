const APP = getApp()
import {
  userAssetRead,
  getList,
} from './data.js'
Page({
  data: {
    userAsset: {},
    list: [],
    page: 1,
    haveNoData: false,
    noContentImg: APP.imgs.noContentImg,
    homeBgImg: APP.imgs.homeBgImg,
  },
  onLoad(options) {
    this.setData({
      user: wx.getStorageSync('user'),
    })
    userAssetRead(this)
    getList(this)
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    this.setData({
      page: 1,
      list: [],
    })
    getList(this)
    userAssetRead(this)
  },
  onReachBottom() {
    getList(this)
  },
  onShareAppMessage() {

  }
})