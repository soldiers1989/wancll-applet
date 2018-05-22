const APP = getApp();
Page({
  data: {
    goodsComments:[],
    pageNum: 1,
    pageLimit: 10,
    loading: true,
  },
  onLoad (options) {
    this.getData();
  },
  getData(){
    let that = this
    let pageNum = this.data.pageNum;
    let goodsComments = this.data.goodsComments
    APP.ajax({
      url: APP.api.itemComments,
      header: {
        'page-limit': that.data.pageLimit,
        'page-num': pageNum,
      },
      success(res) {
        that.setData({
          goodsComments: res.data,
          pageNum: ++pageNum
        })
      }
    })
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
    this.getData();
  },
  onShareAppMessage: function () {
  
  }
})