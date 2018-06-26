const APP = getApp();
import GetPData from '../../utils/pagesRequest.js';
Page({
  data: {
    teamUsers:[],
    user:{},
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
      user:wx.getStorageSync('user')
    })
  },
  getOrderData() {
    GetPData.getPagesData({
      type:1,
      that:this,
      postData:{},
      url:'bonusTeamUser',
      pushData:'teamUsers',
      getStr:'team_users'
    })
  },
  onPullDownRefresh: function () {
    GetPData.pullRefresh({
      that:this,
      pushData:'teamUsers',
      fn:this.getOrderData
    })
  },
  onReachBottom: function () {
    this.getOrderData()
  }
})