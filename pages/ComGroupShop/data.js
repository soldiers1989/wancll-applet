const APP = getApp()
// 获取团购订单
function getGroupOrdersCount(that) {
  APP.ajax({
    url: APP.api.groupOrderCount,
  }).then(res => {
    that.setData({
      orderCount: res.data
    })
  }).catch(err => {})
}
// 获取团购相关参数
function getGroupParams(that) {
  APP.ajax({
    url: APP.api.groupParams,
    data: {},
  }).then(res => {
    that.setData({
      groupParams: res.data
    })
  }).catch(err => {})
}

// 获取列表
function getList(that) {
  APP.ajax({
    url: APP.api.groupGoodsList,
    header: {
      'page-num': that.data.page,
      'page-limit': 10,
    }
  }).then(res => {
    let list = APP.util.arrayToUnique(that.data.list.concat(res.data.filter(item => {
      return Boolean(item.goods_info)
    })))
    that.setData({
      list: list,
      haveNoData: !Boolean(list.length),
      page: that.data.page + 1
    })
  }).catch(err => {})
}
export {
  getGroupOrdersCount,
  getGroupParams,
  getList,
}