const APP = getApp()
import {
  handleWechatPay,
  queryOrderIsPay,
} from '../../utils/common.js'
Page({
  data: {
    money: '',
    loading: false,
  },
  onLoad(options) {},
  moneyInput(e) {
    this.setData({
      money: e.detail.value
    })
  },
  payMoney() {
    if (!this.data.money) {
      APP.util.toast('请填写正确的金额')
    } else {
      this.setData({
        loading: true,
      })
      APP.ajax({
        url: APP.api.recharge,
        data: {
          money: this.data.money,
          asset_type: 'money',
          type: 1
        },
      }).then(res => {
        handleWechatPay(res.data.order_no).then(() => {
          queryOrderIsPay(res.data.order_no).then(() => {
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1,
              })
            }, 500)
          }).catch(err=>{
            this.setData({
              loading: false,
            })
            console.log(err)
          })
        }).catch(err => {
          this.setData({
            loading: false,
          })
          console.log(err)
        })
      }).catch(err => {
        this.setData({
          loading: false,
        })
        console.log(err)
      })
    }
  },
  onShareAppMessage() {}
})