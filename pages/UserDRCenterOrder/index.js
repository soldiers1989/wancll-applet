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
    orderList:[],
    orderData:{},
    pageNum: 1,
    noContent: false,
    noContentImg: APP.imgs.noContentImg
  },

  onLoad: function (options) {
    this.getOrderData(this.tabSelectedId)
  },

  getOrderData(status) {
    let data = status != 0 ? { order_status: status } : {}
    APP.ajax({
      url: APP.api.bonusOrderList,
      data: data,
      header: {
        'page-limit': 10,
        'page-num': this.data.pageNum,
      },
      success: (res) => {
        if (res.data.orders.length>0) {
          this.setData({
            orderData: res.data,
            orderList: this.data.orderList.concat(res.data.orders),
            pageNum: ++(this.data.pageNum),
            noContent: false,
          })
        } else if (this.data.pageNum == 1) {
          this.setData({
            noContent: true
          })
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
      pageNum: 1,
    }, () => {
      this.getOrderData(id);
    })
  },

  onPullDownRefresh: function () {
    this.setData({
      pageNum: 1,
      orderList: []
    }, () => {
      this.getOrderData(this.tabSelectedId)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getOrderData(this.tabSelectedId)
  }

})