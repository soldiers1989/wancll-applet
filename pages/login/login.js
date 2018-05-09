const app = getApp();
Page({
  data: {
    logo: 'http://wancllshop.wx.wygoo.com/public/static/wap/images/wap_logo.png',
    mobile: '',
    password: ''
  },
  onLoad: function (options) {

  },
  login() {
    console.log(this.data.mobile);
    console.log(this.data.password);
  }
})