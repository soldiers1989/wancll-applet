const APP = getApp();
import GetPData from '../../utils/pagesRequest.js';
Page({
  data: {
    tabList: [{
      id: 1,
      title: '一级'
    }, {
      id: 2,
      title: '二级'
    }, {
      id: 3,
      title: '三级'
    }],
    tabSelectedId: 1,
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
    this.getOrderData(this.data.tabSelectedId)
    this.setData({
      user:wx.getStorageSync('user')
    })
  },
  getOrderData(id) {
    GetPData.getPagesData({
      type:1,
      that:this,
      url:'drpTeamUser',
      pushData:'teamUsers',
      getStr:'team_users',
      postData: {team_type:id}
    })
  },
  // 点击切换顶部的标签
  tabchange(e) {
    GetPData.tabChange({
      that:this,
      pushData:'teamUsers',
      fn:this.getOrderData
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
    this.getOrderData(this.data.tabSelectedId)
  }
})