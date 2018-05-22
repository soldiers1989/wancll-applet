const APP = getApp();
Page({
  data: {
    asset:{},
    user:{},
    lists:[],
    pageNum: 1,
    pageLimit: 10,
    loading: true
  },
  onLoad: function (options) {
    this.getAsset()
    this.getLists()
  },
  getAsset(){
    let that = this
    let user = wx.getStorageSync('user')
    APP.ajax({
      url: APP.api.userAsset,
      success(res){
        that.setData({ 
          asset:res.data,
          user: user
        })
      }
    })
  },
  getLists() {
    let that = this
    let pageNum = this.data.pageNum;
    let lists = this.data.lists
    APP.ajax({
      url: APP.api.userGrowLogs,
      header: {
        'page-limit': that.data.pageLimit,
        'page-num': pageNum,
      },
      success(res) {
        if (res.data.length) {
          that.setData({
            lists: lists.concat(res.data),
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
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
    this.getLists()
  },
  onShareAppMessage: function () {
  
  }
})