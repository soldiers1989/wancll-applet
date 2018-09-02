const APP = getApp();
import {
  handleWechatPay
} from '../../utils/common.js';
import {
  payType
} from '../../api/config.js';
Page({
  data: {
    showPopup: false,
    orderNo: '',
    orderMoney: '',
    password: "",
    payType: '1',
    orderId: -1,
  },
  onLoad: function(options) {
    this.setData({
      money: options.money,
    })
  },
  // 选择
  handleSelectChange(e) {
    this.setData({
      payType: e.currentTarget.dataset.paytype
    })
  },
  // 支付
  payMoney() {
    APP.ajax({
      url: APP.api.buyMemberSave,
      data: {
        money: this.data.money
      },
      success: res => {
        handleWechatPay(res.data.order_no, 'buyMember');
      }
    });
  },
})