const APP = getApp();
import { getOrderData } from './data.js'
Page({
  data: {
    tabList: [{
      id: 0,
      title: '全部'
    }, {
      id: 1,
      title: '待付款'
    }, {
      id: 2,
      title: '待发货'
    }, {
      id: 3,
      title: '待收货'
    }, {
      id: 4,
      title: '待评价'
    }],
    tabSelectedId: 0,
    orderList: [],
    pageNum: 1,
    noContent: false,
    noContentImg: APP.imgs.noContentImg
  },
  onLoad(options) {
    // 设置跳转目标并对应请求
    if (options.target) {
      wx.setStorageSync('thisOrderList', Number(options.target))
      this.setData({
        tabSelectedId: options.target
      }, () => {
        getOrderData(this, options.target);
      })
    }
  },
  //重新加载数据
  refreshGet() {
    this.setData({
      orderList: [],
      pageNum: 1,
    })
    getOrderData(this, this.data.tabSelectedId);
  },
  // 点击切换顶部的标签
  tabchange(e) {
    let id = this.selectComponent("#tab").data.selectedId
    // 禁止重复点击
    if (id == this.data.tabSelectedId) {
      return;
    }
    wx.setStorageSync('thisOrderList', id)
    this.setData({
      tabSelectedId: id,
      orderList: [],
      pageNum: 1,
    }, () => {
      getOrderData(this, id);
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
    this.setData({
      orderList: [],
      pageNum: 1,
    })
    wx.setStorageSync('orderList', []);
    getOrderData(this, this.data.tabSelectedId);
  },
  onReachBottom: function () {
    getOrderData(this, this.data.tabSelectedId);
  },
  onShareAppMessage() {

  }
})