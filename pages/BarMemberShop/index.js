const APP = getApp();
import PagingData from '../../utils/PagingData';
const Paging = new PagingData();
import {
  getUserAsset,
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
      url: 'goods',
      pushData: 'goodsList',
      getFunc: this.getList
    })
    this.getList();
  },
  onShow() {
    getUser(this);
    getUserAsset(this);
  },
  getList() {
    Paging.getPagesData({
      postData:{is_member_good:1},
    });
  },
  onPullDownRefresh() {
    Paging.refresh()
  },
  onReachBottom() {
    this.getList();
  },
  goGoodsDetail(e) {
    let id = APP.utils.getDataSet(e, 'id');
    wx.navigateTo({
      url: `/pages/ComDetail/index?id=${id}`,
    })
  },
})