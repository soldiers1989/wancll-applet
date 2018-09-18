const APP = getApp();
import PagingData from '../../utils/PagingData';
const Paging = new PagingData();
Page({
  data: {
    FPage: {
      pageNum: 1,
      hasData: true,
      noContent: false,
      noContentImg: APP.imgs.noContentImg
    },
    orderList: []
  },
  onLoad(options) {
    Paging.init({
      type: 2,
      that: this,
      url: 'orderAll',
      pushData: 'orderList',
      getFunc: this.getOrderData
    })
    this.getOrderData();
  },
  getOrderData() {
    Paging.getPagesData({
      postData: {
        is_has_return_goods: 1
      }
    })
  },
  onPullDownRefresh() {
    Paging.refresh()
  },
  onReachBottom: function() {
    this.getOrderData()
  }
})