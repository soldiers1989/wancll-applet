const APP = getApp();
Page({

  data: {
    // 轮播参数
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    // 
    imgUrls: [], // 轮播图片
    coupon:[],
  },

  onLoad: function (options) {
    this.getBanners();
    this.getCoupons()
  },

  getBanners() {
    let that = this
    APP.ajax({
      url: APP.api.indexBanners,
      data: { type:"wap领券中心轮播"},
      success(res){
        that.setData({ imgUrls:res.data})
      }
    })
  },

  getCoupons() {
    let that = this
    APP.ajax({
      url: APP.api.myDiscountCoupon,
      data: {},
      success(res) {
        console.log(res.data)
        that.setData({ coupon: res.data })
      }
    })
  },
  draw(e){
    let id=APP.utils.getDataSet(e,'id');
    APP.ajax({
      url: APP.api.myDiscountCouponSave,
      data: {activity_coupon_id:id},
      success(res) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})