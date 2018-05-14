const APP = getApp()
import { getUserData } from './user-data.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    count:{},
    asset:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断登录状态
    if (!APP.globalData.hasLogin){
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }else{
      // 发起请求
      this.setData({ user: APP.globalData.user })
      getUserData(this);
    }

  },
  // 跳转到订单状态页面
  goOrderList(e) {
    let target = APP.utils.getDataSet(e, 'target')
    wx.navigateTo({
      url: `/pages/userSubPage/order/order?target=${target}`,
    })
  },
  // 跳转到子页面
  goSubPages(e) {
    let target = APP.utils.getDataSet(e, 'target')
    wx.navigateTo({
      url: `/pages/userSubPage/${target}/${target}`,
    })
  },
  // 跳转到购物车页面 这个有问题，多余
  goCarts(e) {
    let target = APP.utils.getDataSet(e, 'target')
    wx.switchTab({
      url: `/pages/${target}/${target}`,
    })
  },
  // 显示成长值记录
  showGrow(){
    wx.showToast({
      title: '显示成长值记录，开发中....',
      icon: 'none',
    })
  },
  settingInfo(){
    wx.showToast({
      title: '显示成长打开设置弹窗，开发中....',
      icon: 'none',
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