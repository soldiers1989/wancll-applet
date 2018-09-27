const APP = getApp()
import {
  catesTreesGet,
  goodsListGet
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
  },
  onLoad(options) {
    catesTreesGet(this)
    goodsListGet(this)
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
    goodsListGet(this)
  },
  onReachBottom() {
    goodsListGet(this)
  }
})