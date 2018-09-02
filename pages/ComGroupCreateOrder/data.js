const APP = getApp();
// 获取默认地址
export function getDefaultAddress(that) {
  APP.ajax({
    url: APP.api.orderAffimAddress,
    success: res => {
      // 没有获取到地址的时候
      if (!res.data.id) {
        wx.navigateTo({
          url: '/pages/UserAddressEidt/index',
        });
      } else {
        that.setData({
          selectedAddress: res.data,
        }, () => {
          orderView(that);
        })
      }
    }
  })
}
// 订单预览
export function orderView(that) {
  APP.ajax({
    url: APP.api.groupOrderView,
    data: {
      address_id: that.data.selectedAddress.id,
      goods_id: that.data.goodsList[0].goods.goods_id,
      num: that.data.goodsList[0].num,
      spec_group_id_str: that.data.goodsList[0].select_spec_group_info.spec_group_id_str || 0,
    },
    success(res) {
      that.setData({
        totalPrice: res.data.total_money,
      });
      that.caclTotalPrice();
    }
  })
}
// 提交订单
export function submit(that) {
  if (that.data.goodsList[0].order_pid != 0) {
    APP.ajax({
      url: APP.api.groupOrderJoin,
      data: {
        address_id: that.data.selectedAddress.id,
        goods_id: that.data.goodsList[0].goods.goods_id,
        num: that.data.goodsList[0].num,
        spec_group_id_str: that.data.goodsList[0].select_spec_group_info.spec_group_id_str || 0,
        memo: that.data.memo,
        user_info: {
          name: that.data.user.name,
          id_card: that.data.user.id_card
        },
        order_pid: that.data.goodsList[0].order_pid,
      },
      success: res => {
        // wx.setStorageSync('buyOrder', res.data)
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
        setTimeout(() => {
          wx.redirectTo({
            url: `/pages/ComPay/index?orderNo=${res.data.order_no}&orderMoney=${res.data.total_money}&orderId=${res.data.id}&type=3`
          })
        }, 1000)
      },
      complete: res => {
        that.setData({
          submitButtonStatus: true,
        });
      },
    })
  } else {
    // 组装数据
    APP.ajax({
      url: APP.api.groupOrderSave,
      data: {
        address_id: that.data.selectedAddress.id,
        goods_id: that.data.goodsList[0].goods.goods_id,
        num: that.data.goodsList[0].num,
        spec_group_id_str: that.data.goodsList[0].select_spec_group_info.spec_group_id_str || 0,
        memo: that.data.memo,
        user_info: {
          name: that.data.user.name,
          id_card: that.data.user.id_card
        }
      },
      success: res => {
        // wx.setStorageSync('buyOrder', res.data)
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
        setTimeout(() => {
          wx.redirectTo({
            url: `/pages/ComPay/index?orderNo=${res.data.order_no}&orderMoney=${res.data.total_money}&orderId=${res.data.id}&type=3`
          })
        }, 1000)
      },
      complete: res => {
        that.setData({
          submitButtonStatus: true,
        });
      },
    })
  }
}