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
    url: APP.api.scoreOrderView,
    data: {
      address_id: that.data.selectedAddress.id,
      goods_id: that.data.goodsList[0].goods.goods_id,
      num: that.data.goodsList[0].num,
      spec_group_id_str: that.data.goodsList[0].select_spec_group_info.spec_group_id_str || 0,
    },
    success(res) {
      that.setData({
        totalScore: res.data.total_score,
      })
    }
  })
}
// 提交订单
export function submit(that) {
  // 组装数据
  APP.ajax({
    url: APP.api.scoreOrderSave,
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
      wx.showToast({
        title: res.msg,
        icon: 'none',
      })
      // setTimeout(() => {
      //   wx.redirectTo({
      //     url: `/pages/ComPay/index?orderNo=${res.data.order_no}&orderMoney=${res.data.total_money}`
      //   })
      // }, 1000)
    },
  })
}

// 校验是否设置了支付密码
export function checkIsSetPassword(that) {
  APP.ajax({
    url: APP.api.setPayPass,
    success(res) {
      if (res.data.is_set_pay_password == 1) {
        that.togglePopupPay();
      } else {
        wx.showToast({
          title: '请设置支付密码',
          icon: 'none',
        })
        setTimeout(() => {
          wx.navigateTo({
            url: `/pages/UserSettingPass/index?id=1`,
          })
        }, 500)
      }
    }
  })
}
// 校验密码
export function checkPassword(that) {
  APP.ajax({
    url: APP.api.checkPayPassword,
    data: {
      pay_password: that.data.password
    },
    success(res) {
      if(res.code == 0){
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      }else{
        submit(that);
      }
    }
  })
}