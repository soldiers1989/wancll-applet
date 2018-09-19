const APP = getApp()
Page({
  data: {
    walletInfo: {}
  },
  onLoad(options) {},
  onShow(){
    this.getAssetData()
  },
  getAssetData() {
    APP.ajax({
      url: APP.api.myWallet,
    }).then(res => {
      wx.stopPullDownRefresh()
      this.setData({
        walletInfo: res.data,
      })
    }).catch(err => {
      wx.stopPullDownRefresh()
    })
  },
  onPullDownRefresh() {
    this.getAssetData()
  },
  onShareAppMessage() {

  }
})