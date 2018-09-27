const APP = getApp();
Page({
  data: {
    tabList: [{
      id: 0,
      name: '全部'
    }, {
      id: 2,
      name: '待发货'
    }, {
      id: 3,
      name: '待收货'
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
      status: options.status || 0,
      tabSelectedId: options.status || 0,
    })
    this.getList()
  },
  getList() {
    let data = {}
    if(this.data.tabSelectedId != 0){
      data.status = this.data.tabSelectedId
    }
    APP.ajax({
      url: APP.api.scoreOrderList,
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
  // 重新加载数据
  refreshGet() {
    this.setData({
      page: 1,
      list: [],
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