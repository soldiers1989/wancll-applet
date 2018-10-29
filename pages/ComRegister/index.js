const APP = getApp()
Page({
  data: {
    type: 1,
    logo: '',
    parentMobile: '',
    mobile: '',
    code: '',
    password: '',
    rePassword: '',
    time: 90,
    timeMsg: '发送验证码',
    // 微信登录相关
    unionId: '',
    avatar: '',
    nick_name: '',
    real_openid: '',
    ischecked: false, // 是否勾选
    is_open_bonus: '', // 是否开启分红
    is_open_drp: '', // 是否开启分销
  },
  onLoad(options) {
    options.unionId && this.setData({
      unionId: options.unionId,
      avatar: options.avatar,
      nick_name: options.nick_name,
      real_openid: options.real_openid,
    })
    APP.ajax({
      url: APP.api.systemInfo,
    }).then(resp => {
      this.setData({
        is_open_bonus: resp.data.is_open_bonus,
        is_open_drp: resp.data.is_open_drp,
      })
    }).catch(err => {})
  },
  onShow() {
    APP.ajax({
      url: APP.api.systemParams,
      data: {
        type: 'basic'
      }
    }).then(res => {
      this.setData({
        logo: res.data.wap_login_logo || APP.imgs.logo
      })
    }).catch(err => { })
  },
  parentMobileInput(e) {
    this.setData({
      parentMobile: e.detail.value
    })
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
  // 跳转到文章详情页面
  goArticle(e) {
    let id = APP.util.getDataSet(e, 'id')
    let paramStr = APP.util.paramStringify({
      'id': id,
      'type': 'rule'
    })
    wx.navigateTo({
      url: `/pages/ComArticle/index?${paramStr}`,
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
          'type': 1,
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
  // 同意条款
  checkedInput() {
    this.setData({
      ischecked: !this.data.ischecked
    })
  },
  // 确认
  register() {
    if (this.data.parentMobile && !APP.validator.mobile(this.data.parentMobile)) {
      APP.util.toast('请填写正确的推荐人手机号码')
      return
    }
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
    if (!this.data.ischecked) {
      APP.util.toast('请同意条款')
      return
    }
    let data = {
      parent_mobile: this.data.parentMobile,
      mobile: this.data.mobile,
      password: this.data.password,
      code: this.data.code,
    }
    if (this.data.unionId) {
      data.wechat_openid = this.data.unionId
      data.nick_name = decodeURIComponent(this.data.nick_name)
      data.avatar = this.data.avatar
      data.real_openid = this.data.real_openid
    }
    APP.ajax({
      url: APP.api.userRegister,
      data: data,
    }).then(resp => {
      APP.util.toast(resp.msg)
      resp.data.user.avatar = resp.data.user.avatar ? resp.data.user.avatar : APP.imgs.avatar
      // 登录之后先全部存入本地
      wx.setStorageSync("token", resp.data.token)
      wx.setStorageSync("user", resp.data.user)
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/BarUser/index',
        })
      }, 500)
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