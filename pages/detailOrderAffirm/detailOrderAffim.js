const APP = getApp();
import { getDefaultAddress, orderView, getMarketInfo, submit } from './data.js';
Page({
  data: {
    goodsList: '', // 商品信息
    isDiscountGoods: 0,  // 是否折扣商品提交

    totalPrice: '', // 订单总价
    selectedAddress: '', // 选择的地址

    view: '', // 订单预览返回的订单价格
    activities: {}, // 可参与的优惠活动,

    selectedActivity: {}, // 选择的营销活动
    selectedActivityText: '', // 选择的营销活动简介
    selectedActivityType: '', //选择的营销活动类型

    memo: '',  //留言

    // 控制弹出层显示
    showBottomPopupAddress: false,
    showBottomPopupDis1: false,
    showBottomPopupDis2: false,

  },
  onLoad(options) {
    this.setData({
      goodsList: wx.getStorageSync('orderConfirmGoodsList'),
      isDiscountGoods: Number(options.isDiscountGoods) || 0,
    });
    getDefaultAddress(this);
  },
  // 页面显示的时候重新加载 地址数据
  onShow() {
    this.selectComponent("#address").refresh();
  },
  // 点击地址刷新数据 然后关闭弹窗
  getClickId(e) {
    let id = e.detail.id;
    let addressList = wx.getStorageSync('address');
    let addresses = addressList.filter(item => {
      return item.id == id
    })
    this.setData({
      selectedAddress: addresses[0]
    }, () => {
      orderView(this);
      this.toggilBottomPopupAddress();
    })
  },
  changeNum(e) {
    let index = APP.utils.getDataSet(e, 'index');
    let num = Number(APP.utils.getDataSet(e, 'num'));
    if (!num) {
      return;
    }
    this.setData({
      goodsList: this.data.goodsList.map((item, i) => {
        if (i == index) {
          item.num = num;
        }
        return item;
      })
    });
    orderView(this);

  },
  // 满折选择
  selectCoupon(e) {
    let index = APP.utils.getDataSet(e, 'index');
    let coupon = this.data.activities.coupon[index];
    let text = '';
    if (coupon.coupon_type == 'full') {
      text = `满${coupon.reach_money}减${coupon.change_value}元`
    } else if (coupon.coupon_type == 'discount') {
      text = `满${coupon.reach_money}打${coupon.change_value}折`
    }
    this.setData({
      selectedActivity: coupon,
      selectedActivityText: text,
      selectedActivityType: 'coupon'
    }, () => {
      this.toggilBottomPopupDis2();
      this.computeTotalPrice()
    })
  },
  // 减满选择
  selectFull(e) {
    let index = APP.utils.getDataSet(e, 'index');
    let full = this.data.activities.full[index];
    let text = `满${full.full_money}减${full.reduce_money}元`;
    this.setData({
      selectedActivity: full,
      selectedActivityText: text,
      selectedActivityType: 'full'
    }, () => {
      this.toggilBottomPopupDis1();
      this.computeTotalPrice()
    })
  },
  // 买家留言
  memoInput(e) {
    this.setData({
      memo: e.detail.value
    })
  },
  // 计算总价 勾选了满减后 增减商品后都要计算
  computeTotalPrice() {
    if (!this.data.isDiscountGoods) {
      let totalPrice = this.data.view.total_money;
      if (this.data.selectedActivityType == 'coupon') {
        if (this.data.selectedActivity.coupon_type == 'full') {
          totalPrice -= this.data.selectedActivity.change_value;
        } else if (this.data.selectedActivity.coupon_type == 'discount') {
          totalPrice *= this.data.selectedActivity.change_value * 0.1;
        }
      } else if (this.data.selectedActivityType == 'full') {
        totalPrice -= this.data.selectedActivity.reduce_money;
      }
      this.setData({
        totalPrice: totalPrice.toFixed(2)
      })
    } else {
      let goodsPrice = Number(this.data.activities.discount[0].discount_price) * this.data.goodsList[0].num;
      this.setData({
        totalPrice: (goodsPrice + this.data.view.freight_money).toFixed(2),
        selectedActivity: this.data.activities.discount[0],
        selectedActivityType: 'discount'
      })
    }
  },
  // 提交订单
  submit() {
    submit();
  },
  // 切换地址弹出层
  toggilBottomPopupAddress() {
    this.setData({
      showBottomPopupAddress: !this.data.showBottomPopupAddress,
    })
  },
  toggilBottomPopupDis1() {
    this.setData({
      showBottomPopupDis1: !this.data.showBottomPopupDis1,
    })
  },
  toggilBottomPopupDis2() {
    this.setData({
      showBottomPopupDis2: !this.data.showBottomPopupDis2,
    })
  }
})