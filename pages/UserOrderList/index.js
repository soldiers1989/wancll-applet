const APP = getApp()
Page({
  data: {
    tabList: [{
      id: 0,
      name: '全部'
    }, {
      id: 1,
      name: '待付款'
    }, {
      id: 2,
      name: '待发货'
    }, {
      id: 3,
      name: '待收货'
    }, {
      id: 4,
      name: '待评价'
    }],
    status: 0,
    tabSelectedId: 0,
    list: [],
    page: 1,
    haveNoData: false,
    noContentImg: APP.imgs.noContentImg,
  },
  onLoad(options) {
    this.setData({
      page: 1,
      list: [],
      status: options.status || 1,
      tabSelectedId: (options.status == -1 ? 0 : options.status) || 0,
    })
    if (options.status == -1) {
      wx.setNavigationBarTitle({
        title: '售后服务',
      })
    }
  },
  onShow(){
    this.setData({
      page: 1,
      list: [],
    })
    this.getList()
  },
  getList() {
    let status = this.data.status
    let data = {}
    if (status == -1) {
      data.is_has_return_goods = 1;
    } else if (status == 1 || status == 2 || status == 3) {
      data.status = status
    } else if (status == 4) {
      data.status = status
      data.is_comment = 0
    }
    APP.ajax({
      url: APP.api.orderList,
      header: {
        'page-num': this.data.page,
        'page-limit': 10,
      },
      data: data,
    }).then(res => {
      let list = APP.util.arrayToUnique(this.data.list.concat(res.data))
      this.setData({
        list: list,
        haveNoData: !Boolean(list.length),
        page: this.data.page + 1
      })
    }).catch(err => {})
  },
  refreshGet() {
    this.setData({
      page: 1,
      list: []
    })
    this.getList()
  },
  // 点击切换顶部的标签
  tabChange(event) {
    this.setData({
      tabSelectedId: event.detail,
      status: event.detail,
      page: 1,
      list: [],
    })
    this.getList()
  },
  onPullDownRefresh() {
    this.setData({
      page: 1,
      list: []
    })
    this.getList()
    wx.stopPullDownRefresh()
  },
  onReachBottom: function() {
    this.getList()
  }
})