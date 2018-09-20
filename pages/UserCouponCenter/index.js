const APP = getApp()
Page({
  data: {
    // 轮播参数
    bannerConfig: {
      indicatorDots: false,
      vertical: false,
      autoplay: true,
      circular: false,
      interval: 2000,
      duration: 500,
      previousMargin: 0,
      nextMargin: 0,
    },
    // 轮播图
    bannerList: [],
    // 优惠券
    list: [],
    page: 1,
    haveNoContent: false,
    noContentImg: APP.imgs.noContentImg,
  },
  onLoad(options) {},
  onShow() {
    this.getBanners()
    this.getList()
  },
  getBanners() {
    APP.ajax({
      url: APP.api.bannerList,
      data: {
        type_id: 28,
      },
    }).then(res => {
      this.setData({
        bannerList: res.data
      })
    }).catch(err => {})
  },
  getList() {
    APP.ajax({
      url: APP.api.coupons,
      header: {
        'page-num': this.data.page,
        'page-limit': 10,
      }
    }).then(res => {
      let list = APP.util.arrayToUnique(this.data.list.concat(res.data))
      list = list.map(item => {
        item.bg_img = APP.imgs.couponGet
        return item
      })
      this.setData({
        list: list,
        haveNoData: !Boolean(list.length),
        page: this.data.page + 1
      })
    }).catch(err => {})
  },
  draw(e) {
    let id = APP.util.getDataSet(e, 'id')
    APP.ajax({
      url: APP.api.couponSave,
      data: {
        activity_coupon_id: id
      },
    }).then(res => {
      APP.util.toast(res.msg)
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    this.setData({
      page: 1,
      list: [],
    })
    this.getList()
    this.getBanners()
  },
  onReachBottom() {
    this.getList()
  }
})