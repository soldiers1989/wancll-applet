//app.js
import { ajax } from 'api/ajax.js';   // 封装请求
import { api } from 'api/api.js';     // 请求连接
import { imgs } from 'api/images.js'; // 静态图片url
import Utils from 'utils/util.js';   // 工具函数
import Token from 'api/token.js';
App({
  onLaunch() {
    // 判断当前token是否存在
    this.globalData.hasLogin = wx.getStorageSync('token') ? true : false;
    // 获取token
    if (this.globalData.hasLogin){
      Token.getToken(this)
      Token.getUser(this)
    }

  },

  // 全局变量
  globalData: {
    hasLogin: false,
    token: '',
    user:{}
  },
  // ---------------------
  // 添加一些内置方法

  // 请求方法
  ajax: ajax,
  // 接口文件
  api: api,
  // 图片
  imgs: imgs,
  // 获得点击参数
  getDataSet: Utils.getDataSet,
  
})