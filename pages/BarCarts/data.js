const APP = getApp();
export function getCarts(that) {
  APP.ajax({
    url: APP.api.getCartsAll,
    header: {
      'page-limit': that.data.pageLimit,
      'page-num': that.data.pageNum,
    },
    success(res) {
      if (res.data.length) {
        // console.log(res.data)
        that.setData({
          cartsList: that.data.cartsList.concat(res.data),
          pageNum: that.data.pageNum + 1,
          noContent: false,
        })
      } else if (that.data.pageNum == 1) {
        that.setData({
          noContent: true
        })
      }
    }
  })
}
