const APP = getApp();
import PagingData from '../../utils/PagingData';
const Paging = new PagingData();
Page({
  data: {
    logs: [],
    pageNum: 1,
    pageLimit: 10,
    loading: true,

    // 分页功能
    FPage: {
      pageNum: 1,
      hasData: true,
      noContent: false,
      noContentImg: APP.imgs.noContentImg
    }
  },
  onLoad(options) {
    Paging.init({
      type: 2,
      that: this,
      url: 'userGrowLogs',
      pushData: 'logs',
      getFunc: this.getList
    })
    this.getList();    
  },
  getList() {
    Paging.getPagesData();
  },
  onPullDownRefresh() {
    Paging.refresh()
  },

  onReachBottom() {
    this.getList()
  },
  onShareAppMessage() {

  }
})