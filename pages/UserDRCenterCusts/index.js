const APP = getApp();
import GetPData from '../../utils/pagesRequest.js';

Page({
  data: {
    custsUser: [],
    user: {},
    // 分页功能
    FPage: {
      pageNum: 1,
      hasData: true,
      noContent: false,
      noContentImg: APP.imgs.noContentImg
    }
  },
  onLoad: function (options) {
    this.getOrderData()
    this.setData({
      user: wx.getStorageSync('user')
    })
  },
  getOrderData() {
    GetPData.getPagesData({
      type:2,
      that:this,
      postData:{},
      url:'drpChildUser',
      pushData:'custsUser'
    })
  },
  onPullDownRefresh: function () {
    GetPData.pullRefresh({
      that:this,
      pushData:'custsUser',
      fn:this.getOrderData
    })
  },
  onReachBottom: function () {
    this.getOrderData()
  }
})