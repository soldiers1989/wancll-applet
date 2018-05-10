// pages/category/category.js
const APP = getApp();
import { getGoodsTree } from './data.js';
import { getGoodsData } from '../index/data.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabList: [],
    tabListSelectedId: '',
    tabListScroll: true,
    tabListHeight: 45,

    goods: [],
    // 控制参数
    pageNum: 1,
    loading: true,
    changeId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getGoodsTree(this)
    getGoodsData(this)
  },
  changeNav(){
    
    let id = this.selectComponent("#tab").data.selectedId
    // 相同点击 禁止
    if(this.data.changeId == id){
      return;
    }
    this.setData({
      goods:[],
      pageNum:1,
      changeId:id
    },()=>{
      getGoodsData(this, id);
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
    getGoodsData(this)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})