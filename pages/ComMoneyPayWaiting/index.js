const APP = getApp();
import {
  payType
} from '../../api/config.js';
Page({
  data: {
    type: 0,
    id: -1,
  },
  onLoad(options) {
    this.setData({
      type: options.type,
      id: options.id
    });
  },

  goHome() {
    wx.switchTab({
      url: '/pages/BarHome/index',
    })
  },
  goOrder() {
    let route = '';
    if(this.data.type == 1){
      route = 'UserOrderDetail';
    }else if(this.data.type == 2){
      route = 'UserScoreOrderDetail';
    }

    wx.navigateTo({
      url: '/pages/' + route + '/index?id=' + this.data.id,
    })
  },
  onShareAppMessage() {
    let path = `${this.route}`;
    return {
      title: '爱买优品：坚持经营高性价比产品，爱买优选任你挑～',
      path: path,
    }
  }
})