const APP = getApp()
import {
  cartUpdate,
  cartDelete,
  cartsColleSave,
  getList,
} from './data.js'
Page({
  data: {
    list: [],
    page: 1,
    haveNoData: false,
    noContentImg: APP.imgs.noContentImg,
    totalPrice: 0.00, // 商品的总价
    // 是否能够批量编辑
    canBatchEdit: false,
    // 是否全选
    isSelectAll: false,
    // 底部弹窗
    showBottomPopup: false,
    // 当前选中商品的规格
    selectSku: {},
    selectCart: {}
  },
  onLoad(options) {},
  // 页面新显示的时候
  onShow() {
    APP.util.isLogin().then(() => {
      this.setData({
        page: 1,
        list: [],
      })
      getList(this)
    }).catch(err => {})
  },
  // 上拉加载
  onReachBottom() {
    getList(this)
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      page: 1,
      list: [],
    })
    getList(this)
    wx.stopPullDownRefresh()
  },
  // 更新sku数据
  confirm(event) {
    let goods = event.detail.goods
    let selectSku = event.detail.selectSku
    this.data.list.forEach(item => {
      if (item.id == this.data.selectItem.id) {
        item.goods_info = goods
        item.spec_group_id_str = selectSku.id_str
        item.spec_group_info = selectSku
      }
    })
    this.updateData()
  },
  // 全选按钮
  selectAll() {
    this.data.list.forEach(item => {
      item.isSelected = !this.data.isSelectAll
    })
    this.updateData()
  },
  // 单个宝贝的选择
  selectCartItem(e) {
    let id = APP.util.getDataSet(e, 'id')
    this.data.list.forEach(item => {
      if (item.id == id) {
        item.isSelected = !item.isSelected
      }
    })
    this.updateData()
  },
  // 改变购物车的数量
  changeNum(e) {
    let num = Number(APP.util.getDataSet(e, 'num'))
    let cart = APP.util.getDataSet(e, 'cart')
    this.data.list.forEach(item => {
      if (item.id == cart.id && (item.num + num) > 0) {
        cartUpdate(this, {
          id: cart.id,
          goods_id: cart.goods_id,
          num: item.num + num,
          spec_group_id_str: item.spec_group_info.id_str || 0,
        }).then(res => {
          APP.util.toast(res.msg)
          item.num += num
          this.updateData()
        }).catch(err => {})
      }
    })
  },
  // 更新数据
  updateData() {
    let totalPrice = Number(this.data.list.reduce((a, b) => {
      if (b.isSelected) {
        if (b.spec_group_info.id) {
          return a + Number(b.spec_group_info.sell_price) * b.num
        } else {
          return a + Number(b.goods_info && b.goods_info.sell_price || 0) * b.num
        }
      } else {
        return a + 0
      }
    }, 0)).toFixed(2)
    this.setData({
      list: this.data.list,
      totalPrice: totalPrice,
      isSelectAll: this.data.list.every(item => {
        return item.isSelected
      }),
      canBatchEdit: this.data.list.some(item => {
        return item.isSelected
      })
    })
  },
  // 打开弹出层
  openBottomPopup(e) {
    let item = APP.util.getDataSet(e, 'item')
    if (item.goods_info.spec_info.length > 0) {
      this.setData({
        showBottomPopup: true,
        selectSku: item.spec_group_info,
        selectCart: item,
      })
      this.selectComponent("#selectsku").refresh();
    }
  },
  // 关闭弹出层
  closeBottomPopup() {
    this.setData({
      showBottomPopup: false
    })
  },
  // 批量删除购物车
  deleteCarts() {
    wx.showModal({
      title: '提示',
      content: '确认从购物车移除选中商品?',
      success: res => {
        if (res.confirm) {
          cartDelete()
        }
      }
    })
  },
  // 批量加入收藏夹
  collectCarts() {
    cartsColleSave()
  },
  // 跳转到订单确认页面
  submit() {
    let goodsList = this.data.list.filter(item => {
      return item.isSelected
    }).map(item => {
      return {
        goods_info: item.goods_info,
        select_spec_group_info: item.spec_group_info,
        num: item.num
      }
    })
    if (goodsList.length == 0) {
      APP.util.toast('请选择需要结算的商品')
      return
    }
    wx.setStorageSync('orderConfirmGoodsList', goodsList)
    wx.navigateTo({
      url: '/pages/ComCreateOrder/index'
    })
  }
})