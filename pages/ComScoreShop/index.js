const APP = getApp();
import PagingData from '../../utils/PagingData';
const Paging = new PagingData();
import {
  getUserAsset,
  getScoreOrdersCount,
  getUser
} from './data.js';
import {
  signIn
} from '../BarUser/data.js';

Page({
  data: {
    goodsList: [],
    user: {}, // 用户
    asset: {},
    orderCount: {
      wait_finish_num: 0,
      wait_ship_num: 0
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
    Paging.init({
      type: 2,
      that: this,
      url: 'scoreGoods',
      pushData: 'goodsList',
      getFunc: this.getList
    })
    this.getList();
  },
  onShow() {
    getUser(this);
    getUserAsset(this);
    getScoreOrdersCount(this);
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
  signIn() {
    signIn(this);
  },
  goOrderList(e) {
    let target = APP.utils.getDataSet(e, 'target')
    wx.navigateTo({
      url: `/pages/UserScoreOrderList/index?target=${target}`,
    })
  },
  goScoreLog() {
    wx.navigateTo({
      url: `/pages/UserScoreLog/index`,
    });
  },
  goGoodsDetail(e) {
    let id = APP.utils.getDataSet(e, 'id');
    let goodsId = APP.utils.getDataSet(e, 'goodsId');
    wx.navigateTo({
      url: `/pages/ComScoreGoodsDetail/index?id=${id}&goodsId=${goodsId}`,
    })
  },
})