const app = getApp();
Page({
  data: {
    logo: 'http://wancllshop.wx.wygoo.com/public/static/wap/images/wap_logo.png',
    mobile: '',
    password: ''
  },
  onLoad: function (options) {

  },
  // 手机号码监听
  bindMobileInput(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  // 密码监听
  bindPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 登陆监听
  login() {
    if (!this.data.mobile) {
      wx.showToast({
        title: '请填写手机号码',
        icon: 'none',
      })
      return;
    }
    if (!this.data.password) {
      wx.showToast({
        title: '请填写密码',
        icon: 'none',
      })
      return;
    }
    app.httpRequest('api_users/user_accounts/login', {
      mobile: this.data.mobile,
      password: this.data.password,
    }, (resp) => {
      console.log(resp)
    });
  },
  // 微信登陆监听
  wechatLogin() {
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
        }
      }
    })
  }
})