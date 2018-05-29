const APP = getApp();
Page({
  data: {
    id: '',
    status: '',
    name: '',
    idcard: '',
    idcardFront: '',
    idcardBack: '',
  },
  onLoad: function (options) {
    this.getAuthInfo();
  },
  getAuthInfo() {
    let that = this;
    APP.ajax({
      url: APP.api.queryAuthStatus,
      success(res) {
        that.setData({
          id: res.data.id,
          status: res.data.status,
          name: res.data.name,
          idcard: res.data.id_card,
          idcardFront: res.data.id_card_front_img,
          idcardBack: res.data.id_card_back_img
        })
      }
    })
  },
  submit() {
    wx.navigateTo({
      url: `/pages/userSubPage/idcardAuthSubmit/idcardAuthSubmit?status=${this.data.status}&id=${this.data.id}`,
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
    this.getAuthInfo();
  },
  onShareAppMessage() {
  }
})