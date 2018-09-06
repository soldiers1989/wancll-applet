// pages/UserQRCode/index.js
const APP = getApp()
var QRCode = require("../../static/vender/qrcode.min.js");
var config = require("../../api/config.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImg: '',
    shareImg:'',
  },
  canvasId: "canvas",
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 请求背景图片
    APP.ajax({
      url: APP.api.indexBackground,
      data: {
        position: 'qrcode'
      },
      success: res => {
        this.setData({
          bgImg: res.data[0].img
        });
      },
    });

    // 请求分享封面图
    APP.ajax({
      url: APP.api.indexBackground,
      data: {
        position: 'share'
      },
      success: res => {
        this.setData({
          shareImg: res.data[0].img
        });
      },
    });

    // 组装url
    let host = config.defaultHost;
    let str = '/wap/index/handle_qrcode.html?parent_mobile=';
    let userMobile = wx.getStorageSync("user").mobile;
    let url = host + str + userMobile
    new QRCode('canvas', {
      text: url,
      width: 150,
      height: 150,
      colorDark: "#000000",
      colorLight: "#ffffff",
    });
  },
  onShareAppMessage: function() {
    let path = `/pages/BarHome/index`;
    if (this.data.user) {
      path += '?parent_mobile=' + this.data.user.mobile;
    }
    return {
      title: '爱买优品：坚持经营高性价比产品，爱买优选任你挑～',
      path: path,
      imageUrl: this.data.shareImg
    }
  }
})