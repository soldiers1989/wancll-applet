const APP = getApp();
import {
  getMemberParams
} from '../../pages/BarUser/data.js';
import {
  params
} from '../../api/config.js';
Page({
  data: {
    memberParams: {},
    articles: [],
    user: {},
    isMember: false,
  },
  onLoad: function(options) {
    this.setData({
      user: wx.getStorageSync('user'),
    });
    getMemberParams(this);
    this.checkIsMember();
    this.getArticles();
  },
  // 判断是否金卡会员
  checkIsMember() {
    if (this.data.user && this.data.user.member_level == params.bcMember) {
      this.setData({
        isMember: true
      });
    }
  },
  getArticles() {
    APP.ajax({
      url: APP.api.memberArticle,
      success: res => {
        this.setData({
          articles: res.data
        });
      }
    });
  },
  goArticle(e) {
    let id = APP.utils.getDataSet(e, 'id');
    wx.navigateTo({
      url: '/pages/ComMemberArticle/index?id=' + id,
    })
  },
  goBuy() {
    wx.navigateTo({
      url: '/pages/ComBuyMemberSelect/index?money=' + this.data.memberParams.user.per_money,
    })
  },
})