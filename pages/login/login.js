const APP = getApp();
Page({
  data: {
    logo: APP.imgs.logo,
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
    APP.ajax({
      url: APP.api.loginUser,
      data:{
        mobile: this.data.mobile,
        password: this.data.password,
      },
      success(res){
        wx.showToast({
          title: '登录成功',
          icon: 'none',
        })
        // 存储到local
        new Promise((resolve,reject)=>{
          APP.globalData.hasLogin = true
          APP.globalData.token = res.data.token.token
          APP.globalData.user = res.data.user
          wx.setStorage({
            key: "token",
            data: res.data.token
          })
          wx.setStorage({
            key: "user",
            data: res.data.user
          })
          resolve(true);
        }).then(()=>{
          // 跳转
          wx.switchTab({
            url: '/pages/user/user',
          })
        })
      }
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