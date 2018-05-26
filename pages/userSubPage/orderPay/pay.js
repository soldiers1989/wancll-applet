const APP = getApp();
import { handleWechatPay } from '../../../utils/common.js';
import { payType } from '../../../api/config.js';
Page({
  data: {
    showPopup: false,
    orderNo: '',
    orderMoney: '',
    password: "",
    items: [{
      padding: 0,
      value: '1',
      name: '余额支付',
    },
    {
      padding: 0,
      value: '2',
      name: '微信支付',
    },
    ],
    checked: {
      base: -1,
      color: 1,
      form: -1
    },
    activeColor: '#358cff'
  },
  onLoad: function (options) {
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
    let type = APP.utils.getDataSet(e, 'type');
    let value = e.detail.value;
    this.setData({
      [`checked.${type}`]: value
    });
  },
  // 支付
  payMoney() {
    let that = this;
    if (this.data.checked.color == 1) {
      APP.ajax({
        url: APP.api.orderPassword,
        success(res) {
          if (res.data.is_set_pay_password == 1) {
            that.togglePopup()
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
    } else if (this.data.checked.color == 2) {
      handleWechatPay(that.data.orderNo, payType.goodsOrderPay);
    }
  },
  sendMoney() {
    if (!this.data.password) {
      wx.showToast({
        title: '请填写密码',
        icon: 'none',
      })
      return;
    }
    let that = this
    APP.ajax({
      url: APP.api.orderMoney,
      data: {
        order_no: that.data.orderNo,
        pay_password: that.data.password
      },
      success(res) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          success() {
            let params = APP.utils.paramsJoin({
              // target: wx.getStorageSync('thisOrderList')
              target: 2
            })
            setTimeout(() => {
              wx.redirectTo({
                url: `/pages/userSubPage/order/order?${params}`,
              })
            }, 1000)
          }
        })
      }
    })
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})