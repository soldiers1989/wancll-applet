const APP = getApp();
import PagingData from '../../utils/PagingData';
const Paging = new PagingData();
Page({
  data: {
    tabList: [{
      id: 0,
      title: '全部'
    }, {
      id: 2,
      title: '待发货'
    }, {
      id: 3,
      title: '待收货'
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
  onLoad(options) {
    Paging.init({
      type:2,
      that:this,
      url:'scoreOrderList',
      pushData:'orderList',
      getFunc: this.getOrderData
    })
    this.setData({
      tabSelectedId: options.status
    }, () => {
      this.getOrderData(options.status)
    })
  },
  getOrderData(status) {
    let data = status != 0 ? { status: status } : {}
    Paging.getPagesData({postData: data})
  },
  // 重新加载数据
  refreshGet() {
    Paging.refresh()
  },
  // 点击切换顶部的标签
  tabchange() {
    Paging.tabChange()
  },
  onPullDownRefresh() {
    Paging.refresh()
  },
  onReachBottom: function () {
    this.getOrderData(this.data.tabSelectedId)
  }
})