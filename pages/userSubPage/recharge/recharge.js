const APP = getApp();
Page({
  data: {
    money: ''
  },
  onLoad(options) {

  },
  bindMoney(e) {
    this.setData({
      money: e.detail.value
    })
  },
  payMoney() {
    if (!this.data.money) {
      wx.showToast({
        title: '请填写正确的金额',
        icon: 'none',
      })
    } else {
      APP.ajax({
        url: APP.api.recharge,
        data: {
          money: this.data.money,
          asset_type: 'money',
          type: 1
        },
        success(res) {
          // 微信支付
        }
      })
    }
  },
  onShareAppMessage() {

  }
})