const APP = getApp();
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
    orderData: {},
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
  },

  getOrderData(status) {
    // 数据请求完了
    if (!this.data.FPage.hasData) {
      return;
    }
    let data = status != 0 ? { order_status: status } : {}
    APP.ajax({
      url: APP.api.bonusOrderList,
      data: data,
      header: {
        'page-limit': 10,
        'page-num': this.data.FPage.pageNum,
      },
      success: (res) => {
        if (res.data.orders.length) {
          this.setData({
            orderData: res.data,
            orderList: this.data.orderList.concat(res.data.orders),
            ['FPage.pageNum']: ++(this.data.FPage.pageNum),
            ['FPage.noContent']: false,
          })
        } else {
          // 如果是第一页就位空
          if (this.data.pageNum == 1) {
            this.setData({
              ['FPage.noContent']: true,
              ['FPage.hasData']: false
            })
          } else {
            this.setData({
              ['FPage.hasData']: false
            })
          }
        }
      }
    })
  },
  // 点击切换顶部的标签
  tabchange(e) {
    let id = this.selectComponent("#tab").data.selectedId
    // 禁止重复点击
    if (id == this.data.tabSelectedId) {
      return;
    }
    this.setData({
      tabSelectedId: id,
      orderList: [],
      ['FPage.pageNum']: 1,
    }, () => {
      this.getOrderData(id);
    })
  },

  onPullDownRefresh: function () {
    this.setData({
      ['FPage.pageNum']: 1,
      orderList: []
    }, () => {
      this.getOrderData(this.data.tabSelectedId)
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getOrderData(this.data.tabSelectedId)
  }

})