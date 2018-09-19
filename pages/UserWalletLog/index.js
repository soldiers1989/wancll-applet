const APP = getApp()
Page({
  data: {
    list: [],
    page: 1,
    haveNoContent: false,
    noContentImg: APP.imgs.noContentImg,
  },
  onLoad(options) {
    this.getList()
  },
  getList() {
    APP.ajax({
      url: APP.api.myWalletLog,
      header: {
        'page-limit': 10,
        'page-num': this.data.page,
      },
      data: {
        asset_type: 'money',
      },
    }).then(res => {
      let list = APP.util.arrayToUnique(this.data.list.concat(res.data))
      this.setData({
        list: list,
        haveNoData: !Boolean(list.length),
        page: this.data.page + 1
      })
    }).catch(err => [
      console.log(err)
    ])
  },
  onPullDownRefresh() {
    this.setData({
      list: [],
      page: 1,
    })
    this.getList()
    wx.stopPullDownRefresh()
  },
  onReachBottom() {
    this.getList()
  },
  onShareAppMessage() {}
})