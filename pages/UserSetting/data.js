const APP = getApp()
// 更新用户
function updateUserInfo(that, data) {
  APP.ajax({
    url: APP.api.userUpdate,
    data: data,
  }).then(resp => {
    resp.data.avatar = resp.data.avatar ? resp.data.avatar : APP.imgs.avatar
    that.setData({
      user: resp.data,
    })
    wx.setStorage({
      key: 'user',
      data: resp.data,
    })
  })
}
// 获得用户信息
function getUserData(that) {
  APP.ajax({
    url: APP.api.userRead,
  }).then(resp => {
    resp.data.avatar = resp.data.avatar ? resp.data.avatar : APP.imgs.avatar
    that.setData({
      user: resp.data,
    })
    wx.setStorage({
      key: 'user',
      data: resp.data,
    })
  })
}
// 查询微信绑定状态
function queryWechatBindStatus(that) {
  APP.ajax({
    url: APP.api.queryWechatBindStatus,
  }).then(resp => {
    if (resp.data.wechat_openid) {
      that.setData({
        hasBindWechat: true,
      })
    }
  })
}
// 解绑微信
function unbind(that) {
  APP.ajax({
    url: APP.api.unbind,
    data: {
      openid_type: 'wechat',
    },
  }).then(resp => {
    APP.util.toast(resp.msg)
    that.setData({
      hasBindWechat: false,
    })
  })
}
// 登录状态下绑定微信
function bindWechatInLogin(that, openid) {
  APP.ajax({
    url: APP.api.bindWechatInLogin,
    data: {
      openid_type: 'wechat',
      openid: openid,
    },
  }).then(resp => {
    APP.util.toast(resp.msg)
  })
}

export {
  updateUserInfo,
  getUserData,
  queryWechatBindStatus,
  unbind,
  bindWechatInLogin,
}