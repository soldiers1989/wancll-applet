//app.js
import {
  ajax
} from 'api/ajax.js' // 封装请求
import {
  api
} from 'api/api.js' // 请求连接
import {
  imgs
} from 'api/images.js' // 静态图片 url
import * as util from 'utils/util.js' // 工具函数
import * as validator from './utils/validator.js' // 数据验证
App({
  onLaunch() {
    // 加载城市
    if (!wx.getStorageSync('citys')) {
      ajax({
        url: api.addressRegions,
      }).then(res => {
        wx.setStorageSync('citys', res.data)
      }).catch(err => {})
    }
  },
  ajax,
  api,
  imgs,
  util,
  validator,
})