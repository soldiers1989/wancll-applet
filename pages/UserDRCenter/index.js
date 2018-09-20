const APP = getApp()
Page({
  data: {
    bgImg: APP.imgs.DRcenter,
    user: {},
    drpData: {},
  },
  goSubPage(e) {
    let target = APP.util.getDataSet(e, 'target')
    wx.navigateTo({
      url: `/pages/UserDRCenter${target}/index`,
    })
  },
  onShow() {
    this.setData({
        user: wx.getStorageSync('user')
    })
    this.getData()
  },
  getData(){
    APP.ajax({
      url: APP.api.drpCenter,
    }).then(res => {
      res.data.can_drawcash_money = Number(res.data.can_drawcash_money).toFixed(2)
      this.setData({
        drpData: res.data,
      })
    }).catch(err => { console.warn(err) })
  },
  onPullDownRefresh() {
    this.getData()
    wx.stopPullDownRefresh()
  },
  onShareAppMessage() {

  }
})