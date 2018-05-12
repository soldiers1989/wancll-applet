const APP = getApp();
export function getUserData(that){
  APP.ajax({
    url: APP.api.userCount,
    header:{
      token: APP.globalData.token
    },
    success(res){
      that.setData({count:res.data})
    }
  })
  APP.ajax({
    url: APP.api.userAsset,
    header: {
      token: APP.globalData.token
    },
    success(res) {
      that.setData({ asset: res.data })
    }
  })
}