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
    enterConvert:''
  },
  onLoad: function (options) {
    this.getList(this.data.tabSelectedId);
  },
  getList(status) {
    let that = this
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
        'page-limit': that.data.pageLimit,
        'page-num': pageNum,
      },
      data: data,
      success(res) {
        if (res.data.length) {
          console.log(res.data)
          res.data.forEach(item => {
            if(!item.is_expiry && item.status!=2){
              item.bg_img = APP.imgs.coupon
            }else{
              item.bg_img = APP.imgs.couponPass
            }
            item.change_value = parseFloat(item.change_value)
          });
          that.setData({
            discountList: res.data,
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
    wx.navigateTo({ url: `/pages/userSubPage/discountCenter/diecountCenter` })
  },
  convert() {
    let that = this
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
        setTimeout(()=>{
          that.getList(that.datatabSelectedId)
        },1000)
      }
    })
  },
  goBuy(){
    wx.switchTab({ url: `/pages/category/category` })
  },
  onShow(){
    this.setData({
      discountList: [],
      pageNum: 1
    },()=>{
      this.getList(this.data.tabSelectedId)
    })
    
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
})