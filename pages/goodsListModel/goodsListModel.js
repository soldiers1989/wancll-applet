const APP = getApp();
import { getGoodsList } from './goodsListModelData.js';
Page({
  data: {
    goodsList: [],
    pageNum: 1,
    loading: true,
    data: {},
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
      url: `/pages/detail/detail?id=${id}`,
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