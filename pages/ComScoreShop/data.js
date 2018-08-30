const APP = getApp();
// 获取用户资产
export function getUserAsset(that) {
  APP.ajax({
    url: APP.api.userAsset,
    success(res) {
      that.setData({
        asset: res.data
      })
    }
  })
}
// 获取积分订单
export function getScoreOrdersCount(that) {
  APP.ajax({
    url: APP.api.scoreOrders,
    success(res) {
      that.setData({
        orderCount: res.data
      })
    }
  })
}
// 获取用户数据（要重新获取，而不是取缓存）
export function getUser(that) {
  APP.ajax({
    url: APP.api.user,
    success(res) {
      res.data.avatar = res.data.avatar ? res.data.avatar : APP.imgs.avatar
      that.setData({
        user: res.data
      });
    }
  })
}

// 获取积分相关参数
export function getScoreParams(that) {
  APP.ajax({
    url: APP.api.scoreParams,
    data: {},
    success: res => {
      that.setData({
        scoreParams: res.data
      });
    },
  })
}