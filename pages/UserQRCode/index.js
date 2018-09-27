const APP = getApp()
var QRCode = require("../../static/vender/qrcode.min.js")
var config = require("../../api/config.js")

Page({
  data: {
    bgImg: APP.imgs.myEwmCode,
  },
  canvasId: "canvas",
  onLoad(options) {
    // 组装url
    let host = config.defaultHost
    let str = '/wap/index/handle_qrcode.html?parent_mobile='
    let userMobile = wx.getStorageSync("user").mobile
    let url = host + str + userMobile
    new QRCode('canvas', {
      text: url,
      width: 150,
      height: 150,
      colorDark: "#000000",
      colorLight: "#ffffff",
    })
  },
  onShareAppMessage() {
    return {
      title: '扫码注册领红包',
      path: `${this.route}`
    }
  }
})