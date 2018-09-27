const APP = getApp();
import {
  getDefaultAddress,
  orderView,
  submit,
} from './data.js';
import {
  params
} from '../../api/config.js';
import {
  getMemberParams
} from '../BarUser/data.js';
Page({
  data: {
    goodsList: [], // 商品信息
    user: {}, // 用户

    totalPrice: 0, // 订单总价
    selectedAddress: '', // 选择的地址

    // 控制弹出层显示
    showPopupAddress: false,
    hasPopup: true,
    submitButtonStatus: true, // 提交订单按钮状态
    hasForeignGoods: false, // 是否含有海外商品
    memberParams: {}, // 会员相关参数
    isMember: false,
  },
  onLoad(options) {
    let goodsList = wx.getStorageSync('groupGoodsList');
    this.setData({
      user: wx.getStorageSync('user'),
      goodsList: goodsList,
      hasForeignGoods: goodsList.some(goods => {
        return goods.goods.goods_info.is_foreign;
      }),
    });

    getMemberParams(this);
    this.checkIsMember();
  },
  // 页面显示的时候重新加载 地址数据
  onShow() {
    getDefaultAddress(this);
    this.selectComponent("#address").refresh();
  },
  // 判断是否金卡会员
  checkIsMember() {
    if (this.data.user && this.data.user.member_level == params.bcMember) {
      this.setData({
        isMember: true
      });
    }
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
    let price = this.data.totalPrice;
    // 处理金卡会员折扣
    if (this.data.isMember) {
      price *= this.data.memberParams.user.discount * 0.1;
    }
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
    submit(this);
  },
})