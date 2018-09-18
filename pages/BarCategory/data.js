const APP = getApp()
// 商品目录树
function catesTreesGet(that) {
  APP.ajax({
    url: APP.api.goodsCatesListTree
  }).then(res => {
    res.data.unshift({
      id: '',
      name: '全部',
    })
    res.data.forEach(item => {
      (item._child || []).forEach(child => {
        child.thum = child.thum || APP.imgs.avatar
      })
    })
    that.setData({
      cates: res.data
    })
  }).catch(err => {})
}
// 商品列表
function goodsListGet(that) {
  APP.ajax({
    url: APP.api.goodsList,
    data: {
      goods_cate_id: that.data.goodsCateId,
    },
    header: {
      'page-num': that.data.page,
      'page-limit': 10,
    }
  }).then(res => {
    let goodsList = APP.util.arrayToUnique(that.data.goodsList.concat(res.data))
    that.setData({
      goodsList: goodsList,
      page: that.data.page + 1,
      haveNoData: !Boolean(goodsList.length),
    })
  }).catch(err => {})
}

export {
  catesTreesGet,
  goodsListGet,
}