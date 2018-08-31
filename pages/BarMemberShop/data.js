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