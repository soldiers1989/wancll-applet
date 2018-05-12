const APP = getApp();

export function getOrderData(that, status) {
  let data = status ? { status: status } : {}
  APP.ajax({
    url: APP.api.orderAll,
    data: data,
    header: {
      token: APP.globalData.token
    },
    success(res) {
      console.log(res.data)
      that.setData({ orderList: res.data})
    }
  })
}