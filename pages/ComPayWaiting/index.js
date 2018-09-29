const APP = getApp();
import {
  payType
} from '../../api/config.js';
Page({
  data: {
    payType: '',
    isPay: 0,
    type: 0, // 订单类型（普通，积分，团购）
    id: -1, // 订单id  
    isShowShare: false, // 是否显示分享弹窗
    shareImg: '',
    user: {},
  },
  onLoad(options) {
    let that = this;
    let payOrderInfo = wx.getStorageSync('payOrderInfo');
    this.setData({
      user: wx.getStorageSync('user'),
      payType: options.payType,
      type: payOrderInfo ? payOrderInfo.type : 0,
      id: payOrderInfo ? payOrderInfo.id : -1,
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
              isPay: 1,
            });
            if (this.data.payType == 'goodsOrderPay') {
              this.setData({
                isShowShare: true,
              });
            }
            clearInterval(interverInt);
          }
        }
      })
    }, 3000);

    // 请求分享封面图
    APP.ajax({
      url: APP.api.indexBackground,
      data: {
        position: 'share'
      },
      success: res => {
        this.setData({
          shareImg: res.data[0].img
        });
      },
    });
  },
  // 关闭弹窗
  closePacket() {
    this.setData({
      isShowShare: false
    });
  },
  goHome() {
    wx.switchTab({
      url: '/pages/BarHome/index',
    })
  },
  goOtherPage(e) {
    if (this.data.payType == payType.goodsOrderPay) {
      let route = '';
      if (this.data.type == 1) {
        route = 'UserOrderDetail';
      } else if (this.data.type == 3) {
        route = 'UserGroupOrderDetail';
      }
      wx.navigateTo({
        url: '/pages/' + route + '/index?id=' + this.data.id,
      })
    } else if (this.data.payType == payType.rechargeOrderPay) {
      wx.redirectTo({
        url: '/pages/UserWallet/index',
      })
    } else if (this.data.payType == payType.buyMember) {
      wx.switchTab({
        url: '/pages/BarUser/index',
      })
    }
  },
  onShareAppMessage() {
    // 分享首页
    let path = `/pages/BarHome/index`;
    if (this.data.user) {
      path += '?parent_mobile=' + this.data.user.mobile;
    }
    return {
      title: '爱买优品：坚持经营高性价比产品，爱买优选任你挑～',
      path: path,
      imageUrl: this.data.shareImg
    }
  }
})