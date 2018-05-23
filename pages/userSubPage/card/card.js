const APP = getApp();
Page({
  data: {
    lists: [],
    pageNum: 1,
    pageLimit: 10,
    loading: true,
  },
  onLoad(options) {
    this.getData()
  },
  getData() {
    let that = this
    let pageNum = this.data.pageNum;
    let lists = this.data.lists
    APP.ajax({
      url: APP.api.myBankCard,
      data: {
        'page-limit': that.data.pageLimit,
        'page-num': pageNum,
      },
      success(res) {
        that.setData({
          loading: false
        });
        wx.stopPullDownRefresh();
        if (res.data.length) {
          that.setData({
            lists: res.data,
            pageNum: ++pageNum
          })
        }
      },
      fail(err){
        wx.stopPullDownRefresh();
        that.setData({
          loading: false
        })
      }
    })
  },
  editBankCard(e) {
    let id = APP.utils.getDataSet(e, 'id');
    wx.navigateTo({
      url: `/pages/userSubPage/cardEdit/cardEdit?id=${id}`,
    })
  },
  onPullDownRefresh() {
    this.setData({
      lists: [],
      pageNum: 1
    })
    this.getData();
  },
  onReachBottom() {
    this.getData()
  },
  onShareAppMessage() {

  }
})