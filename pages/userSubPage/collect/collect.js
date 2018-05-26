const APP = getApp();
import { getList, deleteCollection} from './collectionsData.js'
Page({
  data: {
    collectionList: [],
    pageNum: 1,
    pageLimit: 10,
    loading: true,
    noContent: false,
    noContentImg: APP.imgs.noContentImg
  },
  onLoad(options) {
    getList(this);
  },
  deleteItem(e) {
    let id = APP.utils.getDataSet(e, 'id');
    deleteCollection(this,id)
  },
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
    this.setData({
      collectionList: [],
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