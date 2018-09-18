const APP = getApp()
// 读取资产
function userAssetRead(that) {
  APP.ajax({
    url: APP.api.userAssetRead,
  }).then(res => {
    that.setData({
      userAsset: res.data,
    })
  }).catch(err => {})
}
// 获取列表数据
function getList(that) {
  let lists = that.data.lists
  APP.ajax({
    url: APP.api.scoreLogList,
    header: {
      'page-limit': 10,
      'page-num': that.data.page,
    },
  }).then(res => {
    let list = APP.util.arrayToUnique(that.data.list.concat(res.data))
    that.setData({
      page: that.data.page + 1,
      list: list,
      haveNoData: !Boolean(list.length),
    })
  }).catch(err => {})
}
export {
  userAssetRead,
  getList,
}