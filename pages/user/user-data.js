const APP = getApp();
export function getUserData(that){
  APP.ajax({
    url: APP.api.userCount,
    success(res){
      that.setData({count:res.data})
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
    success(res){
      res.data.avatar = res.data.avatar ? res.data.avatar : APP.imgs.avatar
      that.setData({
        user: res.data
      })
    }
  })
}