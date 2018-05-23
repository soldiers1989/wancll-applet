const APP = getApp();
import { getOtherData, getGoodsData } from './index-data.js';
Page({
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
    pageNum: 1,
    loading: true
  },
  onLoad() {
    // 获取所有数据
    getOtherData(this);
    getGoodsData(this);
  },
  // 获取商品数据
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  // 去搜索页面
  goSearchPage() {
    wx.navigateTo({
      url: '/pages/searchPage/searchPage',
    })
  },
  // 标签商品页
  goTagGoods(e){
    wx.navigateTo({
      url: `/pages/goodsListModel/goodsListModel?value=${e.currentTarget.dataset.tag}&type=tag`,
    })
  },
  onPullDownRefresh: function () {

  },
  onReachBottom() {
    getGoodsData(this);
  },
  onShareAppMessage: function () {

  }
})