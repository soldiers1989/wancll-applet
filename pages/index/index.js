const APP = getApp();
import { getOtherData, getGoodsData} from './data.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播参数
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    // 数据参数
    imgUrls: [], // 轮播图片
    smallImg: APP.imgs.smallImg,
    title: ['新品', '精品', '热销', '折扣', '清仓'],
    noticeImg: APP.imgs.notice,
    notice: [],
    goods: [],
    // 控制参数
    pageNum:1,
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    APP.globalData.hasLogin = wx.getStorageSync('token') ? true : false;
    // 获取所有数据
    getOtherData(this);
    getGoodsData(this);

  },
  // 获取商品数据
  
  
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
  onReachBottom () {
    getGoodsData(this);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})