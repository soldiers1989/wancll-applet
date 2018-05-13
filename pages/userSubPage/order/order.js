// pages/userSubPage/order/order.js
const APP = getApp();
import {getOrderData} from './order-data.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{
      id: 0,
      title: '全部'
    }, {
      id: 1,
      title: '待付款'
    }, {
      id: 2,
      title: '待发货'
    }, {
      id: 3,
      title: '待收货'
    }, {
      id: 4,
      title: '待评价'
    }],
    tabSelectedId: 0,
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 设置跳转目标并对应请求
    if (options.target) {
      this.setData({
        tabSelectedId: options.target
      },()=>{
        getOrderData(this, options.target);
      })
    }
  },
  //重新加载数据
  refreshGet(){
    getOrderData(this, this.data.tabSelectedId);
  },
  // 点击切换顶部的标签
  tabchange(e){
    let id = this.selectComponent("#tab").data.selectedId
    this.setData({ 
      tabSelectedId:id
    },()=>{
      getOrderData(this, id);
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