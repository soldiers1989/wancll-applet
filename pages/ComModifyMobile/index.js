const APP = getApp();
Page({
  data: {
    logo: APP.imgs.logo,
    mobile: '',
    code: '',
    time: 90,
    timeMsg: '发送验证码',
  },
  onLoad(options) {},
  mobileInput(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  codeInput(e) {
    this.setData({
      code: e.detail.value
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
  submit() {
    if (!APP.validator.mobile(this.data.mobile)) {
      APP.util.toast('请填写正确的手机号码')
      return
    }
    if (!this.data.code) {
      APP.util.toast('请填写验证码')
      return
    }
    let data = {
      old_mobile: wx.getStorageSync('user').mobile,
      new_mobile: this.data.mobile,
      new_code: this.data.code
    };
    APP.ajax({
      url: APP.api.userMobileModify,
      data: data,
    }).then(resp => {
      APP.util.toast(resp.msg)
      wx.removeStorageSync('token');
      wx.removeStorageSync('user');
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/BarHome/index'
        })
      }, 1000);
    }).catch(err => {})
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