const APP = getApp();
Page({
  data: {
    walletInfo: {}
  },
  onLoad(options) {
    let that = this;
    APP.ajax({
      url: APP.api.myWallet,
      success(res) {
        that.setData({
          walletInfo: res.data
        })
      }
    })
  },
  onPullDownRefresh() {

  },
  onReachBottom() {

  },
  onShareAppMessage() {

  }
})