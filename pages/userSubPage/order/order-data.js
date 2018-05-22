const APP = getApp();

export function getOrderData(that, status) {
  let data = status!=0 ? { status: status } : {}
  APP.ajax({
    url: APP.api.orderAll,
    data: data,
    success(res) {
      that.setData({ orderList: res.data})
      wx.setStorageSync('orderList', res.data)
    }
  })
}