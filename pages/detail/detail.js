// pages/detail/detail.js
const APP = getApp()
import { getDetailData} from './detail-data.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播参数
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    // tab组件参数
    tabList: [{ id: 1, title: '详情' }, { id: 2, title: '评价' }],
    tabListSelectedId: 1,
    tabListScroll: true,
    tabListHeight: 45,

    detailInfo:[],
    skuInfo:[],
    comments:[],
    // 控制
    show:1,
    showBottomPopup: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    getDetailData(this,options.id);
  },
  changeTab(){
    let id = this.selectComponent("#tab").data.selectedId
    this.setData({show:id})
  },
  toggleBottomPopup() {
    this.setData({
      showBottomPopup: !this.data.showBottomPopup
    });
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