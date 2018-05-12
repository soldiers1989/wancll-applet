function getToken(that) {
  wx.getStorage({
    key: 'token',
    success(res) {
      that.globalData.token = res.data.token
    },
  })
}

function checkToken(){

}

function getUser(that){
  wx.getStorage({
    key: 'user',
    success(res) {
      that.globalData.user = res.data
    },
  })
}
module.exports = {
  getToken,
  checkToken,
  getUser
}