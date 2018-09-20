import {
  getBankCardList,
  submit
} from './data.js'
import {
  queryIsSetPayPassword,
} from '../../utils/common.js'
const APP = getApp()
Page({
  data: {
    money: '',
    card: {
      bank_name: '',
      card_number: ''
    },
    list: [],
    page: 1,
    haveNoData: false,
    noContentImg: APP.imgs.noContentImg,
    popupShow: false,
    passwordPopup: false,
    password: ''
  },
  onLoad(options) {
    getBankCardList(this)
  },
  // 选择银行卡
  selectCard(e) {
    let card = APP.util.getDataSet(e, 'card')
    this.setData({
      card: card,
    })
    this.togglePopupShow()
  },
  // 金额输入
  moneyInput(e) {
    this.setData({
      money: e.detail.value,
    })
  },
  // 切换银行卡弹出层
  togglePopupShow(e) {
    this.setData({
      popupShow: !this.data.popupShow,
    })
  },
  addBank() {
    wx.navigateTo({
      url: `/pages/UserCardEidt/index?id=new`,
    })
  },
  // 提交
  submit() {
    if (!this.data.money) {
      APP.util.toast('请输入提现金额')
      return
    }
    if (!this.data.card.id) {
      APP.util.toast('请选择收款银行卡')
      return
    }
    queryIsSetPayPassword().then(() => {
      this.togglePasswordPopup()
    }).catch(err => {
      console.warn(err)
    })
  },
  sendMoney() {
    this.setData({
      passwordPopup: false,
    })
    submit(this)
  },
  passwordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 切换弹出层隐显
  togglePasswordPopup() {
    this.setData({
      passwordPopup: !this.data.passwordPopup
    })
  },
  onShareAppMessage() {

  }
})