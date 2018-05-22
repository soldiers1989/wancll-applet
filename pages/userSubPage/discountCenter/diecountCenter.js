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
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})