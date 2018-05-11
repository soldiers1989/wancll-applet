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
    childNav: [],
    // 控制参数
    id:0,
    pageNum: 1,
    loading: true,
    changeIdFNav: '',
    changeIdCNav: '',
    popupNav: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getGoodsTree(this)
    getGoodsData(this)
  },
  // 小分类的点击
  changeSubNav(e){
    let id = e.currentTarget.dataset.id;
    // 相同点击 禁止
    if (this.data.changeIdCNav == id) {
      return;
    }
    // 更新数据
    this.setData({
      goods: [],
      pageNum: 1,
      changeIdCNav:id,
      id: id,
    }, () => { 
      getGoodsData(this, id)  
      this.setData({ popupNav: false})
    })
  },
  // 大分类的点击
  changeNav() {
    let id = this.selectComponent("#tab").data.selectedId
    // 相同点击 禁止
    if (this.data.changeIdFNav == id) {
      this.setData({ popupNav: true })
      return;
    }
    // 得到子分类
    let child = this.data.tabList.filter(item=>item.id == id)
    console.log(child)
    if (id) {
      this.setData({ 
        popupNav: true,
        childNav: child[0]._child,
      })
    } else {
      this.setData({ popupNav: false })
    }
    // 设置数据

    this.setData({
      goods: [],
      pageNum: 1,
      id: id,
      changeIdFNav: id
    }, () => { getGoodsData(this, id)})
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
    getGoodsData(this,this.data.id)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})