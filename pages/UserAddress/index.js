const APP = getApp();
Page({
  data: {},
  onLoad(options) {},
  // 页面显示
  onShow() {
    this.selectComponent("#address").refresh();
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
    this.selectComponent("#address").refresh();
  },
  // 页面上拉触底事件的处理函数
  onReachBottom() {
    this.selectComponent("#address").concat();
  },
})