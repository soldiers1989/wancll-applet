const APP = getApp()
const banks = [
  '请选择您的开户银行',
  '中国农业银行',
  '中国建设银行',
  '中国工商银行',
  '中国银行',
  '招商银行',
  '光大银行',
  '中国邮政储蓄银行',
  '兴业银行',
  '中信银行',
  '浦发银行',
  '广发银行',
  '平安银行',
  '交通银行',
  '华夏银行',
  '民生银行',
]
Page({
  data: {
    card: {
      bank_name: '',
      card_holder: '',
      card_number: '',
    },
    index: 0,
    banks: banks,
    loading: false,
  },
  onLoad(options) {
    let that = this
    if (options.id != 'new') {
      this.getBankCard(options.id)
    }
  },
  // 获得银行卡信息
  getBankCard(id) {
    APP.ajax({
      url: APP.api.bankCardRead,
      data: {
        id: id,
      }
    }).then(res => {
      let index = banks.indexOf(res.data.bank_name)
      this.setData({
        index: index,
        card: res.data,
      })
    }).catch(err => [
      console.warn(err)
    ])
  },
  cardSelect(e) {
    this.setData({
      index: e.detail.value,
      'card.bank_name': this.data.banks[e.detail.value],
    })
  },
  nameInput(e) {
    this.setData({
      'card.card_holder': e.detail.value
    })
  },
  cardInput(e) {
    this.setData({
      'card.card_number': e.detail.value
    })
  },
  submit() {
    if (!this.data.index) {
      APP.util.toast('请选择您的开户银行')
      return
    }
    if (!this.data.card.card_holder) {
      APP.util.toast('输入持卡人姓名')
      return
    }
    if (!APP.validator.integer(this.data.card.card_number)) {
      APP.util.toast('请输入正确的卡号')
      return
    }
    let url = ''
    if (this.data.card.id) {
      url = APP.api.bankCardUpdate
    } else {
      url = APP.api.bankCardSave
    }
    this.setData({
      loading: true,
    })
    APP.ajax({
      url: url,
      data: this.data.card,
    }).then(res => {
      APP.util.toast(res.msg)
      setTimeout(() => {
        wx.navigateBack()
      }, 1000)
    }).catch(err => {
      console.warn(err)
      this.setData({
        loading: false,
      })
    })
  },
  deleteCard() {
    let id = this.data.card.id
    wx.showModal({
      title: '提示',
      content: '确定要删除该银行卡吗？',
      success(res) {
        if (res.confirm) {
          APP.ajax({
            url: APP.api.bankCardDelete,
            data: {
              id: id,
            },
          }).then(res => {
            APP.util.toast(res.msg)
            setTimeout(() => {
              wx.navigateBack()
            }, 1000)
          }).catch(err => {
            console.warn(err)
          })
        }
      },
    })
  }
})