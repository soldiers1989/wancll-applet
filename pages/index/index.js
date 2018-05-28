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
    notice: {}, // 首页公告
    goods: [],  // 商品列表
    sellList:[], // 促销列表广告

    // 控制参数
    ready:false, // 数据是否请求成功？
    dataCount:-1,
    pageNum: 1,
  },
  onLoad() {
    // 获取所有数据
    wx.showLoading({
      title: '加载中...',
    })
    let timer = setTimeout(()=>{
      getOtherData(this);
      getGoodsData(this);
      clearTimeout(timer)
    },800)
  },
  // 跳转到商品的详情页面 仅存在于商品列表模块
  goDetail(e) {
    let id = APP.utils.getDataSet(e,'id');
    let param = APP.utils.paramsJoin({
      id:id
    })
    wx.navigateTo({
      url: `/pages/detail/detail?${param}`,
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
    let tag = APP.utils.getDataSet(e,'tag');
    let param = APP.utils.paramsJoin({
      value:tag,
      type:'tag'
    })
    wx.navigateTo({
      url: `/pages/goodsListModel/goodsListModel?${param}`,
    })
  },
<<<<<<< HEAD
  // 下拉刷新事件
  onPullDownRefresh () {
    getOtherData(this);
    // 重置加载页数 和 数据
    this.setData({
      pageNum:1,
      goods: []
    },()=>{
      getGoodsData(this)
    })
=======
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    this.setData({
      goods: [],
      pageNum: 1,
    });
    getGoodsData(this);
    getOtherData(this);
>>>>>>> a6b5b19a6f04240fba71394e1102dc1102a79b22
  },
  // 上拉加载事件
  onReachBottom() {
    getGoodsData(this);
  }
})