//app.js
App({
  onLaunch: () => {

  },
  // 封装网络请求
  httpRequest(router, params = {}, callback, headers = {}) {
    headers['auth'] = 'Basic_Ivj6eZRxMTx2yiyunZvnG8R69';
    headers['client-type'] = 'applet';
    wx.request({
      url: this.globalData.host + router,
      header: headers,
      data: params,
      success(resp) {
        if (resp.data.code == 1) {
          callback(resp.data);
        } else {
          wx.showToast({
            title: resp.data.msg,
            icon: 'none',
          })
        }
      },
      fail(err) {
        wx.showToast({
          title: '哎呀，网络粗错了',
          icon: 'none',
        });
        console.log(err);
      }
    })
  },
  // 全局变量
  globalData: {
    hasLogin: false,
    host: 'http://wancllshop.wx.wygoo.com/index.php/',
  }
})