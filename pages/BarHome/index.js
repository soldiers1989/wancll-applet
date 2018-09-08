const APP = getApp();
import {
  getOtherData,
  getBackground
} from './data.js';
import PagingData from '../../utils/PagingData';
const Paging = new PagingData();
Page({
  data: {
    // 轮播参数
    indicatorDots: false,
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
    goods: [], // 商品列表
    sellList: [], // 促销列表广告(5个圆形图片)
    discount: [], // 限时折扣活动列表
    full: [], // 减免活动列表
    wapIndex: [], // 广告轮播产品
    tags: [],

    foreignGoods: [], // 海外专区商品
    groupGoods: [], // 团购专区商品
    scoreGoods: [], // 积分专区商品

    backgroundImgs: {}, // 背景图片

    timeDown: '0天 00 : 00 : 00', // 倒计时

    isShowPacket: false, // 是否显示注册弹窗
    user: {},

    // 控制参数
    ready: false, // 数据是否请求成功？

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
  onLoad() {
    getBackground(this);
    Paging.init({
      type: 2,
      that: this,
      url: 'goods',
      pushData: 'goods',
      getFunc: this.getGoodsData
    })
    // 获取所有数据
    wx.showLoading({
      title: '加载中...',
    })
    let timer = setTimeout(() => {
      getOtherData(this);
      this.getGoodsData();
      clearTimeout(timer)
    }, 500)
  },
  onShow() {
    this.setData({
      user: wx.getStorageSync('user'),
    });
    if (!this.data.user) {
      this.setData({
        isShowPacket: true
      });
    }
  },
  // 关闭弹窗
  closePacket() {
    this.setData({
      isShowPacket: false
    });
  },
  // 获取商品数据
  getGoodsData() {
    let data = {
      goods_cate_id: '',
      is_member_good: 0
    }
    Paging.getPagesData({
      postData: data
    })
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    getOtherData(this);
    Paging.refresh()
  },
  // 上拉加载事件
  onReachBottom() {
    this.getGoodsData();
  },
  // 跳转到商品的详情页面 仅存在于商品列表模块
  goDetail(e) {
    let id = APP.utils.getDataSet(e, 'id');
    let param = APP.utils.paramsJoin({
      id: id
    })
    wx.navigateTo({
      url: `/pages/ComDetail/index?${param}`,
    })
  },
  // 跳转到商品的详情页面 仅存在于线上折扣
  goDetailDiscount(e) {
    let id = APP.utils.getDataSet(e, 'id');
    let discountid = APP.utils.getDataSet(e, 'discountid');
    let param = APP.utils.paramsJoin({
      id: id,
      isDiscountGoods: 1
    })
    wx.navigateTo({
      url: `/pages/ComDetail/index?${param}`,
    })
  },
  // 跳转积分商品详情
  goScoreGoodsDetail(e) {
    let id = APP.utils.getDataSet(e, 'id');
    let goods_id = APP.utils.getDataSet(e, 'goodsId');
    let param = APP.utils.paramsJoin({
      id: id,
      goodsId: goods_id
    })
    wx.navigateTo({
      url: `/pages/ComScoreGoodsDetail/index?${param}`,
    })
  },

  // 跳转团购商品详情
  goGroupGoodsDetail(e) {
    let id = APP.utils.getDataSet(e, 'id');
    let goods_id = APP.utils.getDataSet(e, 'goodsId');
    let param = APP.utils.paramsJoin({
      id: id,
      goodsId: goods_id
    })
    wx.navigateTo({
      url: `/pages/ComGroupGoodsDetail/index?${param}`,
    })
  },

  // 跳转到文章详情页面
  goArticle(e) {
    let id = APP.utils.getDataSet(e, 'id');
    let type = APP.utils.getDataSet(e, 'type');
    let param = APP.utils.paramsJoin({
      id: id,
      type: type
    })
    wx.navigateTo({
      url: `/pages/ComArticle/index?${param}`,
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

  // 去限时折扣广场
  goDiscountCenter() {
    wx.navigateTo({
      url: '',
    })
  },

  // 去搜索页面
  goSearchPage() {
    wx.navigateTo({
      url: '/pages/ComSearch/index',
    })
  },
  // 跳转处理
  goModel(e){
    let redirectData = APP.utils.getDataSet(e, 'redirect');
    APP.utils.goModel(redirectData);
  },

  // 分享
  onShareAppMessage: function() {
    let path = `${this.route}`;
    if (this.data.user) {
      path += '?parent_mobile=' + this.data.user.mobile;
    }
    return {
      title: '爱买优品：坚持经营高性价比产品，爱买优选任你挑～',
      path: path,
    }
  }
})