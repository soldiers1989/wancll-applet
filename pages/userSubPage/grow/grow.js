const APP = getApp();
import { getUserAsset, getList } from './growData.js';
Page({
  data: {
    asset: {},
    user: {},
    lists: [],
    pageNum: 1,
    pageLimit: 10,
    loading: true
  },
  onLoad: function (options) {
    this.setData({
      user: wx.getStorageSync('user')
    })
    getUserAsset(this);
    getList(this);
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    this.setData({
      lists: [],
      pageNum: 1
    })
    getList(this);
    getUserAsset(this);
  },
  onReachBottom: function () {
    getList(this);
  },
  onShareAppMessage: function () {

  }
})