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
  },
  onLoad: function(options) {
    this.setData({
      user: wx.getStorageSync('user'),
    })
    userAssetRead(this)
    getList(this)
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
    this.setData({
      page: 1,
    })
    getList(this)
    userAssetRead(this)
  },
  onReachBottom: function() {
    getList(this)
  },
  onShareAppMessage: function() {

  }
})