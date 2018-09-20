const APP = getApp()
Page({
  data: {
    tabList: [{
      id: 1,
      name: '未使用'
    }, {
      id: 2,
      name: '已使用'
    }, {
      id: 3,
      name: '已过期'
    }],
    tabSelectedId: 1,
    list: [],
    haveNoData: false,
    noContentImg: APP.imgs.noContentImg,
    convertCode: '',
  },
  onLoad(options) {},
  onShow() {
    this.setData({
      page: 1,
      list: []
    })
    this.getList()
  },
  getList(status) {
    let data = {}
    if (this.data.tabSelectedId == 3) {
      data = {
        expiry_time: ""
      }
    } else {
      data = {
        status: this.data.tabSelectedId
      }
    }
    APP.ajax({
      url: APP.api.couponList,
      data: data
    }).then(res => {
      let list = APP.util.arrayToUnique(this.data.list.concat(res.data))
      list = list.map(item => {
        if (!item.is_expiry && item.status != 2) {
          item.bg_img = APP.imgs.coupon
        } else {
          item.bg_img = APP.imgs.couponPass
        }
        return item
      })
      this.setData({
        list: list,
        haveNoData: !Boolean(list.length),
        page: this.data.page + 1
      })
    })
  },
  tabChange(event) {
    this.setData({
      tabSelectedId: event.detail,
      page: 1,
      list:[],
    })
    this.getList()
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      page: 1,
      list: [],
    })
    this.getList()
    wx.stopPullDownRefresh()
  },
  // 上拉加载
  onReachBottom() {
    this.getList()
  },
  // 兑换码输入
  codeInput(e) {
    this.setData({
      convertCode: e.detail.value
    })
  },
  // 去领券中心
  goCenter() {
    wx.navigateTo({
      url: `/pages/UserCouponCenter/index`
    })
  },
  // 兑换
  convert() {
    if (!this.data.convertCode) {
      APP.util.toast('请输入兑换码')
      return
    }
    APP.ajax({
      url: APP.api.couponConvert,
      data: {
        coupon_no: this.data.convertCode
      }
    }).then(res => {
      APP.util.toast(res.msg)
      this.setData({
        page: 1,
        list: [],
      })
      this.getList()
    }).catch(err => {})
  },
  goBuy() {
    wx.switchTab({
      url: `/pages/BarCategory/index`
    })
  },
})