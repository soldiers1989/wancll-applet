const APP = getApp();
Page({
  data: {
    logisticsMap: {
      huitongkuaidi: '百世汇通',
      ems: 'EMS',
      shentong: '申通快递',
      shunfeng: '顺丰快递',
      tiantian: '天天快递',
      yuantong: '圆通快递',
      yunda: '韵达快运',
      zhongtong: '中通速递',
      zhaijisong: '宅急送',
      youzhengguonei: '邮政快递'
    },
    logisticsStatus: [
      '运输中',
      '揽件中',
      '疑难(货物寄送过程出了问题)',
      '已签收',
      '退签中',
      '派件中',
      '退回中',
    ],
    thum: '',
    expressType: '',
    expressNo: '',
    expressInfo: {}, // 物流信息
  },
  onLoad(options) {
    // 获取本地存储的订单列表
    this.setData({
      expressType: options.expressType,
      expressNo: options.expressNo,
      thum: options.thum
    })
    this.getExpressInfo()
  },
  getExpressInfo() {
    APP.ajax({
      url: APP.api.orderExpress100,
      data: {
        express_type: this.data.expressType,
        express_no: this.data.expressNo,
      },
    }).then(res => {
      this.setData({
        expressInfo: res.data
      })
    }).catch(err => {})
  },
  onPullDownRefresh() {
    this.getExpressInfo()
    wx.stopPullDownRefresh()
  },
  onShareAppMessage() {

  }
})