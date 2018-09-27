const APP = getApp();
import {
  handleWechatPay,
  queryOrderIsPay,
  queryIsSetPayPassword,
} from '../../utils/common.js'
Page({
  data: {
    showPopup: false,
    orderNo: '',
    orderMoney: '',
    password: "",
    payType: '1',
    loading: false,
  },
  onLoad(options) {
    this.setData({
      orderNo: options.orderNo,
      orderMoney: options.orderMoney
    })
  },
  // 数据绑定
  passwordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 切换弹出层隐显
  togglePopup() {
    this.setData({
      showPopup: !this.data.showPopup
    });
  },
  // 选择
  handleSelectChange(e) {
    this.setData({
      payType: APP.util.getDataSet(e, 'paytype'),
    })
  },
  // 支付
  payMoney() {
    let that = this;
    if (this.data.payType == 1) {
      // 余额支付
      queryIsSetPayPassword().then(() => {
        this.togglePopup()
      }).catch(err => {
        console.warn(err)
      })
    } else if (this.data.payType == 2) {
      this.setData({
        loading: true,
      })
      // 微信支付
      handleWechatPay(this.data.orderNo).then(() => {
        queryOrderIsPay(this.data.orderNo).then(() => {
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/UserOrderList/index',
            })
          }, 800)
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
  sendMoney() {
    if (!this.data.password) {
      APP.util.toast('请填写支付密码')
      return;
    }
    this.setData({
      loading: true,
      showPopup: false,
    })
    APP.ajax({
      url: APP.api.orderMoney,
      data: {
        order_no: this.data.orderNo,
        pay_password: this.data.password
      },
    }).then(res => {
      APP.util.toast(res.msg)
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/UserOrderList/index',
        })
      }, 800)
    }).catch(err => {
      this.setData({
        loading: false,
        password: '',
      })
    })
  },
  onShareAppMessage() {}
})