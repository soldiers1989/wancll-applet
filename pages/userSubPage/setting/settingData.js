const APP = getApp();

export function getUserInfo(that) {
  APP.ajax({
    url: APP.api.user,
    success(res) {
      that.setData({
        user: res.data
      })
    }
  })
}

export function updateUserInfo(that, data) {
  APP.ajax({
    url: APP.api.userSettingUpdate,
    data: data,
    success(res) {
      that.setData({
        user: res.data
      })
      wx.setStorage({
        key: 'user',
        data: res.data,
      })
    }
  })
}