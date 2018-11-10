const APP = getApp()
import {
  catesTreesGet,
  goodsListGet,
  navHeaders,
} from './data.js'
Page({
  data: {
    page: 1,
    // tab组件参数
    cates: [],
    childCates: [],
    tabScroll: true,
    tabHeight: 45,
    tabSelectedId: '',
    // 数据参数
    goodsCateId: '',
    goodsList: [],
    haveNoData: false,
    noStockImg: APP.imgs.noStockImg,
    noContentImg: APP.imgs.noContentImg,
    navHeaders: navHeaders,
    activeTab: 0,
    other: {}
  },
  onLoad(options) {
    catesTreesGet(this)
    goodsListGet(this)
  },
  changeFilter(e) {
    let id = APP.util.getDataSet(e, 'id')
    let navHeaders = this.data.navHeaders
    navHeaders.map(h => {
      if (h.id == id) {
        h.flag = !h.flag
        this.setData({
          activeTab: h.id,
          other: h[h.flag]['data'],
          page: 1,
          goodsList: []
        }, () => {
          goodsListGet(this)
        })
      }
      return h
    })
    this.setData({
      navHeaders: navHeaders,
    })
  },
  // 小分类的点击
  childCateClick(e) {
    let goodsCateId = APP.util.getDataSet(e, 'id')
    this.setData({
      goodsCateId: goodsCateId,
      page: 1,
      goodsList: [],
    })
    goodsListGet(this)
  },
  // 大分类的点击
  tabChange(e) {
    let goodsCateId = e.detail
    this.data.cates.forEach(item => {
      if (item.id == goodsCateId) {
        this.setData({
          childCates: item._child || [],
          goodsCateId: item.id,
          page: 1,
          goodsList: []
        })
      }
    })
    goodsListGet(this)
  },
  // 跳转到商品详情页
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/ComGoodsDetail/index?id=${id}`,
    })
  },
  onPullDownRefresh() {
    catesTreesGet()
    this.setData({
      page: 1,
    })
    wx.stopPullDownRefresh()
    goodsListGet(this)
  },
  onReachBottom() {
    goodsListGet(this)
  }
})