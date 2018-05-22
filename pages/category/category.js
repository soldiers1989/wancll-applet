// pages/category/category.js
const APP = getApp();
import { getGoodsTree } from './category-data.js';
import { getGoodsData } from '../index/index-data.js';
Page({
  data: {
    // tab组件参数
    tabList: [],
    tabListSelectedId: '',
    tabListScroll: true,
    tabListHeight: 45,
    // 数据参数
    goods: [],
    childNav: [],
    // 控制参数
    id: 0,
    pageNum: 1,
    loading: true,
    changeIdFNav: '',
    changeIdCNav: '',
    popupNav: false,

  },
  onLoad(options) {
    getGoodsTree(this)
    getGoodsData(this)
  },
  // 小分类的点击
  changeSubNav(e) {
    let id = e.currentTarget.dataset.id;
    // 相同点击 禁止
    if (this.data.changeIdCNav == id) {
      return;
    }
    // 更新数据
    this.setData({
      goods: [],
      pageNum: 1,
      changeIdCNav: id,
      id: id,
    }, () => {
      getGoodsData(this, id)
      this.setData({ popupNav: false })
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
    let child = this.data.tabList.filter(item => item.id == id)
    // console.log(child)
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
    }, () => { getGoodsData(this, id) })
  },
  // 跳转到商品详情页
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    // console.log(id);
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  onPullDownRefresh() {

  },
  onReachBottom() {
    getGoodsData(this, this.data.id)
  },
  onShareAppMessage: function () {

  }
})