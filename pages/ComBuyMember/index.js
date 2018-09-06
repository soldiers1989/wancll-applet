const APP = getApp();
import {
  getMemberParams
} from '../../pages/BarUser/data.js'
Page({
  data: {
    memberParams: {},
    articles: [],
    user: {},
  },
  onLoad: function(options) {
    this.setData({
      user: wx.getStorageSync('user'),
    });
    getMemberParams(this);
    this.getArticles();
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
  goArticle(e){
    let id = APP.utils.getDataSet(e, 'id');
    wx.navigateTo({
      url: '/pages/ComArticle/index?id=' + id + '&type=article',
    })
  },
  goBuy(){
    wx.navigateTo({
      url: '/pages/ComBuyMemberSelect/index?money=' + this.data.memberParams.user.per_money,
    })
  },
})