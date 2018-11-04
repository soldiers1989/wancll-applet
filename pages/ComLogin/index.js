const APP = getApp()
import {
  handleWechatLogin,
} from '../../utils/common.js'
Page({
  data: {
    logo: '',
    mobile: '',
    password: ''
  },
  onLoad(options) {},
  // 手机号码监听
  mobileInput(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  clickImg(){
    wx.reLaunch({
      url: '/pages/BarHome/index',
    })
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
    }).catch(err => {})
  },
  // 密码监听
  passwordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 登陆监听
  login() {
    if (!APP.validator.mobile(this.data.mobile)) {
      APP.util.toast('请填写正确的手机号码')
      return
    }
    if (!APP.validator.password(this.data.password)) {
      APP.util.toast('请填写6位不包含特殊字符的密码')
      return
    }
    // 登录逻辑
    APP.ajax({
      url: APP.api.userLogin,
      data: {
        mobile: this.data.mobile,
        password: this.data.password,
      },
    }).then(resp => {
      APP.util.toast(resp.msg)
      resp.data.user.avatar = resp.data.user.avatar ? resp.data.user.avatar : APP.imgs.avatar
      // 登录之后先全部存入本地
      wx.setStorageSync("token", resp.data.token)
      wx.setStorageSync("user", resp.data.user)
      // 再跳转
      wx.switchTab({
        url: '/pages/BarUser/index',
      })
    }).catch(err => {})
  },
  register() {
    wx.navigateTo({
      url: '/pages/ComRegister/index',
    })
  },
  forgetPassword() {
    wx.navigateTo({
      url: `/pages/UserSettingPass/index?type=1`,
    })
  },
  // 微信登陆监听
  onGotUserInfo(res) {
    handleWechatLogin(this, res.detail)
  },
})