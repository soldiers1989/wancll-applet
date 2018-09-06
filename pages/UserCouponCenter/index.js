const APP = getApp();
import PagingData from '../../utils/PagingData';
const Paging = new PagingData();
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
    imgUrls: [], // 轮播图片
    coupon: [],
    // 分页功能
    FPage: {
      pageNum: 1,
      hasData: true,
      noContent: false,
      noContentImg: APP.imgs.noContentImg
    }
  },

  onLoad(options) {
    this.getBanners();
    Paging.init({
      type: 2,
      that: this,
      url: 'myDiscountCoupon',
      pushData: 'coupon',
      getFunc: this.getCoupons
    })
    this.getCoupons(this.data.tabSelectedId);
  },
  getBanners() {
    APP.ajax({
      url: APP.api.indexBanners,
      data: {
        type_id: 32
      },
      success: (res) => {
        this.setData({
          imgUrls: res.data
        })
      }
    })
  },
  getCoupons() {
    Paging.getPagesData({
      handler: (data) => {
        data.forEach(item => {
          item.bg_img = APP.imgs.couponGet;
          item.change_value = parseFloat(item.change_value)
        });
        return data;
      }
    });
  },
  // 跳转处理
  goModel(e) {
    let redirectData = APP.utils.getDataSet(e, 'redirect');
    APP.utils.goModel(redirectData);
  },
  // 下拉刷新
  onPullDownRefresh() {
    Paging.refresh()
  },
  // 上拉加载
  onReachBottom() {
    this.getCoupons();
  },
  draw(e) {
    let id = APP.utils.getDataSet(e, 'id');
    APP.ajax({
      url: APP.api.myDiscountCouponSave,
      data: {
        activity_coupon_id: id
      },
      success(res) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      }
    })
  },
})