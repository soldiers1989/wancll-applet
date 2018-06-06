const APP = getApp();
import { getList } from './data.js';
Page({
  data: {
    lists: [],
    pageNum: 1,
    pageLimit: 10,
    noContent: false,
    noContentImg: APP.imgs.noContentImg
  },
  onLoad(options) {
    getList(this);
  },
  editBankCard(e) {
    let id = APP.utils.getDataSet(e, 'id');
    wx.navigateTo({
      url: `/pages/cardEdit/cardEdit?id=${id}`,
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
    this.setData({
      lists: [],
      pageNum: 1
    })
    getList(this);
  },
  onReachBottom() {
    getList(this);
  },
  onShareAppMessage() {

  }
})