const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logs:[],
    pageNum: 1,
    pageLimit: 10,
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getData()
  },
  getData() {
    let that = this
    let pageNum = this.data.pageNum;
    let logs = this.data.logs
    APP.ajax({
      url: APP.api.myWalletLog,
      header: {
        'page-limit': that.data.pageLimit,
        'page-num': pageNum,
      },
      success(res) {
        if(res.data.length){
          that.setData({
            logs: logs.concat(res.dat),
            pageNum: ++pageNum
          })
        }else{
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
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})