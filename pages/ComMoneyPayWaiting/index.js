const APP = getApp();
import {
  payType
} from '../../api/config.js';
Page({
  data: {
    type: 0,
    id: -1,
    isShowShare: true,
  },
  onLoad(options) {
    this.setData({
      type: options.type,
      id: options.id
    });
  },
  // 关闭弹窗
  closePacket() {
    this.setData({
      isShowShare: false
    });
  },
  goHome() {
    wx.switchTab({
      url: '/pages/BarHome/index',
    })
  },
  goOrder() {
    let route = '';
    if (this.data.type == 1) {
      route = 'UserOrderDetail';
    } else if (this.data.type == 2) {
      route = 'UserScoreOrderDetail';
    }

    wx.navigateTo({
      url: '/pages/' + route + '/index?id=' + this.data.id,
    })
  },
  onShareAppMessage() {
    // 分享首页
    let path = `/pages/Home/index`;
    return {
      title: '爱买优品：坚持经营高性价比产品，爱买优选任你挑～',
      path: path,
    }
  }
})