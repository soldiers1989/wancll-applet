const APP = getApp();

// 获取数据
function getData(that) {
  // 订单统计
  let orderCountPromise = APP.ajax({
    url: APP.api.orderCount,
  })
  // 用户资产
  let userAssetPromise = APP.ajax({
    url: APP.api.userAssetRead,
  })
  // 用户信息
  let userReadPromise = APP.ajax({
    url: APP.api.userRead,
  })
  // 系统信息
  let systemInfoPromise = APP.ajax({
    url: APP.api.systemInfo,
  })
  Promise.all([orderCountPromise, userAssetPromise, userReadPromise, systemInfoPromise]).then(resps => {
    let orderCount = resps[0].data
    let userAsset = resps[1].data
    let user = resps[2].data
    user.avatar = user.avatar || APP.imgs.avatar
    wx.setStorage({
      key: 'user',
      data: user,
    })
    let systemInfo = resps[3].data
    that.setData({
      orderCount: orderCount,
      userAsset: userAsset,
      user: user,
      systemInfo: systemInfo
    })
    wx.stopPullDownRefresh()
  }).catch(err => {
    wx.stopPullDownRefresh()
  })
}
// 查询实名认证状态
function queryAuthStatus(that) {
  APP.ajax({
    url: APP.api.queryAuthStatus,
  }).then(resp => {
    let status = resp.data.status;
    if (status == 0) {
      wx.navigateTo({
        url: `/pages/UserIdcardSubmit/index?status=${status}`,
      })
    } else if (status == 2) {
      wx.showToast({
        title: '您的信息未通过审核,请重新提交',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateTo({
          url: `/pages/UserIdcardSubmit/index?status=${status}&id=${resp.data.id}`,
        })
      }, 1000)
    } else if (status == 1 || status == 3) {
      wx.navigateTo({
        url: '/pages/UserIdcardInfo/index',
      })
    }
  }).catch(err => {})
}

export {
  getData,
  queryAuthStatus,
}