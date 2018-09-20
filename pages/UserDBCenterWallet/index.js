const APP = getApp()

Page({
  data: {
    bgImg: APP.imgs.DRcenter,
    bonusData: {},
  },
  onLoad(options) {
    this.getData()
  },
  getData(){
    APP.ajax({
      url: APP.api.bonusCenter,
    }).then(res => {
      res.data.can_drawcash_money = Number(res.data.can_drawcash_money).toFixed(2)
      this.setData({
        bonusData: res.data,
      })
    }).catch(err => {
      console.warn(err)
    })
  },
  onPullDownRefresh(){
    this.getData()
    wx.stopPullDownRefresh()
  }
})