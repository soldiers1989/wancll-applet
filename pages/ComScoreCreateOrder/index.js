const APP = getApp();
import {
  params
} from '../../api/config.js';
import {
  orderView,
  getDefaultAddress,
  checkIsSetPassword,
  checkPassword
} from './data.js';
Page({
  data: {
    goodsList: [], // 商品信息
    user: {}, // 用户
    totalScore: 0,
    freightMoney: 0, // 运费
    selectedAddress: '', // 选择的地址
    memo:'',
    password:'',

    // 控制弹出层显示
    showPopPay: false,
    showPopupAddress: false,
    hasPopup: true,
    hasForeignGoods: false, // 是否含有海外商品
  },
  onLoad(options) {
    this.setData({
      user: wx.getStorageSync('user')
    });

    let goodsList = wx.getStorageSync('scoreGoodsList');
    this.setData({
      goodsList: goodsList,
      hasForeignGoods: goodsList.some(goods => {
        return goods.goods.goods_info.is_foreign;
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
  // 切换弹出层隐显
  togglePopupPay() {
    this.setData({
      showPopPay: !this.data.showPopPay,
      password:'',
      hasPopup: !this.data.hasPopup,
    });
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
    } else if (type == 'password'){
      this.setData({
        password:value,
      });
    }
  },
  // 输入密码确认
  confirmPassword(){
    checkPassword(this);
  },
  // 提交订单
  submit() {
    checkIsSetPassword(this);
  },
})