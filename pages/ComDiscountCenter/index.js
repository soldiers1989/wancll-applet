const APP = getApp();
Page({
  data: {
    banner: [],
    discount: {}, // 限时折扣活动
    timeDown: '0天 00 : 00 : 00', // 倒计时
    list: [], // 限时折扣商品列表
  },
  onLoad: function(options) {
    this.getBanner();
    this.getDiscount();
  },
  // 获取限时折扣商品
  getDiscount() {
    APP.ajax({
      url: APP.api.indexActivity,
      success: res => {
        if (res.data.discount) {
          this.setData({
            discount: res.data.discount[0],
            list: res.data.discount[0].rule_info,
          });
        }
        if (this.data.discount.id) {
          setInterval(() => {
            APP.utils.timeDown(this, this.data.discount.end_timestamp * 1000)
          }, 1000)
        }
      },
    });
  },
  // 获取轮播图
  getBanner() {
    APP.ajax({
      url: APP.api.indexBanners,
      data: {
        type_id: 33,
      },
      success: res => {
        this.setData({
          banner: res.data
        });
      }
    });
  },
  goDetailDiscount(e) {
    let id = APP.utils.getDataSet(e, 'id');
    let param = APP.utils.paramsJoin({
      id: id,
      isDiscountGoods: 1
    })
    wx.navigateTo({
      url: `/pages/ComDetail/index?${param}`,
    })
  },
  onShow: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
})