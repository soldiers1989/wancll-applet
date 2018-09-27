const APP = getApp();
Component({
  properties: {
    data: {
      type: Object,
      description: '数据列表'
    },
    haveinfo: {
      type: Boolean,
      description: '是否显示价格栏位'
    },
    gotype: {
      type: String,
      description: '跳转的类型'
    }
  },
  data: {
    bindInput: '',
    hiddenmodalput: true,
    noContent: false,
    noContentImg: APP.imgs.noContentImg
  },
  methods: {
    // 进入订单详情
    goOrderDetail() {
      // console.log(this.data.data)
      if (this.data.gotype == 'orderdetail') {
        let id = this.data.data.id;
        wx.navigateTo({
          url: `/pages/UserGroupOrderDetail/index?id=${id}`
        })
      }
    },
    // 进入商品详情
    // ----------------- 待付款
    // 取消订单
    cancelOrder() {
      let id = this.data.data.id;
      let itemList = ['不想买了', '信息填写错误，重新下单', '商家缺货', '其他原因']
      wx.showActionSheet({
        itemList: itemList,
        success: (res) => {
          if (res.tapIndex == 3) {
            this.setData({
              hiddenmodalput: !this.data.hiddenmodalput,
              bindInput: ''
            })
          } else {
            this.setData({
              bindInput: itemList[res.tapIndex]
            }, () => {
              APP.ajax({
                url: APP.api.orderCancel,
                data: {
                  order_id: id,
                  cancel_reason: this.data.bindInput
                },
              }).then(res2 => {
                APP.util.toast(res2.msg)
                this.triggerEvent('refreshGet')
              }).catch(err => {})
            })
          }
        }
      })
    },
    //输入绑定
    bindInput(e) {
      this.setData({
        bindInput: e.detail.value
      });
    },
    //取消按钮  
    modalCancel() {
      this.setData({
        bindInput: '',
        hiddenmodalput: true,
      });
    },
    //确认  
    modalConfirm() {
      if (!this.data.bindInput) {
        wx.showToast({
          title: '请输入原因',
          icon: 'none',
        })
        return
      }
      this.setData({
        hiddenmodalput: true
      }, () => {
        APP.ajax({
          url: APP.api.orderCancel,
          data: {
            order_id: this.data.data.id,
            cancel_reason: this.data.bindInput
          },
        }).then(res2 => {
          APP.util.toast(res2.msg)
          this.triggerEvent('refreshGet')
        }).catch(err => {})
      })
    },
    // 预支付
    payOrder() {
      let that = this;
      APP.ajax({
        url: APP.api.orderPrePay,
        data: {
          order_id: this.data.data.id
        },
      }).then(res => {
        // 前往支付页面
        wx.navigateTo({
          url: `/pages/ComPay/index?orderNo=${that.data.data.order_no}&orderMoney=${that.data.data.total_money}`,
        })
      }).catch(err => {})
    },
    // ----------------- 待发货
    // 提醒发货
    tipOrder() {
      let id = this.data.data.id;
      APP.ajax({
        url: APP.api.orderTip,
        data: {
          order_id: id
        },
      }).then(res => {
        APP.util.toast(res.msg)
      }).catch(err => {})
    },
    // 进入退款
    refundOrder(e) {
      let refundGood = this.data.data.order_goods_info.filter(item => {
        return item.goods_id == APP.util.getDataSet(e, 'id')
      })[0]
      wx.setStorageSync('refundGoods', refundGood)
      wx.navigateTo({
        url: `/pages/UserOrderRefound/index`,
      })
    },
    // ----------------- 待收货
    // 确认收货
    userSing() {
      let id = this.data.data.id;
      let that = this;
      wx.showModal({
        title: '提示',
        content: '确定货物已经收到，再点击确定收货按钮，',
        success: function(res) {
          if (res.confirm) {
            APP.ajax({
              url: APP.api.orderUserSing,
              data: {
                order_id: id
              },
            }).then(res => {
              APP.util.toast(res.msg)
              that.triggerEvent('refreshGet')
            }).catch(err => {})
          }
        }
      })
    },
    // 查看物流
    goExpress() {
      let order = this.data.data
      let params = APP.util.paramStringify({
        expressType: order.express_type,
        expressNo: order.express_no,
        thum: order.order_goods_info[0] && order.order_goods_info[0].thum || APP.imgs.avatar
      })
      wx.navigateTo({
        url: `/pages/UserOrderExpress/index?${params}`,
      })
    },
    // 评价
    estimateGoods(e) {
      let params = APP.util.paramStringify({
        orderId: APP.util.getDataSet(e, 'orderid'),
        goodsId: APP.util.getDataSet(e, 'goodsid'),
        thum: APP.util.getDataSet(e, 'thum'),
      })
      wx.navigateTo({
        url: `/pages/UserOrderComment/index?${params}`,
      })
    },
  }
})