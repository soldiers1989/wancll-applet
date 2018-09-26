const APP = getApp()
const STAUTS = {
  1: '等待付款',
  2: '等待发货',
  3: '已发货',
  4: '交易完成',
  9: '已取消'
}
Page({
  data: {
    statusName: '',
    orderData: {},
    orderGoods: [],
    id: '',
    statusFontClass: {
      1: 'icon-daifukuan',
      2: 'icon-daifahuo',
      3: 'icon-yifahuo',
      4: 'icon-iconwxz'
    }
  },
  onLoad(options) {
    this.setData({
      id: options.id
    })
    this.getData()
  },
  getData() {
    APP.ajax({
      url: APP.api.orderDetail,
      data: {
        id: this.data.id
      },
    }).then(res => {
      this.setData({
        statusName: STAUTS[res.data.status],
        orderData: res.data,
        orderGoods: res.data.order_goods_info,
      })
    }).catch(err => {})
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    this.getData()
  }
})