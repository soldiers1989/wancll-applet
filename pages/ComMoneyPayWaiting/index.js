const APP = getApp();
import {
  payType
} from '../../api/config.js';
Page({
  data: {
    type: 0,
    id: -1,
    goodsInfo: [],
    isShowShare: true,
    shareImg: '',
    user: {},
  },
  onLoad(options) {
    let goodsInfo = wx.getStorageSync('PayWaitingGoodsList');
    this.setData({
      goodsInfo:goodsInfo,
      type: options.type,
      id: options.id,
      user: wx.getStorageSync('user')
    });
    console.log(goodsInfo);
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
    // let path = `/pages/BarHome/index`;
    let title = this.data.goodsInfo[0].goodsList[0].goods_info[0].goods_info.name;
    let path = `pages/ComDetail/index?id=` + this.data.goodsInfo[0].goodsList[0].goods_info[0].goods_info.id;
    let imageUrl = this.data.goodsInfo[0].goodsList[0].goods_info[0].goods_info.thum;
    if (this.data.user) {
      path += '&parent_mobile=' + this.data.user.mobile;
    }
    console.log(title);
    console.log(path);
    console.log(imageUrl);
    return {
      title: title,
      path: path,
      imageUrl: imageUrl
    }
  }
})