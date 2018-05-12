// components/orderItem/index.js
const APP = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:{
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
    // 取消订单
    cancelOrder(e){
      let id = APP.getDataSet(e,'id');
      let _this=this;
      let itemList = ['不想买了', '信息填写错误，重新下单', '商家缺货', '其他原因']
      wx.showActionSheet({
        itemList: itemList,
        success(res){
          APP.ajax({
            url: APP.api.orderCancel,
            header:{ token:APP.globalData.token },
            data:{
              order_id: id, 
              cancel_reason: itemList[res.tapIndex]
            },
            success(res){
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
    // 提醒发货
    tipOrder(e){
      let id = APP.getDataSet(e, 'id');
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
    // 确认付款
    payOrder(e){
      let id = APP.getDataSet(e, 'id');
      wx.showToast({
        title: 'sss',
        icon: 'none',
      })
    }
  },
  attached(){
  }
})
