const APP = getApp();

export function getGoodsTree(that) {
  APP.ajax({
    url: APP.api.goodsTree,
    success(res) {
      let list = [];
      res.data.forEach((item, index) => {
        item.title = item.name;
        item._child && (item._child = item._child.map(i => {
          i.thum = i.thum ? i.thum : APP.imgs.avatar;
          return i;
        }))
        list.push(item);
      })
      list.unshift({
        id: '',
        title: '全部'
      })
      that.setData({
        tabList: list,
      })
    }
  })
}

// 获取商品参数 并控制 loading显示
export function getGoodsData(that, id = '') {
  const pageLimit = 10;
  let data = that.data.goods;
  APP.ajax({
    url: APP.api.goods,
    data: { goods_cate_id: id },
    header: {
      'page-limit': pageLimit,
      'page-num': that.data.pageNum
    },
    success: (res) => {
      if (res.data.length) {
        that.setData({
          goods: data.concat(res.data),
          noContent: false,
          pageNum: that.data.pageNum + 1
        })
      } else {
        that.setData({
          loading: false,
          noContent: that.data.pageNum == 1 ? true : false
        })
      }
    }
  })
}