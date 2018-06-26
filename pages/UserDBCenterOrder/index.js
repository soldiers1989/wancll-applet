const APP = getApp();
import GetPData from '../../utils/pagesRequest.js';

Page({
  data: {
    tabList: [{
      id: 0,
      title: '所有订单'
    }, {
      id: 1,
      title: '待付款'
    }, {
      id: 2,
      title: '已付款'
    }, {
      id: 3,
      title: '已完成'
    }],
    tabSelectedId: 0,
    orderList: [],
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
    this.getOrderData(this.data.tabSelectedId)
  },
  // 上拉加载
  onReachBottom: function () {
    this.getOrderData(this.data.tabSelectedId)
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    GetPData.pullRefresh({
      that:this,
      pushData:'orderList',
      fn:this.getOrderData
    })
  },
  // 获取分页数据
  getOrderData(status) {
    let data = status != 0 ? { order_status: status } : {}
    GetPData.getPagesData({
      type:1,
      that:this,
      url:'bonusOrderList',
      pushData:'orderList',
      getStr:'orders',
      postData: data
    })
  },
  // 点击切换顶部的标签
  tabchange() {
    GetPData.tabChange({
      that:this,
      pushData:'orderList',
      fn:this.getOrderData
    })
  }
})