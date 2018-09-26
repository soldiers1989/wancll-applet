const APP = getApp()
// 获取默认地址
function getDefaultAddress(that) {
  APP.ajax({
    url: APP.api.orderAffimAddress,
  }).then(res => {
    // 没有获取到地址的时候
    if (!res.data.id) {
      APP.util.toast('请先添加地址')
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/UserAddressEdit/index',
        })
      }, 500)
    } else {
      that.setData({
        selectedAddress: res.data,
      }, () => {
        orderView(that)
      })
    }
  }).catch(err => {})
}
// 订单预览
function orderView(that) {
  APP.ajax({
    url: APP.api.orderAffimView,
    data: {
      address_id: that.data.selectedAddress.id,
      goods_info: packageOrderGoodsInfo(that.data.goodsList),
    },
  }).then(res => {
    that.setData({
      view: res.data,
      selectedActivity: {},
      selectedActivityText: '',
      selectedActivityType: '',
    }, () => {
      getMarketInfo(that)
    })
  }).catch(err => {})
}
// 查询可参与的优惠活动
function getMarketInfo(that) {
  APP.ajax({
    url: APP.api.orderAffimUser,
    data: {
      goods_ids: packageOrderGoodsIds(that.data.goodsList),
      money: that.data.view.total_money
    },
  }).then(res => {
    that.setData({
      activities: res.data
    }, () => {
      if (that.data.isDiscountGoods && !res.data.discount) {
        wx.showModal({
          title: '提示',
          content: '您不能享受该折扣商品',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack()
            }
          }
        })
      } else {
        that.computeTotalPrice()
      }
    })
  }).catch(err => {})
}
// 提交订单
function submit(that) {
  that.setData({
    loading: true,
  })
  // 组装数据
  APP.ajax({
    url: APP.api.orderSaveAll,
    data: {
      address_id: that.data.selectedAddress.id,
      goods_info: packageOrderGoodsInfo(that.data.goodsList),
      market_activity_id: that.data.selectedActivity.id || 0,
      market_activity_type: that.data.selectedActivityType || 0,
      memo: that.data.memo
    },
  }).then(res => {
    wx.redirectTo({
      url: `/pages/ComPay/index?orderNo=${res.data.order_no}&orderMoney=${res.data.total_money}`
    })
  }).catch(err => {
    that.setData({
      loading: false
    })
  })
}
// 组装订单商品信息
function packageOrderGoodsInfo(goodsList) {
  let orderGoodsData = goodsList.map(item => {
    let data = {
      goods_id: item.goods_info.id,
      num: item.num,
      spec_group_id_str: 0,
    }
    if (item.select_spec_group_info.id) {
      data.spec_group_id_str = item.select_spec_group_info.id_str
    }
    return data
  })
  return orderGoodsData
}
// 组装订单ids
function packageOrderGoodsIds(goodsList) {
  return goodsList.map(item => {
    return item.goods_info.id
  })
}

export {
  getDefaultAddress,
  orderView,
  getMarketInfo,
  submit,
}