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
        console.log(res.data)
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
        console.log(res.data)
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getLists()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})