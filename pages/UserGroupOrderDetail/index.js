const APP = getApp();
const STAUTS = ['', '等待付款', '等待发货', '已发货', '交易完成']
Page({
  data: {
    statusName: '',
    orderData: {},
    orderGoods: [],
    id: '',
    group_goods_id: -1,

    statusFontClass: {
      1: 'icon-daifukuan',
      2: 'icon-daifahuo',
      3: 'icon-yifahuo',
      4: 'icon-iconwxz'
    }
  },
  onLoad(options) {
    this.setData({
      id: options.id
    });
    this.getData();
  },
  getGroupGoodsId() {
    APP.ajax({
      url: APP.api.groupGoodsInfo,
      data: {
        group_buy_type: 2,
        goods_id: this.data.orderGoods[0].goods_id
      },
      success: res => {
        this.setData({
          group_goods_id: res.data.id,
        })
      }
    })
  },
  getData() {
    let that = this;
    APP.ajax({
      url: APP.api.orderDetail,
      data: {
        id: this.data.id
      },
      success: res => {
        that.setData({
          statusName: STAUTS[res.data.status],
          orderData: res.data,
          orderGoods: res.data.order_goods_info,
        });
        this.getGroupGoodsId();
      }
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
    this.getData();
  },
  onShareAppMessage: function() {
    let path = `/pages/ComGroupGoodsDetail/?id=${this.data.group_goods_id}&goodsId=${this.data.orderGoods[0].goods_id}`;
    if (this.data.user) {
      path += '&parent_mobile=' + this.data.user.mobile;
    }
    return {
      title: this.data.orderGoods[0].name,
      imageUrl: this.data.orderGoods[0].thum,
      path: path,
    }
  }
})