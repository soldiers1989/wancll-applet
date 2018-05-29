const APP = getApp();
export function getUserData(that) {
  APP.ajax({
    url: APP.api.userCount,
    success(res) {
      that.setData({ count: res.data })
    }
  })
  APP.ajax({
    url: APP.api.userAsset,
    success(res) {
      that.setData({ asset: res.data })
    }
  })
  APP.ajax({
    url: APP.api.user,
    success(res) {
      res.data.avatar = res.data.avatar ? res.data.avatar : APP.imgs.avatar
      that.setData({
        user: res.data
      });
      wx.setStorage({
        key: 'user',
        data: res.data,
      })
    }
  })
}
// 查询实名认证状态
export function queryAuthStatus(that) {
  APP.ajax({
    url: APP.api.queryAuthStatus,
    success(res) {
      let status = res.data.status;
      if (status == 0 || status == 2) {
        wx.navigateTo({
          url: `/pages/userSubPage/idcardAuthSubmit/idcardAuthSubmit?status=${status}&id=${res.data.id}`,
        })
      } else if (status == 1 || status == 3) {
        wx.navigateTo({
          url: '/pages/userSubPage/idcardAuthInfo/idcardAuthInfo',
        })
      }
    }
  })
}