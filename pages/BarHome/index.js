const APP = getApp();
import {
  getData,
  getGoodsList,
} from './data.js';
Page({
  data: {
    // 分页参数
    page: 1,
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
    banners: [], // 轮播图片
    announcements: {}, // 首页公告
    goodsList: [], // 商品列表
    tags: [], // 促销列表广告(5个圆形图片)
    discountActivities: [], // 限时折扣活动列表
    timeDown: '0天 00 : 00 : 00', // 倒计时
    announcementImg: APP.imgs.announcementImg,
    // 售罄
    noStockImg: APP.imgs.noStockImg,
    // 首页优惠券
    indexCoupon: APP.imgs.indexCoupon,
    indexFull: APP.imgs.indexFull,
  },
  onLoad() {
    // 获取所有数据
    wx.showLoading({
      title: '加载中...',
    })
    getData(this)
    getGoodsList(this)
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    getData()
    this.setData({
      page: 1
    })
    getGoodsList(this)
  },
  // 上拉加载事件
  onReachBottom() {
    getGoodsList(this)
  },
  // 跳转到商品的详情页面 仅存在于商品列表模块
  goDetail(e) {
    let id = APP.util.getDataSet(e, 'id');
    let param = APP.util.paramStringify({
      id: id
    })
    wx.navigateTo({
      url: `/pages/ComDetail/index?${param}`,
    })
  },
  // 跳转到商品的详情页面 仅存在于线上折扣
  goDetailDiscount(e) {
    let id = APP.util.getDataSet(e, 'id');
    let discountid = APP.util.getDataSet(e, 'discountid');
    let param = APP.util.paramStringify({
      id: id,
      discountid: discountid
    })
    wx.navigateTo({
      url: `/pages/ComDetail/index?${param}`,
    })
  },
  // 跳转到文章详情页面
  goAnnoucement(e) {
    let id = APP.util.getDataSet(e, 'id');
    let paramStr = APP.util.paramStringify({
      'id': id,
      'type': 'announcement'
    })
    wx.navigateTo({
      url: `/pages/ComArticle/index?${paramStr}`,
    })
  },
  // 去领券中心
  goDiscountCenter() {
    wx.navigateTo({
      url: `/pages/UserCouponCenter/index`,
    })
  },
  // 减满促销
  goCategory() {
    wx.switchTab({
      url: `/pages/BarCategory/index`,
    })
  },
  // 去搜索页面
  goSearchPage() {
    wx.navigateTo({
      url: '/pages/ComSearch/index',
    })
  },
  // 标签商品页
  goTagGoods(e) {
    let tag = APP.util.getDataSet(e, 'tag');
    let paramStr = APP.util.paramStringify({
      tag: tag
    })
    wx.navigateTo({
      url: `/pages/ComGoodsList/index?${paramStr}`,
    })
  },
  // 分享
  onShareAppMessage() {
    return {
      path: '/pages/BarHome/index'
    }
  }
})