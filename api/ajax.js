import { headers } from './config.js';
const APP = getApp();

// 封装原来的请求 添加公共请求头的配置
export function ajax(option) {
  // 配置header
  let headerMust = {
    'auth': headers.auth,
    'client-type': headers.clientType,
  }
  // 合并header参数
  let header = option.header ? Object.assign(option.header, headerMust) : headerMust

  //判断本地是否有token
  let has = wx.getStorageSync('token');
  if (has) {
    let token = { 'token': has.token }
    let tokenHeader = Object.assign(token, header)
    runAjax(option, tokenHeader)
  } else {
    runAjax(option, header)
  }
}
function runAjax(option, header) {
  // 其他参数
  let options = option || {};
  let url = options.url || '';
  let data = options.data || {};
  let method = options.method || 'POST';
  let success = options.success;
  let fail = options.fail;
  let timer = setTimeout(() => {
    wx.showLoading({
      title: '加载中...',
    })
  }, 800)
  wx.request({
    url: url,
    data: data,
    header: header,
    method: method,
    dataType: 'json',
    responseType: 'text',
    success(res) {
      // 存在showLoading时候
      if (timer) {
        wx.hideLoading()
        clearTimeout(timer)
      }
      if (res.data.code == 1) {
        success(res.data);
      } else if (res.data.code == 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
      } else {
        wx.clearStorageSync();
        wx.reLaunch({
          url: '/pages/index/index'
        })
      }
    },
    fail(err) {
      // 存在showLoading时候
      if (timer) {
        wx.hideLoading()
        clearTimeout(timer)
      }
      console.log(err);
      fail && fail(err);
    }
  })
}
