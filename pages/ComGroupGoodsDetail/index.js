const APP = getApp();
import PagingData from '../../utils/PagingData';
const Paging = new PagingData();
import {
  params
} from '../../api/config.js';
import {
  getGroupParams
} from '../ComGroupShop/data.js'

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

    userAvatar: APP.imgs.avatar, // 默认头像

    user: wx.getStorageSync('user'),
    groupParams: {}, // 积分相关参数

    // 数据
    goods: {
      goods_info: {
        attr_info: [],
        spec_info: [],
      },
      spec_group_info: {}
    },
    selectedSku: {}, // 点击后筛选出的sku

    teams: [], // 团队
    timeDowns: [], // 倒计时

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
    pid: 0 // 父订单id
  },
  onLoad(options) {
    if (options.parent_mobile && !this.data.user) {
      APP.globalData.parent_mobile = options.parent_mobile;
    }

    getGroupParams(this);
    // 请求商品数据
    APP.ajax({
      url: APP.api.groupGoodsDetail,
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
        });
        this.getTeams();
      }
    })
  },

  // 获取团队信息
  getTeams() {
    APP.ajax({
      url: APP.api.groupTeams,
      data: {
        goods_id: this.data.goods.goods_id,
      },
      success: res => {
        let endTimeStamps = res.data.map(team => {
          return team.end_time_stamp * 1000;
        });
        setInterval(() => {
          APP.utils.timeDowns(this, endTimeStamps)
        }, 1000)
        this.setData({
          teams: res.data
        });
      }
    });
  },

  // 单独购买
  goBuyOnly(e) {
    let id = APP.utils.getDataSet(e, 'id');
    wx.navigateTo({
      url: `/pages/ComDetail/index?id=${id}`,
    })
  },
  // 点击确定按钮关闭的时候
  confirm(e) {
    this.setData({
      selectedSku: e.detail.selectedSku,
    });
    setTimeout(() => {
      this.goGroupBuy(this.data.afterSelectSku, this.data.pid);
    }, 500)
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

    if (!this.data.groupParams.is_open) {
      wx.showToast({
        title: "团购专区未开放",
        icon: 'none',
      });
      return false;
    }

    return true;
  },
  // 拼团购买
  groupBuy(e) {
    if (!this.checkBeforeDo()) {
      return;
    }
    let type = APP.utils.getDataSet(e, 'type');
    let pid = APP.utils.getDataSet(e, 'pid');
    if (this.data.goods.goods_info.spec_info.length) {
      this.setData({
        afterSelectSku: type,
        pid: pid
      });
      this.openSkuPopup();
    } else {
      this.goGroupBuy(type, pid);
    }
  },
  // 跳转到订单详情页
  goGroupBuy(type, pid) {
    wx.setStorageSync('groupGoodsList', [{
      goods: this.data.goods,
      select_spec_group_info: this.data.selectedSku,
      num: 1,
      order_pid: pid,
    }])
    wx.navigateTo({
      url: `/pages/ComGroupCreateOrder/index`,
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
      title: this.data.goods.goods_info.name + '（我正在拼这件好货，人多力量大。是朋友就来帮我一起砍价！）',
      path: path
    }
  }
})