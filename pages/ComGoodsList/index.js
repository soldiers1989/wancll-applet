const APP = getApp();
import { getGoodsList } from './data.js';
Page({
  data: {
    goodsList: [],
    pageNum: 1,
    loading: true,
    data: {},
    noContent: false,
    noContentImg: APP.imgs.noContentImg
  },
  onLoad: function (options) {
    this.setData({
      data: {
        [options.type]: options.value
      }
    });
    getGoodsList(this);
  },
  // 获取商品数据
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/ComDetail/index?id=${id}`,
    })
  },
  onReachBottom() {
    this.setData({
      loading: true
    });
    getGoodsList(this);
  },
  onShareAppMessage() {

  }
})