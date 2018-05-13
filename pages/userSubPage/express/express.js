const APP =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logisticsMap:{
      huitongkuaidi: '百世汇通',
      ems: 'EMS',
      shentong: '申通快递',
      shunfeng: '顺丰快递',
      tiantian: '天天快递',
      yuantong: '圆通快递',
      yunda: '韵达快运',
      zhongtong: '中通速递'
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
    orderInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    // 获取本地存储的订单列表
    APP.utils.getOrderById(options.id, (res) => {
      this.setData({
        orderInfo: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})