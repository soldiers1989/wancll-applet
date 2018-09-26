const APP = getApp();
import PagingData from '../../utils/PagingData';
const Paging = new PagingData();
import {
  params
} from '../../api/config.js';
import {
  getScoreParams
} from '../ComScoreShop/data.js'

Page({
  data: {
    // 轮播参数
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,

    user: {},
    scoreParams: {}, // 积分相关参数

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
      title: '详情'
    }],
    tabListSelectedId: 1,
    tabListScroll: false,
    tabListHeight: 45,
    // 控制
    showTab: 1,
    showSkuPopup: false,
    showAttrPopup: false,
    afterSelectSku: '', // 选择sku后操作：加入购物车或购买或不操作
  },
  onLoad(options) {
    if (options.parent_mobile && !this.data.user) {
      APP.globalData.parent_mobile = options.parent_mobile;
    }

    this.setData({
      user: wx.getStorageSync('user')
    });

    // 为登陆注册后跳转准备
    if (!this.data.user) {
      let afterRegister = {
        type: 'score_goods',
        id: options.id,
        goodsId: options.goodsId,
      };
      wx.setStorageSync('afterRegister', afterRegister);
    }

    getScoreParams(this);
    // 请求商品数据
    APP.ajax({
      url: APP.api.scoreGoodsDetail,
      data: {
        id: options.id
      },
      success: res => {
        let data = res.data;
        // 转化具体规格格式，为了选中规格时匹配
        data.spec_group_info = data.spec_group_info.map(item => {
          item.spec_option_group = item.spec_option_group.split('_').sort().toString();
          return item;
        });
        // 处理文案
        (!Array.isArray(data.goods_info.documents)) && (data.goods_info.documents = []);
        data.goods_info.is_foreign && data.goods_info.documents.unshift(data.goods_info.country + '品牌', '跨境商品');
        // 图片富文本替换为宽度100%
        res.data.goods_info.desc = data.goods_info.desc.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block"')
        // 保存商品数据
        this.setData({
          goods: data,
        })
      }
    })
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
  // 操作前检验
  checkBeforeDo() {
    let token = wx.getStorageSync('token')
    if (!token) {
      wx.showToast({
        title: "请先登录",
        icon: 'none',
      });
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/ComLogin/index'
        })
      }, 1000);
      return false;
    }

    if (!this.data.scoreParams.is_open) {
      wx.showToast({
        title: "积分商城未开放",
        icon: 'none',
      });
      return false;
    }

    return true;
  },
  // 点击立即购买
  buyNow(e) {
    if (!this.checkBeforeDo()) {
      return;
    }
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
  },
  // 跳转到订单详情页
  sendBuyNow() {
    wx.setStorageSync('scoreGoodsList', [{
      goods: this.data.goods,
      select_spec_group_info: this.data.selectedSku,
      num: 1
    }])
    wx.navigateTo({
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