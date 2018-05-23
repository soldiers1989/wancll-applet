const APP = getApp();
export function getData(that) {
  APP.ajax({
    url: APP.api.myBankCard,
    header: {
      'page-limit': 10,
      'page-num': that.data.pageNum
    },
    success(res) {
      that.setData({
        cards: that.data.cards.concat(res.data),
        pageNum: ++that.data.pageNum,
      })
    }
  })
}

export function submit(that) {
  APP.ajax({
    url: APP.api.withdraw,
    data: {
      asset_type: 'money',
      type: 'withdrawToBankCard',
      money: that.data.money,
      bank_card_id: that.data.card.id,
      pay_password: that.data.pass
    },
    success(res) {
      wx.showToast({
        title: res.msg,
        type: 'none'
      })
      that.togglePassPopup();
    }
  })
}