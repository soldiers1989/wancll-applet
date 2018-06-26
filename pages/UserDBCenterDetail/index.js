const APP = getApp();
import GetPData from '../../utils/pagesRequest.js';

Page({
  data: {
    tabList: [{
      id: 0,
      title: '全部'
    }, {
      id: 1,
      title: '待审核'
    }, {
      id: 2,
      title: '未通过审核'
    }, {
      id: 3,
      title: '已打款'
    }],
    tabSelectedId: 0,
    dbList: [],
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
    this.getOrderData(this.tabSelectedId)
  },
  // 上拉加载
  onReachBottom: function () {
    this.getOrderData(this.tabSelectedId)
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    GetPData.pullRefresh({
      that:this,
      pushData:'dbList',
      fn:this.getOrderData
    })
  },
  // 获取分页数据
  getOrderData(status) {
    let data = status != 0 ? { status: status } : {}
    GetPData.getPagesData({
      type:1,
      that:this,
      url:'bonusApplysList',
      pushData:'dbList',
      getStr:'applys',
      postData: data
    })
  },
  // 点击切换顶部的标签
  tabchange() {
    GetPData.tabChange({
      that:this,
      pushData:'dbList',
      fn:this.getOrderData
    })
  },
  // 进入详情
  goDetailInfo(e) {
    let id = APP.utils.getDataSet(e, 'id');
    wx.navigateTo({
      url: `/pages/UserDBCenterDetailInfo/index?id=${id}`,
    })
  }
})