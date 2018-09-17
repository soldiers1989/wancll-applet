const APP = getApp();
Page({
  data: {
    'type': 1,
    logo: APP.imgs.logo,
    mobile: '',
    code: 0,
    password: '',
    rePassword: '',
    time: 90,
    timeMsg: '发送验证码',
    hasLogin: false,
  },
  onLoad(options) {
    // 1代表的登录密码  2代表的是支付密码
    let type = options.type || 1
    if (type == 1) {
      wx.setNavigationBarTitle({
        title: '设置登录密码',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '设置支付密码',
      })
    }
    let user = wx.getStorageSync('user');
    if (user) {
      this.setData({
        mobile: user.mobile,
        type: type,
        hasLogin: true
      })
    } else {
      this.setData({
        type: type,
      })
    }
  },
  // 手机号码输入
  mobileInput(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  // 验证码输入
  codeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },
  // 密码输入
  passwordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 重复密码输入
  rePasswordInput(e) {
    this.setData({
      rePassword: e.detail.value
    })
  },
  // 发送验证码请求
  sendCode() {
    if (!APP.validator.mobile(this.data.mobile)) {
      APP.util.toast('请输入正确的手机号')
      return
    }
    if (this.data.time == 90) {
      this.setData({
        time: 89
      })
      wx.showLoading({
        title: '请稍后',
      })
      APP.ajax({
        url: APP.api.getCode,
        data: {
          'mobile': this.data.mobile,
          'type': 2,
        },
      }).then(resp => {
        wx.hideLoading()
        APP.util.toast(resp.msg)
        this.countDown()
      }).catch(err => {
        wx.hideLoading()
        this.setData({
          time: 90
        })
      })
    }
  },
  // 确认
  submit() {
    if (!APP.validator.mobile(this.data.mobile)) {
      APP.util.toast('请填写正确的手机号码')
      return
    }
    if (!this.data.code) {
      APP.util.toast('请填写验证码')
      return
    }
    if (!APP.validator.password(this.data.password)) {
      APP.util.toast('请填写6位不包含特殊字符的密码')
      return
    }
    if (this.data.rePassword != this.data.password) {
      APP.util.toast('两次填写密码不一致')
      this.setData({
        rePassword: '',
        password: ''
      })
      return
    }
    let url = this.data.type == 1 ? APP.api.userSettingPass : APP.api.userSettingPayPass;
    let data = {
      mobile: this.data.mobile,
      code: this.data.code
    };
    if (this.data.type == 1) {
      data.password = this.data.password;
      data.password_confirm = this.data.rePassword;
    } else {
      data.pay_password = this.data.password;
      data.pay_password_confirm = this.data.rePassword;
    }
    APP.ajax({
      url: url,
      data: data,
    }).then(resp => {
      APP.util.toast(resp.msg)
      if (this.data.type == 1) {
        wx.removeStorageSync('token');
        wx.removeStorageSync('user');
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/BarHome/index'
          })
        }, 1000);
      } else {
        setTimeout(() => {
          wx.navigateBack()
        }, 1000)
      }
    }).catch(err => {})
  },
  // 发送验证码请求
  sendCode() {
    if (!APP.validator.mobile(this.data.mobile)) {
      APP.util.toast('请输入正确的手机号')
      return
    }
    if (this.data.time == 90) {
      this.setData({
        time: 89
      })
      wx.showLoading({
        title: '请稍后',
      })
      APP.ajax({
        url: APP.api.getCode,
        data: {
          'mobile': this.data.mobile,
          'type': 2,
        },
      }).then(resp => {
        wx.hideLoading()
        APP.util.toast(resp.msg)
        this.countDown()
      }).catch(err => {
        wx.hideLoading()
        this.setData({
          time: 90
        })
      })
    }
  },
  // 倒计时
  countDown() {
    let time = this.data.time;
    if (time > 0) {
      this.setData({
        time: time - 1,
        timeMsg: `已发送${time}`
      })
      setTimeout(() => {
        this.countDown()
      }, 1000)
    } else {
      this.setData({
        time: 90,
        timeMsg: '发送验证码'
      })
    }
  }
})