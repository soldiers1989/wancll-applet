const APP = getApp();
import {
  getDefaultAddress,
  orderView,
  submit
} from './data.js';
Page({
  data: {
    goodsList: [], // 商品信息
    isDiscountGoods: 0, // 是否折扣商品提交

    user: wx.getStorageSync('user'), // 用户

    totalPrice: 0, // 订单总价
    freightMoney: 0, // 运费
    goodsMoney: 0, // 商品总价
    selectedAddress: '', // 选择的地址

    // 可参与的优惠活动,
    activities: {
      coupon: [],
      full: [],
      discount: [],
    },
    selectedActivity: {}, // 选择的营销活动
    selectedActivityText: '', // 选择的营销活动简介
    selectedActivityType: '', //选择的营销活动类型
    discountsPrice: 0, // 限时折扣价
    newUserCouponId: 0, // 新人优惠券id
    // 控制弹出层显示
    showPopupAddress: false,
    showPopupCoupon: false,
    showPopupFull: false,
    hasPopup: true,
    submitButtonStatus: true, // 提交订单按钮状态
    hasForeignGoods: false // 是否含有海外商品

  },
  onLoad(options) {
    let goodsList = wx.getStorageSync('orderConfirmGoodsList');
    this.setData({
      goodsList: goodsList,
      isDiscountGoods: Number(options.isDiscountGoods) || 0,
      hasForeignGoods: goodsList.some(goods => {
        return goods.goods_info.is_foreign;
      }),
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
    this.orderView();
  },
  // 优惠券选择
  selectCoupon(e) {
    let index = e.currentTarget.dataset.index;
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
      this.toggilPopupCoupon();
      this.caclTotalPrice()
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
      this.toggilPopupFull();
      this.caclTotalPrice()
    })
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
  // 切换折扣弹窗
  toggilPopupCoupon() {
    this.setData({
      showPopupCoupon: !this.data.showPopupCoupon,
      hasPopup: !this.data.hasPopup
    })
  },
  // 切换减免弹窗
  toggilPopupFull() {
    this.setData({
      showPopupFull: !this.data.showPopupFull,
      hasPopup: !this.data.hasPopup
    })
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
      this.toggilPopupAddress();
    })
  },
  // 输入监听
  liscenInput(e) {
    let type = APP.utils.getDataSet(e, 'type');
    let value = e.detail.value;
    if (type == 'name') {
      this.setData({
        ["user.name"]: value,
      });
    } else if (type == 'idcard') {
      this.setData({
        ["user.id_card"]: value,
      });
    } else if (type == 'memo') {
      this.setData({
        memo: value
      });
    }
  },
  // 计算总价
  caclTotalPrice() {
    let price = this.data.goodsMoney;
    // 处理优惠活动
    if (this.data.isDiscountGoods) {
      price = this.data.discountPrice;
    } else if (this.data.selectedActivityType == 'full') {
      price -= this.data.selectedActivity.reduce_money;
    } else if (this.data.selectedActivityType == 'coupon') {
      if (this.data.selectedActivity.coupon_type == 'full') {
        price -= this.data.selectedActivity.change_value;
      } else if (this.data.selectedActivity.coupon_type == 'discount') {
        price *= this.data.selectedActivity.change_value * 0.1;
      }
    }
    // 处理金卡会员折扣

    // 处理运费
    price += this.data.freightMoney;
    this.setData({
      totalPrice: price.toFixed(2)
    });
  },
  // 提交订单
  submit() {
    if (!this.data.submitButtonStatus) {
      return;
    }
    this.setData({
      submitButtonStatus: false,
    });
    this.dealCoupon();
    submit(this);
  },
  // 处理新人优惠券
  dealCoupon() {
    if (this.data.selectedActivity.type == 'new_user') {
      this.setData({
        newUserCouponId: this.data.selectedActivity.id,
        selectedActivityType: 0,
        selectedActivity: {},
        selectedActivityText: '',
      });
    }
  },
})