const APP = getApp()
import {
  getGoodsList,
} from './data.js'
Page({
  data: {
    page: 1,
    // 渲染数据列表
    goodsList: [],
    hasNoData: false,
    noContentImg: APP.imgs.noContentImg,
    // 售罄
    noStockImg: APP.imgs.noStockImg,
  },
  onLoad: function(options) {
    let data = {}
    if (options.cateId) {
      data.goods_cate_id = options.cateId
    } else if (options.keywords) {
      data.keyword = options.keywords
    } else if (options.tag) {
      data.tag = options.tag
    } else if (options.distribution) {
      data.system_type = 'drp'
    } else if (options.bonus) {
      data.system_type = 'bonus'
    }
    this.setData({
      data: data
    })
    getGoodsList(this)
  },

  // 获取商品数据
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/ComGoodsDetail/index?id=${id}`,
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      page: 1
    })
    getGoodsList(this)
  },
  // 上拉加载
  onReachBottom() {
    getGoodsList(this)
  },
  // 分享
  onShareAppMessage() {
    return {
      path: '/pages/BarHome/index'
    }
  }
})