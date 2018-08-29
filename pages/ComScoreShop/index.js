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

  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/ComDetail/index?id=${id}`,
    })
  },

})