const APP = getApp();
import {
  getKeywords,
  deleteKeywords
} from './data.js';
Page({
  data: {
    keywords: '',
    userKeywordsList: [],
    hotKeywordsList: [],
  },
  onLoad(options) {
    getKeywords(this);
  },
  // 搜索输入框监听
  keywordsInput(e) {
    this.setData({
      keywords: e.detail.value
    })
  },
  // 搜索商品
  search(e) {
    let keywords = APP.util.getDataSet(e, 'keywords').trim()
    if (keywords) {
      let paramStr = APP.util.paramStringify({
        keywords: keywords
      })
      wx.navigateTo({
        url: `/pages/ComGoodsList/index?${paramStr}`,
      })
    }
  },
  // 删除搜索词
  deleteKeywords(e) {
    deleteKeywords(this)
  },
  onPullDownRefresh() {
    getKeywords(this);
  },
  onShareAppMessage() {

  }
})