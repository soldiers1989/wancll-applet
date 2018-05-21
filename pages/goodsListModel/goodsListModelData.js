const APP = getApp();
export function getGoodsList(that) {
  const pageLimit = 10;
  APP.ajax({
    url: APP.api.goods,
    data: that.data.data,
    header: {
      'page-limit': pageLimit,
      'page-num': that.data.pageNum
    },
    success(res) {
      that.setData({
        loading: false
      })
      if (res.data.length) {
        that.setData({
          goodsList: that.data.goodsList.concat(res.data),
          pageNum: ++that.data.pageNum
        })
      }
    }
  })
}