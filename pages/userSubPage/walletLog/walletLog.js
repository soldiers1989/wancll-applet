const APP = getApp();
Page({
  data: {
    logs: [],
    pageNum: 1,
    pageLimit: 10,
    loading: true,
  },
  onLoad(options) {
    this.getData()
  },
  getData() {
    let that = this
    let pageNum = this.data.pageNum;
    let logs = this.data.logs
    APP.ajax({
      url: APP.api.myWalletLog,
      header: {
        'page-limit': that.data.pageLimit,
        'page-num': pageNum,
      },
      success(res) {
        if (res.data.length) {
          that.setData({
            logs: logs.concat(res.dat),
            pageNum: ++pageNum
          })
        } else {
          that.setData({
            loading: false
          })
        }
      }
    })
  },
  onPullDownRefresh() {

  },

  onReachBottom() {
    this.getData()
  },
  onShareAppMessage() {

  }
})