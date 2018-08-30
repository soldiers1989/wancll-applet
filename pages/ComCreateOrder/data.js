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
    url: APP.api.orderAffimView,
    data: {
      address_id: that.data.selectedAddress.id,
      goods_info: packageOrderGoodsInfo(that.data.goodsList),
    },
    success(res) {
      that.setData({
        totalPrice: res.data.total_money,
        freightMoney: res.data.freight_money,
        goodsMoney: res.data.goods_money,
        selectedActivity: {},
        selectedActivityText: '',
        selectedActivityType: '',
      }, () => {
        getMarketInfo(that, res.data);
      })
    }
  })
}
// 查询可参与的优惠活动
export function getMarketInfo(that, moneyData) {
  APP.ajax({
    url: APP.api.orderAffimUser,
    data: {
      goods_ids: packageOrderGoodsIds(that.data.goodsList),
      money: moneyData.total_money,
      cates_goods_money: moneyData.cates_goods_money,
      freight_money: moneyData.freight_money
    },
    success(res) {
      that.setData({
        activities: res.data
      }, () => {
        if (that.data.isDiscountGoods) {
          if (res.data.discount.length) {
            that.setData({
              discountsPrice: res.data.discount[0].discount_price * that.data.goodsList[0].num,
              selectedActivityType: 'discount',
              selectedActivity: res.data.discount[0]
            });
          } else {
            wx.showModal({
              title: '提示',
              content: '您不能享受该折扣商品',
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  wx.navigateBack();
                }
              }
            })
          }
        }
        that.caclTotalPrice();
      })
    }
  })
}
// 提交订单
export function submit(that) {
  // 组装数据
  APP.ajax({
    url: APP.api.orderSaveAll,
    data: {
      address_id: that.data.selectedAddress.id,
      goods_info: packageOrderGoodsInfo(that.data.goodsList),
      market_activity_id: that.data.selectedActivity.id || 0,
      market_activity_type: that.data.selectedActivityType || 0,
      memo: that.data.memo,
      new_user_coupons_id: that.data.newUserCouponId || 0,
      user_info: {
        name: that.data.user.name,
        id_card: that.data.user.id_card
      }
    },
    success: res=> {
      wx.setStorageSync('buyOrder', res.data)
      wx.showToast({
        title: res.msg,
        icon: 'none',
      })
      setTimeout(() => {
        wx.redirectTo({
          url: `/pages/ComPay/index?orderNo=${res.data.order_no}&orderMoney=${res.data.total_money}`
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

// 组装订单商品信息
function packageOrderGoodsInfo(goodsList) {
  return goodsList.map(item => {
    return {
      goods_id: item.goods_info.id,
      num: item.num,
      spec_group_id_str: item.select_spec_group_info.id ? item.select_spec_group_info.id_str : 0,
    }
  });
}
// 组装订单ids
function packageOrderGoodsIds(goodsList) {
  return goodsList.map(item => {
    return item.goods_info.id;
  })
}