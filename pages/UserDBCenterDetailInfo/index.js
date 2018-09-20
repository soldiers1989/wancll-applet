const APP = getApp()
Page({
  data: {
    info: {}
  },
  onLoad(options) {
    APP.ajax({
      url: APP.api.bonusApplysRead,
      data: {
        id: options.id
      },
    }).then(res => {
      this.setData({
        info: res.data,
      })
    }).catch(err => {
      console.warn(err)
    })
  },
  onShareAppMessage() {

  }
})