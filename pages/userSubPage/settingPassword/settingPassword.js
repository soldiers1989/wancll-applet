const APP = getApp();
const TITLE = ['登录密码修改', '支付密码修改'];
Page({
  data: {
    type: 1,
    logo: APP.imgs.logo,
    userMobile: '',
    code: 0,
    password: '',
    rpassword: '',
    status: true, //  发送成功？
    countDown: 91
  },
  onLoad: function (options) {
    let type = options.id == 1 ? 1 : 2;
    let user = wx.getStorageSync('user');
    wx.setNavigationBarTitle({
      title: TITLE[options.id]
    })
    this.setData({
      userMobile: user.mobile,
      type: type
    })
  },
  bindCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  bindPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  bindRPassword(e) {
    this.setData({
      rpassword: e.detail.value
    })
  },
  sendCode() {
    APP.ajax({
      url: APP.api.userSettingCode,
      data: {
        mobile: this.data.userMobile,
        type: this.data.type
      },
      success: res => {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
        this.setData({
          status: false
        }, () => {
          this.countDown()
        })
      }
    })
  },
  sendData() {
    if (!this.data.code) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })
      return;
    }
    if (!this.data.password) {
      wx.showToast({
        title: '',
        icon: 'none'
      })
      return;
    }
    if (!APP.validator.valiPassword(!this.data.password)) {
      wx.showToast({
        title: '密码限制6-20位大小写字母数字组合',
        icon: 'none'
      })
      return;
    }
    if (!this.data.rpassword) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })
      return;
    }
    if (!APP.validator.valiPassword(!this.data.rpassword)) {
      wx.showToast({
        title: '密码限制6-20位大小写字母数字组合',
        icon: 'none'
      })
      return;
    }
    if (this.data.rpassword != this.data.password) {
      wx.showToast({
        title: '两次密码不一样',
        icon: 'none'
      })
      this.setData({
        rpassword: '',
        password: ''
      })
      return;
    }
    let url = this.data.type == 1 ? APP.api.userSettingPass : APP.api.userSettingPayPass
    APP.ajax({
      url: url,
      data: {
        mobile: this.data.userMobile,
        code: this.data.code,
      },
      success: res => {
        if(this.data.type == 1){
          wx.removeStorageSync('token')
          wx.removeStorageSync('user')
          wx.reLaunch({
            url:`/pages/login/login`
          })
        }
      }
    })
  },
  // 倒计时
  countDown() {
    let that = this

    function settime() {
      let countdown = that.data.countDown;
      if (countdown == 0) {
        that.setData({
          countDown: 91,
          status: true
        })
        return;
      } else {
        that.setData({
          countDown: --countdown
        })
      }
      setTimeout(() => {
        settime()
      }, 1000)
    }
    settime();
  }
})