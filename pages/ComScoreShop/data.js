const APP = getApp();

function getData(that) {
  // 用户资产
  let userAssetPromise = APP.ajax({
    url: APP.api.userAssetRead,
  })
  // 用户信息
  let userReadPromise = APP.ajax({
    url: APP.api.userRead,
  })
  // 积分订单统计
  let scoreOrderCountPromise = APP.ajax({
    url: APP.api.scoreOrderCount,
  })
  // 积分商城参数
  let scoreParamsPromise = APP.ajax({
    url: APP.api.scoreParams
  })
  // 是否签到
  let isSignPromise = APP.ajax({
    url: APP.api.scoreIsSign
  })

  Promise.all([userAssetPromise, userReadPromise, scoreOrderCountPromise, scoreParamsPromise, isSignPromise]).then(values => {
    let user = values[1].data
    user.avatar = user.avatar || APP.imgs.avatar
    wx.setStorage({
      key: 'user',
      data: user,
    })
    that.setData({
      userAsset: values[0].data,
      user: user,
      orderCount: values[2].data,
      scoreParams: values[3].data,
      isSign: values[4].data,
    })
  }).catch(err => {
    console.warn(err)
  })
}
// 获取列表
function getList(that) {
  APP.ajax({
    url: APP.api.scoreGoodsList,
    header:{
      'page-num': that.data.page,
      'page-limit': 10,
    }
  }).then(res => {
    let list = APP.util.arrayToUnique(that.data.list.concat(res.data))
    that.setData({
      list: list,
      haveNoData: !Boolean(list.length),
      page: that.data.page + 1
    })
  }).catch(err => {})
}
// 签到
function sign(that) {
  APP.ajax({
    url: APP.api.singIn,
  }).then(res => {
    APP.util.toast(res.msg)
    that.setData({
      'isSign.is_sign_in': 1
    })
  }).catch(err => {})
}

export {
  getData,
  getList,
  sign,
}