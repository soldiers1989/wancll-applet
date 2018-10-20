const APP = getApp()
// 购物车列表
function getList(that) {
  APP.ajax({
    url: APP.api.cartList,
    header: {
      'page-num': that.data.page,
      'page-limit': 10,
    }
  }).then(res => {
    let list = APP.util.arrayToUnique(that.data.list.concat(res.data.filter(item => {
      return Boolean(item.goods_info)
    })))
    list.forEach(cart => {
      cart.isSelected = false
      cart.goods_info.spec_group_info = cart.goods_info.spec_group_info.map((item) => {
        item.spec_option_group = item.spec_option_group.split('_').sort().toString()
        return item
      })
    })
    that.setData({
      list: list,
      haveNoData: !Boolean(list.length),
      page: that.data.page + 1
    })
    that.updateData()
  }).catch(err => {})
}
// 删除购物车
function cartDelete(that) {
  let ids = that.data.list.filter(item => {
    return item.isSelected
  }).map(item => {
    return item.id
  })
  APP.ajax({
    url: APP.api.cartDelete,
    data: {
      id: ids
    }
  }).then(res => {
    APP.util.toast(res.msg)
    that.setData({
      list: [],
      page: 1,
    })
    getList(that)
  })
}
// 购物车商品移至收藏夹
function cartColleSave(that) {
  let ids = that.data.list.filter(item => {
    return item.isSelected
  }).map(item => {
    return item.goods_id
  })
  APP.ajax({
    url: APP.api.cartColleSave,
    data: {
      goods_ids: ids
    }
  }).then(res => {
    APP.util.toast(res.msg)
  })
}
// 购物车更新
function cartUpdate(that, data) {
  return APP.ajax({
    url: APP.api.cartUpdate,
    data: data,
  })
}

export {
  cartUpdate,
  cartDelete,
  cartColleSave,
  getList,
}