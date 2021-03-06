const APP = getApp();
Page({
  data: {
    // 页面参数
    id: '',
    // 轮播参数
    bannerConfig: {
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      circular: false,
      interval: 2000,
      duration: 500,
      previousMargin: 0,
      nextMargin: 0,
    },
    scoreParams: {},
    user: wx.getStorageSync('user'),
    // 数据
    goods: {
      goods_info: {
        attr_info: [],
        spec_info: [],
      },
      spec_group_info: {}
    },
    selectedSku: {}, // 点击后筛选出的sku

    // tab组件参数
    tabList: [{
      id: 1,
      name: '详情'
    }],
    tabListSelectedId: 1,
    tabListScroll: true,
    tabListHeight: 45,
    // 控制
    showTab: 1,
    showSkuPopup: false,
    showAttrPopup: false,
    afterSelectSku: '', // 选择sku后操作：加入购物车或购买或不操作
  },
  onLoad(options) {
    this.setData({
      id: options.id
    })
    this.getGoods()
    this.getScoreParam()
  },
  // 获得积分参数
  getScoreParam() {
    APP.ajax({
      url: APP.api.scoreParams
    }).then(res => {
      this.setData({
        scoreParams: res.data
      })
    }).catch(err => {})
  },
  // 请求商品数据
  getGoods() {
    APP.ajax({
      url: APP.api.scoreGoodsDetail,
      data: {
        id: this.data.id,
      },
    }).then(res => {
      let data = res.data;
      // 转化具体规格格式，为了选中规格时匹配
      data.spec_group_info = data.spec_group_info.map(item => {
        item.spec_option_group = item.spec_option_group.split('_').sort().toString();
        return item;
      });
      // 图片富文本替换为宽度100%
      res.data.goods_info.desc = data.goods_info.desc.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block"')
      // 保存商品数据
      this.setData({
        goods: data,
      })
    }).catch(err => {})
  },

  // 点击确定按钮关闭的时候
  confirm(e) {
    this.setData({
      selectedSku: e.detail.selectedSku,
    });
    if (this.data.afterSelectSku == 'buy') {
      setTimeout(() => {
        this.sendBuyNow();
        this.setData({
          afterSelectSku: '',
        });
      }, 500)
    }
  },
  // 点击立即购买
  buyNow(e) {
    APP.util.isLogin().then(() => {
      if (!this.data.scoreParams.is_open) {
        APP.util.toast('积分商城未开放')
      } else {
        if (this.data.goods.goods_info.spec_info.length) {
          if (this.data.selectedSku.spec_group_id_str) {
            this.sendBuyNow();
          } else {
            this.setData({
              afterSelectSku: 'buy'
            });
            this.openSkuPopup();
          }
        } else {
          this.sendBuyNow();
        }
      }
    }).catch(err => {})


  },
  // 跳转到订单详情页
  sendBuyNow() {
    wx.setStorageSync('scoreGoodsList', [{
      goods: this.data.goods,
      select_spec_group_info: this.data.selectedSku,
      num: 1
    }])
    wx.redirectTo({
      url: `/pages/ComScoreCreateOrder/index`,
    })
  },
  // 打开弹出层sku选择器
  openSkuPopup() {
    // 触发子组件方法
    this.selectComponent('#selectsku').beforeOpen();
    this.setData({
      showSkuPopup: true
    });
  },
  // 子组件的关闭按钮点击时候也同时关闭
  closeSkuPopup() {
    this.setData({
      afterSelectSku: '',
      showSkuPopup: false
    });
  },
  // 打开弹出层sku选择器
  openAttrPopup() {
    this.setData({
      showAttrPopup: true
    });
  },
  // 子组件的关闭按钮点击时候也同时关闭
  closeAttrPopup() {
    this.setData({
      showAttrPopup: false
    })
  },
  onShareAppMessage: function() {
    let path = `${this.route}?id=${this.data.goods.id}&goodsId=${this.data.goods.goods_id}`;
    if (this.data.user) {
      path += '&parent_mobile=' + this.data.user.mobile;
    }
    return {
      title: this.data.goods.goods_info.name,
      path: path
    }
  }
})