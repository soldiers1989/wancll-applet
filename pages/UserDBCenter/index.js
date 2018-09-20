const APP = getApp()
Page({
  data: {
    bgImg: APP.imgs.DRcenter,
    user: {},
    bonusData: {},
  },
  onLoad(options) {},
  goSubPage(e) {
    let target = APP.util.getDataSet(e, 'target')
    wx.navigateTo({
      url: `/pages/UserDBCenter${target}/index`,
    })
  },
  onShow() {
    this.getBonusInfo()
  },
  // 获得分红信息
  getBonusInfo(){
    let user = wx.getStorageSync('user')
    APP.ajax({
      url: APP.api.bonusCenter,
    }).then(res => {
      res.data.can_drawcash_money = Number(res.data.can_drawcash_money).toFixed(2)
      this.setData({
        bonusData: res.data,
        user: user
      })
    }).catch(err => {
      console.warn(err)
    })
  },
  onPullDownRefresh() {
    this.getBonusInfo()
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: function() {

  }
})