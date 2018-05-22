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
        if (res.data.length) {
          if (pageNum == 1) {
            that.setData({
              loading: false
            })
          }
          that.setData({
            lists: res.data,
            pageNum: ++pageNum
          })
        } else {
          that.setData({
            loading: false
          })
        }
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

  },
  onReachBottom() {
    this.getData()
  },
  onShareAppMessage() {

  }
})