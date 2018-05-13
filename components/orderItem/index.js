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
    cancelOrder() {
      let id = this.data.data.id;
      let that = this;
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
              that.triggerEvent('refreshGet')
            }
          })
        }
      })
    },
    // 预支付
    payOrder() {
      let id = this.data.data.id;
      APP.ajax({
        url: APP.api.orderPrePay,
        header: { token: APP.globalData.token },
        data: { order_id: id },
        success(res) {
          if (res.code == 1) {
            // 前往支付页面
            wx.navigateTo({
              url: `/pages/userSubPage/pay/pay?id=${id}`,
            })
          }
        }
      })
    },
    // ----------------- 待发货
    // 提醒发货
    tipOrder() {
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
      let id = this.data.data.id;      
      wx.navigateTo({
        url: `/pages/userSubPage/refound/refound?id=${id}`,
      })
    },
    // ----------------- 待收货
    // 确认收货
    userSing(){
      let id = this.data.data.id;
      let that = this;
      wx.showModal({
        title: '提示',
        content: '确定货物已经收到，再点击确定收货按钮，',
        success: function (res) {
          if (res.confirm) {
            APP.ajax({
              url: APP.api.orderUserSing,
              header: { token: APP.globalData.token },
              data: { order_id: id },
              success(res) {
                wx.showToast({
                  title: res.msg,
                  icon: 'none',
                })
                that.triggerEvent('refreshGet')
              }
            })
          }
        }
      })
    },
    // 查看物流
    goExpress(){
      let id = this.data.data.id
      wx.navigateTo({
        url: `/pages/userSubPage/express/express?id=${id}`,
      })
    }

  },
  attached() {
  }
})
