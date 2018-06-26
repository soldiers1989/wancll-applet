const APP = getApp();
import GetPData from '../../utils/pagesRequest.js';

Page({
  data: {
    user: {},
    // 分页数据
    custsUser: [],
    // 分页功能
    FPage: {
      pageNum: 1,
      hasData: true,
      noContent: false,
      noContentImg: APP.imgs.noContentImg
    }
  },
  // 初始化
  onLoad: function (options) {
    this.getOrderData()
    this.setData({
      user: wx.getStorageSync('user')
    })
  },
  // 获取分页数据
  getOrderData() {
    GetPData.getPagesData({
      type:2,
      that:this,
      url:'bonusChildUser',
      pushData:'custsUser',
    })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    GetPData.pullRefresh({
      that:this,
      pushData:'custsUser',
      fn:this.getOrderData
    })
  },
  // 上拉加载
  onReachBottom: function () {
    this.getOrderData()
  }
})