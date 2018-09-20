const APP = getApp();
Page({
  data: {
    user: {},
    // 分页数据
    list: [],
    page: 1,
    haveNoData: false,
    noContentImg: APP.imgs.noContentImg,
  },
  // 初始化
  onLoad(options) {
    this.setData({
      user: wx.getStorageSync('user')
    })
    this.getList()
  },
  getList() {
    APP.ajax({
      url: APP.api.drpChildUser,
      header: {
        'page-num': this.data.page,
        'page-limit': 10,
      }
    }).then(res => {
      let list = APP.util.arrayToUnique(this.data.list.concat(res.data))
      this.setData({
        list: list,
        haveNoData: !Boolean(list.length),
        page: this.data.page + 1,
      })
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      page: 1,
      list: [],
    })
    this.getList()
  },
  // 上拉加载
  onReachBottom() {
    this.getList()
  }
})