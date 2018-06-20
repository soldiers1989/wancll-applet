const APP = getApp();

Page({
  data: {
    bgImg: APP.imgs.DRcenter,
    user:{},
    bonusData:{},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user');
    APP.ajax({
      url: APP.api.bonusCenter,
      success:res=>{
        console.log(res.data)
        this.setData({
          bonusData: res.data,
          user: user
        })
      }
    })
  },
  goSubPage(e){
    let target = APP.utils.getDataSet(e,'target');
    wx.navigateTo({
      url: `/pages/UserDBCenter${target}/index`,
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})