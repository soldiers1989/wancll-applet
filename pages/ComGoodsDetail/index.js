const APP = getApp()
import {
  getGoods,
  getGoodsCommetList,
  queryGoodsIsCollected,
  toggleCollect,
  getActivities,
  cartSave,
} from './data.js'
Page({
  data: {
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
    // tab组件参数
    tabList: [{
      id: 1,
      name: '详情'
    }, {
      id: 2,
      name: '评价'
    }],
    tabListSelectedId: 1,
    tabListScroll: true,
    tabListHeight: 45,
    // 类型 是否有活动参与
    isDiscountGoods: 0,
    discountActivity: [], // 所有的活动数据
    discountGoods: {}, // 当前显示宝贝的活动数据
    timeDown: '0天 00 : 00 : 00', // 倒计时
    // 商品信息
    id: '',
    goods: '',
    isCollected: 0,
    // 商品评论
    list: [],
    page: 1,
    haveNoData: false,
    noContentImg: APP.imgs.noContentImg,
    // 选择的规格
    selectSku: {}, // 点击后筛选出的sku
    // 控制
    showTab: 1,
    showSkuPopup: false,
    showAttrPopup: false,
    openType: '', // 打开sku的类型是点击加入购物车还是立即购买
  },
  onLoad(options) {
    this.setData({
      id: options.id,
      isDiscountGoods: options.isDiscountGoods || 0,
    })
    this.getData()
  },
  // 获取数据
  getData() {
    let id = this.data.id
    // 加载商品
    getGoods(this, id)
    // 查询是否收藏
    if (wx.getStorageSync('token')) {
      queryGoodsIsCollected(this, id)
    }
    // 查询商品评论
    getGoodsCommetList(this, id)
    // 查询商品活动
    if (this.data.isDiscountGoods) {
      getActivities(this, id)
    }
  },

  // 点击的时候判断商品是否收藏
  changeCollect() {
    APP.util.isLogin().then(() => {
      toggleCollect(this, this.data.id)
    }).catch(err => {})
  },
  // 点击购物车按钮
  goCarts() {
    wx.switchTab({
      url: '/pages/BarCarts/index'
    })
  },
  // 切换详情和评价
  changeTab() {
    let id = this.selectComponent("#tab").data.selectedId
    this.setData({
      showTab: id
    })
  },
  // 点击确定按钮关闭的时候
  confirm(event) {
    this.setData({
      showSkuPopup: false,
      goods: event.detail.goods,
      selectSku: event.detail.selectSku,
    })
    if (this.data.openType == 'cart') {
      this.addCarts()
    } else if (this.data.openType == 'buy') {
      this.buyNow()
    }
  },
  // 点击加入购物车
  addCarts() {
    APP.util.isLogin().then(() => {
      if (this.data.goods.spec_info.length != 0 && !this.data.selectSku.id) {
        this.setData({
          openType: 'cart',
        })
        this.openSkuPopup()
        return
      }
      cartSave(this);
    }).catch(err => {})

  },
  // 点击立即购买
  buyNow() {
    APP.util.isLogin().then(() => {
      if (this.data.goods.spec_info.length != 0 && !this.data.selectSku.id) {
        this.setData({
          openType: 'buy',
        })
        this.openSkuPopup()
        return
      }

      if (this.data.selectSku.id) {
        wx.setStorageSync('orderConfirmGoodsList', [{
          goods_info: this.data.goods,
          select_spec_group_info: this.data.selectSku,
          num: 1,
        }])
      } else {
        wx.setStorageSync('orderConfirmGoodsList', [{
          goods_info: this.data.goods,
          select_spec_group_info: 0,
          num: 1,
        }])
      }
      wx.navigateTo({
        url: `/pages/ComCreateOrder/index?isDiscountGoods=${this.data.isDiscountGoods}`
      })
    }).catch(err => {})
  },
  // 打开弹出层sku选择器
  openSkuPopup() {
    this.setData({
      showSkuPopup: true
    })
  },
  // 子组件的关闭按钮点击时候也同时关闭
  closeSkuPopup() {
    this.setData({
      showSkuPopup: false
    })
  },
  // 打开弹出层sku选择器
  openAttrPopup() {
    this.setData({
      showAttrPopup: true
    })
  },
  // 子组件的关闭按钮点击时候也同时关闭
  closeAttrPopup() {
    this.setData({
      showAttrPopup: false
    })
  },
  onShareAppMessage: function() {
    return {
      title: this.data.goodsInfo.name,
      path: `${this.route}?id=${this.data.goodsId}`
    }
  }
})