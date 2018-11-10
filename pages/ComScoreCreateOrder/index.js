const APP = getApp()
import {
  orderView,
  getDefaultAddress,
  submit,
  checkPassword
} from './data.js'
import {
  queryIsSetPayPassword,
} from '../../utils/common.js'
Page({
  data: {
    goodsList: [], // 商品信息
    user: {}, // 用户
    totalScore: 0,
    freightMoney: 0, // 运费
    selectedAddress: '', // 选择的地址
    memo: '',
    password: '',

    // 控制弹出层显示
    showPopPay: false,
    showPopupAddress: false,
    hasPopup: true,
    loading: false,
  },
  onLoad(options) {
    this.setData({
      user: wx.getStorageSync('user')
    })

    let goodsList = wx.getStorageSync('scoreGoodsList')
    this.setData({
      goodsList: goodsList,
    })
    getDefaultAddress(this)
  },
  // 页面显示的时候重新加载 地址数据
  onShow() {
    this.selectComponent("#address").refresh()
  },
  // 改变商品数量
  changeNum(e) {
    let index = APP.util.getDataSet(e, 'index')
    let type = APP.util.getDataSet(e, 'type')
    let num = type == 'plus' ? 1 : -1
    let goods = this.data.goodsList[index]
    if (type == 'minus' && goods.num < 2) {
      return
    }
    this.setData({
      [`goodsList[${index}].num`]: goods.num + num
    })
    orderView(this)
  },
  // 切换地址弹出层
  toggilPopupAddress() {
    this.setData({
      showPopupAddress: !this.data.showPopupAddress,
      hasPopup: !this.data.hasPopup
    })
  },
  // 切换弹出层隐显
  togglePopupPay() {
    this.setData({
      showPopPay: !this.data.showPopPay,
      hasPopup: !this.data.hasPopup
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
    let type = APP.util.getDataSet(e, 'type')
    let value = e.detail.value
    if (type == 'name') {
      this.setData({
        ["user.name"]: value,
      })
    } else if (type == 'idcard') {
      this.setData({
        ["user.id_card"]: value,
      })
    } else if (type == 'memo') {
      this.setData({
        memo: value
      })
    } else if (type == 'password') {
      this.setData({
        password: value,
      })
    }
  },
  // 输入密码确认
  confirmPassword() {
    if (!this.data.loading) {
      this.setData({
        loading: true
      }, () => {
        checkPassword(this)
      })
    }
  },
  cancelPay() {
    this.setData({
      showPopPay: !this.data.showPopPay,
      hasPopup: !this.data.hasPopup,
      password: '',
    })
  },
  // 提交订单
  submit() {
    queryIsSetPayPassword().then(() => {
      this.setData({
        showPopPay: true,
        hasPopup: !this.data.hasPopup
      })
    }).catch(err => {
      console.warn(err)
    })
  },
})