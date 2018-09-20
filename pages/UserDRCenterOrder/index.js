const APP = getApp()
Page({
  data: {
    tabList: [{
      id: 0,
      name: '所有订单'
    }, {
      id: 1,
      name: '待付款'
    }, {
      id: 2,
      name: '已付款'
    }, {
      id: 3,
      name: '已完成'
    }],
    tabSelectedId: 0,
    total_order_num: '',
    total_except_money: '',
    // 分页数据
    list: [],
    page: 1,
    haveNoData: false,
    noContentImg: APP.imgs.noContentImg,

  },
  onLoad(options) {
    this.getList()
  },
  getList() {
    let data = {}
    if (this.data.tabSelectedId != 0) {
      data.order_status = this.data.tabSelectedId
    }
    APP.ajax({
      url: APP.api.drpOrderList,
      data: data,
      header: {
        'page-num': this.data.page,
        'page-limit': 10,
      }
    }).then(res => {
      let list = this.data.list.concat(res.data.orders)
      this.setData({
        list: list,
        haveNoData: !Boolean(list.length),
        page: this.data.page + 1,
        total_except_money: res.data.total_except_money,
        total_order_num: res.data.total_order_num,
      })
    }).catch(err => {
      console.warn(err)
    })
  },
  // 上拉加载
  onReachBottom() {
    this.getList()
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      page: 1,
      list: [],
    })
    this.getList()
    wx.stopPullDownRefresh()
  },
  // 点击切换顶部的标签
  tabChange(event) {
    this.setData({
      page: 1,
      list: [],
      tabSelectedId: event.detail
    })
    this.getList()
  }
})