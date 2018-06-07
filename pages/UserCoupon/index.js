const APP = getApp();
Page({
  data: {
    pageNum: 1,
    pageLimit: 10,
    tabList: [{
      id: 1,
      title: '未使用'
    }, {
      id: 2,
      title: '已使用'
    }, {
      id: 3,
      title: '已过期'
    }],
    tabSelectedId: 1,
    loading: true,
    discountList: [],
    enterConvert: ''
  },
  onLoad(options) {
    this.getList(this.data.tabSelectedId);
  },
  getList(status) {
    let data = {}
    if (status == 3) {
      data = { expiry_time: "" }
    } else {
      data = { status: status }
    }
    let pageNum = this.data.pageNum;
    let discountList = this.data.discountList
    APP.ajax({
      url: APP.api.myDiscount,
      header: {
        'page-limit': this.data.pageLimit,
        'page-num': pageNum,
      },
      data: data,
      success:res =>{
        if (res.data.length) {
          res.data.forEach(item => {
            if (!item.is_expiry && item.status != 2) {
              item.bg_img = APP.imgs.coupon
            } else {
              item.bg_img = APP.imgs.couponPass
            }
            item.change_value = parseFloat(item.change_value)
          });
          this.setData({
            discountList: res.data,
            pageNum: ++pageNum
          })
        } else {
          this.setData({
            loading: false
          })
        }
      }
    })
  },
  tabchange(e) {
    let id = this.selectComponent("#tab").data.selectedId
    // 禁止重复点击
    if (id == this.data.tabSelectedId) {
      return;
    }
    this.setData({
      tabSelectedId: id,
      pageNum: 1,
    }, () => {
      this.getList(id);
    })
  },
  enterConvert(e) {
    this.setData({
      enterConvert: e.detail.value
    })
  },
  goCenter() {
    wx.navigateTo({ url: `/pages/UserCouponCenter/index` })
  },
  convert() {
    let that = this;
    if (!this.data.enterConvert) {
      wx.showToast({
        title: '输入兑换码',
        icon: 'none',
      })
      return
    }
    APP.ajax({
      url: APP.api.myDiscountReceive,
      data: {
        coupon_no: that.data.enterConvert
      },
      success(res) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
        setTimeout(() => {
          that.getList(that.datatabSelectedId)
        }, 1000)
      }
    })
  },
  goBuy() {
    wx.switchTab({ url: `/pages/BarCategory/index` })
  },
  // 刷新
  refresh(){
    this.setData({
      discountList: [],
      pageNum: 1
    }, () => {
      this.getList(this.data.tabSelectedId)
    })
  },
  // 显示刷新
  onShow() {
    this.refresh()
  },
  // 下拉刷新
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
    this.refresh()
  },
  // 上拉加载
  onReachBottom() {
    this.getList(this.data.tabSelectedId);
  },
})