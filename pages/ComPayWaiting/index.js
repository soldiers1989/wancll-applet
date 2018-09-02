const APP = getApp();
import {
  payType
} from '../../api/config.js';
Page({
  data: {
    payType: '',
    isPay: 0,
  },
  onLoad(options) {
    let that = this;
    this.setData({
      payType: options.payType,
      type: options.type,
      id: options.id
    });
    let interverInt = setInterval(() => {
      APP.ajax({
        url: APP.api.orderIsPay,
        data: {
          order_no: options.orderNo
        },
        success(res) {
          if (res.data.is_pay == 1) {
            that.setData({
              isPay: 1
            });
            clearInterval(interverInt);
          }
        }
      })
    }, 3000)
  },
  goOtherPage(e) {
    if (this.data.payType == payType.goodsOrderPay) {
      if (this.data.type == 1) {
        wx.redirectTo({
          url: '/pages/UserOrderList/index',
        })
      } else if (this.data.type == 3) {
        wx.redirectTo({
          url: '/pages/UserGroupOrderList/index',
        })
      }
    } else if (this.data.payType == payType.rechargeOrderPay) {
      wx.redirectTo({
        url: '/pages/UserWallet/index',
      })
    }
  },
  onShareAppMessage() {

  }
})