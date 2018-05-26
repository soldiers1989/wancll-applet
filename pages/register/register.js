const APP = getApp();
Page({
  data: {
    type: 1,
    logo: APP.imgs.logo,
    mobile: '',
    code: '',
    password: '',
    rpassword: '',
    status: true, //  发送成功？
    countDown: 91,
    unionId: '',
  },
  onLoad(options) {
    options.unionId && this.setData({
      unionId: options.unionId
    })
  },
  // 手机号码输入
  bindMobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  // 验证码输入
  bindCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  // 密码输入
  bindPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 重复密码输入
  bindRPassword(e) {
    this.setData({
      rpassword: e.detail.value
    })
  },
  // 发送验证码请求
  sendCode() {
    if (!this.data.mobile) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return;
    }
    APP.ajax({
      url: APP.api.userSettingCode,
      data: {
        mobile: this.data.mobile,
        type: 1
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
  // 确认
  sendData() {
    if (!this.data.mobile) {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none'
      })
      return;
    }
    if (!this.data.code) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })
      return;
    }
    if (!this.data.password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return;
    }
    if (!APP.validator.valiPassword(this.data.password)) {
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
    let data = {
      mobile: this.data.mobile,
      password: this.data.password,
      code: this.data.code,
    };
    if (this.data.unionId) {
      data.wechat_openid = this.data.unionId
    }
    APP.ajax({
      url: APP.api.userRegister,
      data: data,
      success: res => {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        res.data.user.avatar = res.data.user.avatar ? res.data.user.avatar : APP.imgs.avatar;
        // 登录之后先全部存入本地
        wx.setStorageSync("token", res.data.token)
        wx.setStorageSync("user", res.data.user)
        // 然后再存入全局变量中
        APP.globalData.hasLogin = true
        APP.globalData.token = res.data.token.token
        APP.globalData.user = res.data.user

        wx.switchTab({
          url: '/pages/user/user',
        })
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