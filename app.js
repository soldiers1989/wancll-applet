//app.js
import { ajax } from 'api/ajax.js';
import { api } from 'api/api.js';
import { imgs } from 'api/images.js';
App({
  onLaunch: () => {

  },
  // 封装网络请求
  // httpRequest(router, params = {}, callback, headers = {}) {
  //   headers['auth'] = 'Basic_Ivj6eZRxMTx2yiyunZvnG8R69';
  //   headers['client-type'] = 'applet';
  //   wx.request({
  //     url: this.globalData.host + router,
  //     header: headers,
  //     data: params,
  //     success(resp) {
  //       if (resp.data.code == 1) {
  //         callback(resp.data);
  //       } else {
  //         wx.showToast({
  //           title: resp.data.msg,
  //           icon: 'none',
  //         })
  //       }
  //     },
  //     fail(err) {
  //       wx.showToast({
  //         title: '哎呀，网络粗错了',
  //         icon: 'none',
  //       });
  //       console.log(err);
  //     }
  //   })
  // },
  // 全局变量
  globalData: {
    hasLogin: false,
  },
  // 请求方法
  ajax: ajax,
  // 接口文件
  api: api,
  // 图片
  imgs: imgs
})