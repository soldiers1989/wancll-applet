const APP = getApp()
import {
  queryIsSetPayPassword,
}
from '../../utils/common.js'
Page({
  data: {
    bonusData: {},
    bonusInfo: {},
    payType: '',
    password: '',
    hidden: true,
    nocancel: false,
  },

  onLoad(options) {
    this.getData()
  },
  getData() {
    APP.ajax({
      url: APP.api.drpRules,
    }).then(res => {
      this.setData({
        bonusData: res.data,
      })
    }).catch(err => {
      console.warn(err)
    })
    APP.ajax({
      url: APP.api.drpCenter,
    }).then(res => {
      res.data.can_drawcash_money = Number(res.data.can_drawcash_money).toFixed(2)
      this.setData({
        bonusInfo: res.data,
      })
    }).catch(err => {
      console.warn(err)
    })
  },
  // 密码输入
  passwordInput(e) {
    this.setData({
      inputData: e.detail.value
    });
  },
  // 取消
  cancel() {
    this.setData({
      hidden: true,
      password: '',
    });
  },
  // 确认
  confirm() {
    this.setData({
      hidden: true
    });
    APP.ajax({
      url: APP.api.drpPaySave,
      data: {
        pay_password: this.data.password,
        receipt_type: this.data.payType
      },
    }).then(res => {
      APP.util.toast(res.msg)
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 500)
    }).catch(err => {
      this.setData({
        password: '',
      });
    })
  },
  payWallet() {
    queryIsSetPayPassword().then(() => {
      this.setData({
        payType: 'money',
        hidden: false,
      })
    }).catch((err => {}))
  },
  payWx() {
    queryIsSetPayPassword().then(() => {
      this.setData({
        payType: 'wechat',
        hidden: false,
      })
    }).catch((err => {}))
  },
  payAli() {
    queryIsSetPayPassword().then(() => {
      this.setData({
        payType: 'ali',
        hidden: false,
      })
    }).catch((err => {}))
  },
})