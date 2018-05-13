const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPopup: false,
    num: 0,
    money: 0,
    password: "",
    items: [
      {
        padding: 0,
        value: '1',
        name: '余额支付',
      },
      {
        padding: 0,
        value: '2',
        name: '支付宝支付',
      },
      {
        padding: 0,
        value: '3',
        name: '微信支付',
      },
    ],
    checked: {
      base: -1,
      color: 1,
      form: -1
    },
    activeColor: '#4b0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      num: options.num,
      money: options.money
    })
  },
  passwordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },
  togglePopup() {
    this.setData({
      showPopup: !this.data.showPopup
    });
  },
  handleSelectChange(e) {
    let type = APP.utils.getDataSet(e, 'type');
    let value = e.detail.value;
    this.setData({
      [`checked.${type}`]: value
    });
  },
  payMoney() {
    // 钱包支付
    let _this = this;
    if (this.data.checked.color == 1) {
      APP.ajax({
        url: APP.api.orderPassword,
        header: { token: APP.globalData.token },
        success(res) {
          if (res.code == 1) {
            _this.togglePopup()
          }
        }
      })
    }
    // 微信支付

    // 支付宝支付
  },
  sendMoney() {
    if (!this.data.password) {
      wx.showToast({
        title: '请填写密码',
        icon: 'none',
      })
      return;
    }
    let _this = this
    APP.ajax({
      url: APP.api.orderMoney,
      header: { token: APP.globalData.token },
      data: {
        order_no: _this.data.num,
        pay_password: _this.data.password
      },
      success(res) {
        // 暂无支付密码
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