const APP = getApp()

// 获取商品数据
function getGoods(that, id) {
  APP.ajax({
    url: APP.api.goodsRead,
    data: {
      id: id
    }
  }).then(res => {
    that.goods = res
  }).catch(err => {
    console.warn(err)
  })
}
// 获取商品评论列表
function getGoodsCommetList(that, id) {
  APP.ajax({
    url: APP.api.goodsComments,
    data: {
      goods_id: id
    },
    header: {
      'page-num': that.data.page,
      'page-limit': 10,
    }
  }).then(res => {
    let list = APP.util.arrayToUnique(that.data.list.concat(resp.data))
    that.setData({
      list: list,
      page: that.data.page + 1,
      hasNoData: !Boolean(list.length),
    })
  }).catch(err => {
    console.warn(err)
  })
}
// 获取商品是否被收藏
function queryGoodsIsCollected(that, id) {
  APP.ajax({
    url: APP.api.goodsIsCollected,
    data: {
      goods_id: id
    }
  }).then(res => {

  }).catch(err => {
    console.warn(err)
  })
}
// 收藏 or 取消收藏
function toggleCollect(that, id) {
  let url = ''
  if (that.isCollected) {
    url = APP.api.goodsCollectCancel
  } else {
    url = APP.api.goodsCollectSave
  }
  APP.ajax({
    url: url,
    data: {
      goods_id: id,
    }
  }).then(res => {
    APP.util.toast(res.msg)
    that.setData({
      isCollected: !that.data.isCollected
    })
  }).catch(err => console.warn(err))
}

// 查询营销活动
function getActivities(){
  
}

export {
  getGoods,
  getGoodsCommetList,
  queryGoodsIsCollected,
  toggleCollect,
}