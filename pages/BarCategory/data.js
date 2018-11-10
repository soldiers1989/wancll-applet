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
  let data = {
    goods_cate_id: that.data.goodsCateId,
  }
  let key = ''
  for (key in that.data.other) {
    data[key] = that.data.other[key]
  }
  APP.ajax({
    url: APP.api.goodsList,
    data: data,
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

let navHeaders = [{
  id: 0,
  flag: true,
  true: {
    name: '综合排序',
    data: {
      'sort_by': 'all',
      'sort_type': 'desc'
    }
  },
  false: {
    name: '综合排序',
    data: {
      'sort_by': 'all',
      'sort_type': 'asc'
    }
  },
}, {
  id: 1,
  flag: true,
  true: {
    name: '价格',
    data: {
      'sort_by': 'sell_price',
      'sort_type': 'desc'
    }
  },
  false: {
    name: '价格',
    data: {
      'sort_by': 'sell_price',
      'sort_type': 'asc'
    }
  },
}, {
  id: 2,
  flag: true,
  true: {
    name: '销量',
    data: {
      'sort_by': 'sell_num',
      'sort_type': 'desc'
    }
  },
  false: {
    name: '销量',
    data: {
      'sort_by': 'sell_num',
      'sort_type': 'asc'
    }
  },
}, {
  id: 3,
  flag: true,
  true: {
    name: '新品',
    data: {
      'sort_by': 'new_goods',
      'sort_type': 'desc'
    }
  },
  false: {
    name: '新品',
    data: {
      'sort_by': 'new_goods',
      'sort_type': 'asc'
    }
  },
}]

export {
  catesTreesGet,
  goodsListGet,
  navHeaders,
}