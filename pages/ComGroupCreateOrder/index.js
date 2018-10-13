const APP = getApp();
import {
  getDefaultAddress,
  orderView,
  submit,
} from './data.js';
Page({
  data: {
    goodsList: [], // 商品信息
    user: {}, // 用户
    totalPrice: 0, // 订单总价
    selectedAddress: '', // 选择的地址
    // 控制弹出层显示
    showPopupAddress: false,
    hasPopup: true,
    isLoading: false, // 提交订单按钮状态
  },
  onLoad(options) {
    let goodsList = wx.getStorageSync('groupGoodsList');
    this.setData({
      user: wx.getStorageSync('user'),
      goodsList: goodsList,
    });
  },
  // 页面显示的时候重新加载 地址数据
  onShow() {
    getDefaultAddress(this);
    this.selectComponent("#address").refresh();
  },
  // 改变商品数量
  changeNum(e) {
    let index = APP.utils.getDataSet(e, 'index');
    let type = APP.utils.getDataSet(e, 'type');
    let num = type == 'plus' ? 1 : -1;
    let goods = this.data.goodsList[index];
    if (type == 'minus' && goods.num < 2) {
      return;
    }
    this.setData({
      [`goodsList[${index}].num`]: goods.num + num
    });
    orderView(this);
  },
  // 切换地址弹出层
  toggilPopupAddress() {
    this.setData({
      showPopupAddress: !this.data.showPopupAddress,
      hasPopup: !this.data.hasPopup
    }, () => {
      getDefaultAddress(this);
    })
  },
  // 点击地址刷新数据 然后关闭弹窗
  getClickId(e) {
    this.setData({
      selectedAddress: e.detail.address
    }, () => {
      orderView(this)
      this.toggilPopupAddress()
    })
  },
  // 计算总价
  caclTotalPrice() {
    let price = this.data.totalPrice;
    this.setData({
      totalPrice: price.toFixed(2)
    });
  },
  // 提交订单
  submit() {
    submit(this);
  },
})