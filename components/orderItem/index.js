// components/orderItem/index.js
const APP = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      description: '数据列表'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // ----------------- 待付款
    // 取消订单
    cancelOrder(e) {
      let id = this.data.data.id;
      let _this = this;
      let itemList = ['不想买了', '信息填写错误，重新下单', '商家缺货', '其他原因']
      wx.showActionSheet({
        itemList: itemList,
        success(res) {
          APP.ajax({
            url: APP.api.orderCancel,
            header: { token: APP.globalData.token },
            data: {
              order_id: id,
              cancel_reason: itemList[res.tapIndex]
            },
            success(res) {
              wx.showToast({
                title: res.msg,
                icon: 'none',
              })
              _this.triggerEvent('cancelOrder')
            }
          })
        }
      })
    },
    // 预支付
    payOrder(e) {
      let id = this.data.data.id;
      let num = this.data.data.order_no;
      let money = this.data.data.total_money;
      APP.ajax({
        url: APP.api.orderPrePay,
        header: { token: APP.globalData.token },
        data: { order_id: id },
        success(res) {
          if (res.code == 1) {
            // 前往支付页面
            wx.navigateTo({
              url: `/pages/userSubPage/pay/pay?num=${num}&money=${money}`,
            })
          }
        }
      })
    },
    // ----------------- 待发货
    // 提醒发货
    tipOrder(e) {
      let id = this.data.data.id;
      APP.ajax({
        url: APP.api.orderTip,
        header: { token: APP.globalData.token },
        data: { order_id: id },
        success(res) {
          wx.showToast({
            title: res.msg,
            icon: 'none',
          })
        }
      })
    },
    // 进入退款
    refundOrder() {
      let that = this
      let params = APP.utils.paramsJoin({
        num: that.data.data.order_no,
        money: that.data.data.total_money,
        id: that.data.data.id
      })
      wx.navigateTo({
        url: `/pages/userSubPage/refound/refound?${params}`,
      })
    }

  },
  attached() {
  }
})
