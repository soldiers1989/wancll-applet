const APP = getApp();
Page({
  data: {
    type: 1,
    logo: APP.imgs.logo,
    mobile: '',
    code: '',
    status: true, //  发送成功
    countDown: 91,
    unionId: '',
    avatar: '',
    nick_name: '',
    real_openid: '',
  },
  onLoad(options) {
    this.setData({
      unionId: options.unionId,
      avatar: options.avatar,
      nick_name: options.nick_name,
      real_openid: options.real_openid,
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
  // 发送验证码请求
  sendCode() {
    if (!this.data.mobile) {
      APP.util.toast('手机号不能为空')
      return;
    }
    APP.ajax({
      url: APP.api.userSettingCode,
      data: {
        mobile: this.data.mobile,
        type: 2
      },
    }).then(res => {
      APP.util.toast(res.msg)
      this.setData({
        status: false
      }, () => {
        this.countDown()
      })
    }).catch(err => {})
  },
  // 确认
  sendData() {
    if (!this.data.mobile) {
      APP.util.toast('手机号不能为空')
      return;
    }
    if (!this.data.code) {
      APP.util.toast('验证码不能为空')
      return;
    }
    let data = {
      mobile: this.data.mobile,
      code: this.data.code,
      openid: this.data.unionId,
      openid_type: 'wechat',
      avatar: this.data.avatar,
      nick_name: decodeURIComponent(this.data.nick_name),
      real_openid: this.data.real_openid
    };
    APP.ajax({
      url: APP.api.bindMobileInNoLogin,
      data: data,
    }).then(res => {
      APP.util.toast(res.msg)
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/ComLogin/index',
        })
      }, 500)
    }).catch(err => {})
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