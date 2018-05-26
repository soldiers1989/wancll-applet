const APP = getApp();

export function getOrderData(that, status) {
  let data = status != 0 ? { status: status } : {}
  APP.ajax({
    url: APP.api.orderAll,
    data: data,
    header: {
      'page-limit': 10,
      'page-num': that.data.pageNum,
    },
    success(res) {
      if (res.data.length) {
        that.setData({
          orderList: that.data.orderList.concat(res.data),
          pageNum: ++(that.data.pageNum),
          noContent: false,
        })
        wx.setStorageSync('orderList', res.data)
      } else if (that.data.pageNum == 1) {
        that.setData({
          noContent: true
        })
      }
    }
  })
}