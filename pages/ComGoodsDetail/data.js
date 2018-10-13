const APP = getApp()

// 获取商品数据
function getGoods(that, id) {
  APP.ajax({
    url: APP.api.goodsRead,
    data: {
      id: id
    }
  }).then(res => {
    res.data.desc = res.data.desc.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;')
    res.data.spec_group_info = res.data.spec_group_info.map((item) => {
      item.spec_option_group = item.spec_option_group.split('_').sort().toString()
      return item
    })
    that.setData({
      goods: res.data
    })
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
    let list = APP.util.arrayToUnique(that.data.list.concat(res.data))
    list = list.map(item => {
      item.user_info.nick_name = item.user_info.nick_name ? item.user_info.nick_name : '匿名用户'
      comment.user_info.avatar = item.user_info.avatar ? item.user_info.avatar : APP.imgs.avatar
      return item
    })
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
    that.setData({
      isCollected: res.data.is_collect
    })
  }).catch(err => {
    console.warn(err)
  })
}
// 收藏 or 取消收藏
function toggleCollect(that, id) {
  let url = ''
  if (that.data.isCollected) {
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
function getActivities(that, id) {
  APP.ajax({
    url: APP.api.activities,
  }).then(res => {
    if (res.data.discount) {
      // 计算截至时间
      res.data.discount[0].deadline = res.data.discount[0].end_timestamp * 1000 - Date.now()
      that.setData({
        discountActivity: res.data.discount[0],
        discountGoods: (res.data.discount[0].rule_info || []).find(item => {
          return item.goods_id == id
        })
      })
      // 倒计时
      setInterval(() => {
        let endtime = res.data.discount[0].end_timestamp * 1000
        APP.util.timeDown(that, endtime)
        endtime -= 1000
      }, 1000)
    }
  }).catch(err => {
    console.warn(err)
  })
}
// 加入购物车
function cartSave(that) {
  let data = {
    goods_id: that.data.id,
    spec_group_id_str: that.data.selectSku.id_str || 0,
    num: 1,
  }
  APP.ajax({
    url: APP.api.cartSave,
    data: data,
  }).then(res => {
    APP.util.toast(res.msg)
  }).catch(err => {
    console.warn(err)
  })
}

export {
  getGoods,
  getGoodsCommetList,
  queryGoodsIsCollected,
  toggleCollect,
  getActivities,
  cartSave,
}