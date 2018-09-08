const APP = getApp();
import PagingData from '../../utils/PagingData';
const Paging = new PagingData();
import {
  getGroupOrdersCount,
  getGroupBanner,
  getGroupParams
} from './data.js';
import {
  signIn
} from '../BarUser/data.js';

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

    banner: [], // 轮播图

    goodsList: [],
    user: {}, // 用户
    asset: {},
    orderCount: {
      wait_pay_num: 0,
      wait_team_num: 0,
      wait_finish_num: 0,
      wait_ship_num: 0,
    },
    // 分页功能
    FPage: {
      pageNum: 1,
      hasData: true,
      noContent: false,
      noContentImg: APP.imgs.noContentImg
    }
  },
  onLoad() {
    getGroupBanner(this);
    Paging.init({
      type: 2,
      that: this,
      url: 'groupGoods',
      pushData: 'goodsList',
      getFunc: this.getList
    })
    this.getList();
  },
  onShow() {
    getGroupOrdersCount(this);
    getGroupParams(this);
  },
  getList() {
    Paging.getPagesData();
  },
  onPullDownRefresh() {
    Paging.refresh()
  },
  onReachBottom() {
    this.getList();
  },
  goOrderList(e) {
    let target = APP.utils.getDataSet(e, 'target')
    wx.navigateTo({
      url: `/pages/UserGroupOrderList/index?target=${target}`,
    })
  },
  // 跳转处理
  goModel(e) {
    let redirectData = APP.utils.getDataSet(e, 'redirect');
    APP.utils.goModel(redirectData);
  },
  goGoodsDetail(e) {
    let id = APP.utils.getDataSet(e, 'id');
    let goodsId = APP.utils.getDataSet(e, 'goodsId');
    wx.navigateTo({
      url: `/pages/ComGroupGoodsDetail/index?id=${id}&goodsId=${goodsId}`,
    })
  },
})