// pages/BarCategory/index.js
const APP = getApp();
import { getGoodsTree, getGoodsData } from './data.js';
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
    popupNav: false,
    noContent: false,
    noContentImg: APP.imgs.noContentImg,
    // 分页功能
    FPage: {
      pageNum: 1,
      hasData: true,
      noContent: false,
      noContentImg: APP.imgs.noContentImg
    },
    // 售罄
    noStockImage: APP.imgs.noStock,
  },
  onLoad(options) {
    getGoodsTree(this)
    this.getGoodsData()
  },
  // 小分类的点击
  changeSubNav(e) {
    let id = e.currentTarget.dataset.id;
    // 相同点击 禁止
    if (this.data.id == id) {
      return;
    }
    // 更新数据
    this.setData({
      goods: [],
      pageNum: 1,
      id: id,
    }, () => {
      getGoodsData(this, id)
    })
  },
  // 大分类的点击
  changeNav() {
    let that = this;
    let id = this.selectComponent("#tab").data.selectedId
    // 相同点击 禁止
    if (this.data.id == id) {
      return;
    }
    this.data.tabList.forEach((i) => {
      if (i.id == id) {
        if (i._child) {
          that.setData({
            childNav: i._child,
            popupNav: true,
          })
        } else {
          that.setData({
            childNav: [],
            popupNav: false,
          })
        }
      }
    })
    // 设置数据
    this.setData({
      goods: [],
      pageNum: 1,
      id: id,
    }, () => { 
      this.getGoodsData(id) 
    })
  },
  // 跳转到商品详情页
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/ComDetail/index?id=${id}`,
    })
  },
  // 获取商品数据
  getGoodsData(id=''){
    let data = {goods_cate_id: id}
    GetPData.getPagesData({
      type:2,
      that:this,
      url:'goods',
      pushData:'goods',
      postData: data
    })
  },


  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    this.setData({
      goods: [],
      pageNum: 1,
    })
    getGoodsTree(this);
    getGoodsData(this, this.data.id);
  },
  onReachBottom() {
    getGoodsData(this, this.data.id)
  }
})