const APP = getApp()
Page({
  data: {
    ali: {},
    wx: {},
    hidden: true,
    nocancel: false,
    account: '',
    name: '',
  },
  onLoad(options) {
    this.getData()
  },
  // 获得绑定的第三方账户
  getData() {
    APP.ajax({
      url: APP.api.userThirdAcc,
    }).then(res => {
      let ali = res.data.find(item => {
        return item.client_type == 'applet' && item.type == 'ali'
      })
      let wx = res.data.find(item => {
        return item.type == 'wechat'
      })
      this.setData({
        ali: ali,
        wx: wx || {}
      })
    }).catch(err => {
      console.warn(err)
    })
  },
  accountInput(e) {
    this.setData({
      account: e.detail.value
    })
  },
  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 打开模态框
  bindAliAccunt() {
    this.setData({
      hidden: false
    })
  },
  cancel() {
    this.setData({
      hidden: true,
      account: '',
      name: '',
    })
  },
  // 绑定支付宝
  confirm() {
    this.setData({
      hidden: true
    })
    wx.showLoading({
      title: '提交中...',
    })
    APP.ajax({
      url: APP.api.userThirdUpdate,
      data: {
        type: 'ali',
        account: this.data.account,
        name: this.data.name,
      },
    }).then(res => {
      this.setData({
        account: '',
        name: '',
      })
      wx.hideLoading()
      APP.util.toast(res.msg)
      this.getData()
    }).catch(err => {
      console.warn(err)
    })
  },
  bindWeiChartAccunt() {
    wx.showLoading({
      title: '正在绑定...'
    })
    wx.login({
      success: res => {
        APP.ajax({
          url: APP.api.getSessionCode,
          data: {
            code: res.code
          },
        }).then(res => {
          APP.ajax({
            url: APP.api.userThirdUpdate,
            data: {
              type: 'wechat',
              account: res.data.openid,
              name: 'openid',
            },
          }).then(res => {
            wx.hideLoading()
            APP.util.toast(res.msg)
            this.getData()
          }).catch(err => {
            wx.hideLoading()
          })
        }).catch(err => {
          wx.hideLoading()
        })
      }
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    this.getData()
  },
})