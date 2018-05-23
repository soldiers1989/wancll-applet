import { getData, submit } from './withdrawData.js';
const APP = getApp();
Page({
  data: {
    money: '',
    card: {
      bank_name: '',
      card_number: ''
    },
    cards: [],
    pageNum: 1,
    popupShow: false,
    passPopup: false,
    pass: ''
  },
  onLoad(options) {
    getData(this);
  },
  // 选择银行卡
  selectCard(e) {
    this.setData({
      card: e.currentTarget.dataset.card,
      popupShow: !this.data.popupShow
    })
  },
  // 金额输入
  bindMoney(e) {
    this.setData({
      money: e.detail.value,
    })
  },
  // 切换银行卡弹出层
  togglePopupShow() {
    this.setData({
      popupShow: !this.data.popupShow,
    })
  },
  addBank(){
    wx.navigateTo({
      url: `/pages/userSubPage/cardEdit/cardEdit?id=new`,
    })
  },
  // 提交
  submit() {
    let that = this;
    if (!this.data.money || !this.data.card.id) {
      return;
    }
    APP.ajax({
      url: APP.api.orderPassword,
      success(res) {
        if (res.data.is_set_pay_password == 1) {
          that.togglePassPopup()
        } else {
          wx.showToast({
            title: '请设置支付密码',
            icon: 'none',
          })
          setTimeout(() => {
            wx.navigateTo({
              url: `/pages/userSubPage/settingPassword/settingPassword?id=1`,
            })
          }, 500)
        }
      }
    })
  },
  sendMoney() {
    submit(this)
  },
  passwordInput(e) {
    this.setData({
      pass: e.detail.value
    })
  },
  // 切换弹出层隐显
  togglePassPopup() {
    this.setData({
      passPopup: !this.data.passPopup
    });
  },
  onPullDownRefresh() {

  },
  onReachBottom() {

  },
  onShareAppMessage() {

  }
})