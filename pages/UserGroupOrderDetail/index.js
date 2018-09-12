const APP = getApp();
Page({
  data: {
    statusName: '',
    orderData: {},
    orderGoods: [],
    id: '',
    group_goods_id: -1,
    // 订单状态显示
    status: {
      name: '',
      fontClass: '',
    },
    avatar: APP.imgs.avatar,
    timeDown: '',
    user: {},
  },
  onLoad(options) {
    this.setData({
      id: options.id,
      user: wx.getStorageSync('user'),
    });
    this.getData();
  },
  setStatus() {
    let status = {
      name: '',
      fontClass: 'icon-daifahuo',
    };
    if (this.data.orderData.status == 1) {
      status.name += '等待付款';
      status.fontClass = 'icon-daifukuan';
    } else if (this.data.orderData.status == 2 && this.data.orderData.group_buy_status == 1) {
      status.name += '拼团中';
    } else if (this.data.orderData.group_buy_status == 2 || this.data.orderData.group_buy_status == 4) {
      status.name += '拼团失败(退款中)';
    } else if (this.data.orderData.group_buy_status == 5) {
      status.name += '拼团失败(已退款)';
    } else if (this.data.orderData.status == 2 && this.data.orderData.group_buy_status == 3) {
      status.name += '待发货';
    } else if (this.data.orderData.status == 3 && this.data.orderData.group_buy_status == 3) {
      status.name += '已发货';
      status.fontClass = 'icon-yifahuo';
    } else if (this.data.orderData.status == 4 && this.data.orderData.group_buy_status == 3) {
      status.name += '交易完成';
    } else if (this.data.orderData.status == 9) {
      status.name += '订单已取消';
      status.fontClass = 'icon-iconwxz';
    }

    this.setData({
      status: status,
    });

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
          orderData: res.data,
          orderGoods: res.data.order_goods_info,
        });
        this.getGroupGoodsId();
        this.setStatus();
        this.getTeamInfo();
      }
    })
  },
  getTeamInfo() {
    APP.ajax({
      url: APP.api.groupTeamDetail,
      data: {
        order_pid: this.data.orderData.group_buy_order_pid || this.data.orderData.id
      },
      success: res => {
        setInterval(() => {
          APP.utils.timeDown(this, res.data.end_time_stamp * 1000)
        }, 1000)
        this.setData({
          team: res.data
        });
      }
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
    this.getData();
  },
  onShareAppMessage: function() {
    let path = `/pages/ComGroupGoodsDetail/index?id=${this.data.group_goods_id}&goodsId=${this.data.orderGoods[0].goods_id}`;
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