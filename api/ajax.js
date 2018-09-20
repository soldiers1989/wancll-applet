// 引入配置文件
import {
  headers,
  defaultHost,
} from './config.js'
// 封装原来的请求 添加公共请求头的配置
function ajax(option) {
  let header = Object.assign(headers, option.header)
  //判断本地是否有token
  let token = wx.getStorageSync('token')
  if (token) {
    Object.assign(header, {
      'token': token.token
    })
  }
  return request(option, header)
}
// 微信请求的封装
function request(option, header) {
  // 其他参数
  let options = option || {}
  let url = options.url || ''
  let data = options.data || {}
  let method = options.method || 'POST'

  return new Promise((resolve, reject) => {
    if (!url) {
      console.warn('api 设置错误')
      reject(option)
      return
    }
    // 请求的封装
    wx.request({
      url: `${defaultHost}${url}`,
      data: data,
      header: header,
      method: method,
      dataType: 'json',
      responseType: 'text',
      success: res => {
        // 根据code判断操作 1为返回成功 0为获取失败 其他为异常操作
        if (res.data.code == 1) {
          resolve(res.data)
        } else if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg.toString(),
            icon: 'none'
          })
          reject(res)
        } else {
          // 异常操作 清除本地存储 跳转到首页
          wx.clearStorageSync()
          wx.reLaunch({
            url: '/pages/BarHome/index'
          })
        }
      },
      fail(err) {
        // 错误内容
        console.log(err)
        reject(err)
      }
    })
  })
}

export {
  ajax,
}