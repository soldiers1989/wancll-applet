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
  onLoad(options) {},
  onShow(){
    getKeywords(this);
  },
  // 搜索输入框监听
  keywordsInput(e) {
    this.setData({
      keywords: e.detail.value
    })
  },
  searchClick(e){
    let keywords = APP.util.getDataSet(e, 'keywords')
    if (keywords) {
      let paramStr = APP.util.paramStringify({
        keywords: keywords
      })
      wx.navigateTo({
        url: `/pages/ComGoodsList/index?${paramStr}`,
      })
    }
  },
  // 搜索商品
  search(e) {
    let keywords = this.data.keywords
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
    wx.stopPullDownRefresh()
  },
  onShareAppMessage() {

  }
})