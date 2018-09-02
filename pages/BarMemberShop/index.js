const APP = getApp();
import PagingData from '../../utils/PagingData';
const Paging = new PagingData();
import {
  params
} from '../../api/config.js';
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
    },
    isMember: false,
  },
  onLoad() {
    this.setData({
      user: wx.getStorageSync('user'),
    });
    this.checkIsMember();
    Paging.init({
      type: 2,
      that: this,
      url: 'goods',
      pushData: 'goodsList',
      getFunc: this.getList
    })
    this.getList();
  },
  getList() {
    Paging.getPagesData({
      postData: {
        is_member_good: 1
      },
    });
  },
  // 判断是否金卡会员
  checkIsMember() {
    if (this.data.user && this.data.user.member_level == params.bcMember) {
      this.setData({
        isMember: true
      });
    }
  },
  goBuyMember(){
    wx.navigateTo({
      url: '/pages/ComBuyMember/Index',
    })
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