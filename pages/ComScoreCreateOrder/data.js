const APP = getApp();
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
        orderView(that);
      })
    }
  }).catch(err => {})
}
// 订单预览
function orderView(that) {
  APP.ajax({
    url: APP.api.scoreOrderView,
    data: {
      address_id: that.data.selectedAddress.id,
      goods_id: that.data.goodsList[0].goods.goods_id,
      num: that.data.goodsList[0].num,
      spec_group_id_str: that.data.goodsList[0].select_spec_group_info.spec_group_id_str || 0,
    },
  }).then(res => {
    that.setData({
      totalScore: res.data.total_score,
    })
  }).catch(err => {})
}
// 提交订单
function submit(that) {
  APP.ajax({
    url: APP.api.scoreOrderSave,
    data: {
      address_id: that.data.selectedAddress.id,
      goods_id: that.data.goodsList[0].goods.goods_id,
      num: that.data.goodsList[0].num,
      spec_group_id_str: that.data.goodsList[0].select_spec_group_info.spec_group_id_str || 0,
      memo: that.data.memo,
    },
  }).then(res => {
    APP.util.toast(res.msg)
    setTimeout(() => {
      wx.redirectTo({
        url: `/pages/UserScoreOrderList/index?status=2`,
      })
    }, 800)
  }).catch(err => {
    that.setData({
      loading: false,
    })
  })
}
// 校验密码
function checkPassword(that) {
  that.setData({
    loading: true,
  })
  APP.ajax({
    url: APP.api.checkPayPassword,
    data: {
      pay_password: that.data.password
    },
  }).then(res => {
    submit(that);
  }).catch(err => {
    that.setData({
      loading: false,
    })
  })
}

export {
  getDefaultAddress,
  orderView,
  submit,
  checkPassword,
}