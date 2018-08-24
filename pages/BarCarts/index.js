const APP = getApp();
import PagingData from '../../utils/PagingData';
const Paging = new PagingData();
Page({
  data: {
    // 分页功能
    FPage: {
      pageNum: 1,
      hasData: true,
      noContent: false,
      noContentImg: APP.imgs.noContentImg
    },

    carts: [], // 购物车商品信息列表包含了sku信息组合
    isSelectedAll: false,
    isShowDeleteAndCollection: false,
    totalPrice: 0.00, // 商品的总价

    selectedCart: {},
    selectedCartIndex: -1,
    isShowSkuPopup: false,



    selectObj: {}, // 选择的商品列表
    goodsInfo: '', // 商品详细信息
    thisClickId: '', // 当前编辑的那个商品
    selectAll: false,
    showBottomPopup: false,
    selectObjlen: 0,
  },
  // 页面新显示的时候
  onShow: function() {
    // 初始化数据
    this.setData({
      selectObj: {},
      selectAll: false,
      carts: [],
      allPreice: 0.00,
      'FPage.pageNum': 1,
      'FPage.hasData': true,
      thisClickId: '',
      selectObjlen: 0
    }, () => {
      // 初始化加载
      Paging.init({
        type: 2,
        that: this,
        url: 'getCartsAll',
        pushData: 'carts',
        getFunc: this.getOrderData
      })
      // 判断登录状态
      if (!wx.getStorageSync('token')) {
        wx.redirectTo({
          url: '/pages/ComLogin/index',
        })
      } else {
        this.resetCartData();
        this.getOrderData()
      }
    })
  },
  // 获取分页数据
  getOrderData() {
    Paging.getPagesData({
      handler: carts => {
        return carts.map(cart => {
          // 添加是否选择和是否编辑属性
          cart.isSelected = false;
          cart.isEdit = false;
          cart.isShowSkuPopup = false;
          // 如果购物车商品有规格
          if (cart.spec_group_id_str != 0 && cart.spec_group_info.spec_option_group) {
            cart.spec_group_info.spec_option_group = cart.spec_group_info.spec_option_group.replace(/_/g, ',');
          }
          cart.goods_info.spec_group_info = cart.goods_info.spec_group_info.map(function(info) {
            info.spec_option_group = info.spec_option_group.split('_').sort().toString();
            return info;
          });
          return cart;
        });
      }
    })
  },
  // 操作后重置购物车数据
  resetCartData() {
    if (!this.data.carts.length) {
      // 购物车无商品
      this.setData({
        isSelectedAll: false,
        isShowDeleteAndCollection: false,
        totalPrice: 0.00,
      });
    } else {
      // 是否显示删除和加入收藏夹; 全选
      this.setData({
        isSelectedAll: this.data.carts.every(cart => {
          return cart.isSelected;
        }),
        isShowDeleteAndCollection: this.data.carts.some(cart => {
          return cart.isSelected;
        }),
        totalPrice: this.calcTotalPrice(),
      });
    }
  },
  // 编辑购物车
  editCart(e) {
    let index = APP.utils.getDataSet(e, 'index');
    this.setData({
      [`carts[${index}].isEdit`]: !this.data.carts[index].isEdit
    });
  },
  // 打开规格面板
  openSkuShow(e) {
    let index = APP.utils.getDataSet(e, 'index');
    this.setData({
      isShowSkuPopup: true,
      selectedCartIndex: index,
      selectedCart: this.data.carts[index],
    });
    this.selectComponent('#selectsku').beforeOpen();
  },
  // 关闭规格面板
  closeSkuShow() {
    this.setData({
      isShowSkuPopup: true,
      selectedCartIndex: -1,
      selectedCart: {},
    });
  },
  // 确定选择规格
  selectSpec(e) {
    let index = this.data.selectedCartIndex;
    let cart = this.data.carts[index];
    APP.ajax({
      url: APP.api.getCartsUpdate,
      data: {
        id: cart.id,
        goods_id: cart.goods_id,
        num: cart.num,
        spec_group_id_str: e.detail.selectedSku.id_str
      },
      success: res => {
        this.setData({
          [`carts[${index}]`]: res.data
        });
        this.resetCartData();
      }
    });
  },
  // 改变数量
  changeNum(e) {
    let index = APP.utils.getDataSet(e, 'index');
    let type = APP.utils.getDataSet(e, 'type');
    let cart = this.data.carts[index];
    let num = type == 'plus' ? 1 : -1;
    if (num == -1 && cart.num < 2) {
      return;
    }
    APP.ajax({
      url: APP.api.getCartsUpdate,
      data: {
        id: cart.id,
        goods_id: cart.goods_id,
        num: cart.num + num,
        spec_group_id_str: cart.spec_group_id_str
      },
      success: res => {
        this.setData({
          [`carts[${index}].num`]: cart.num + num
        });
        this.resetCartData();
      }
    })
  },
  // 单选
  changeSelected(e) {
    let index = APP.utils.getDataSet(e, 'index');
    this.setData({
      [`carts[${index}].isSelected`]: !this.data.carts[index].isSelected
    });
    this.resetCartData();
  },
  // 全选
  selectAll(e) {
    this.setData({
      carts: this.data.carts.map(cart => {
        cart.isSelected = !this.data.isSelectedAll;
        return cart;
      }),
      isSelectedAll: !this.data.isSelectedAll,
    });
    this.resetCartData();
  },
  // 批量删除
  batchDelete() {
    let ids = this.data.carts.filter(cart => {
      return cart.isSelected;
    }).map(cart => {
      return cart.id;
    });
    wx.showModal({
      title: '提示',
      content: '确定要从购物车移除选中商品？',
      success: res => {
        if (res.confirm) {
          APP.ajax({
            url: APP.api.getCartsDelete,
            data: {
              id: ids
            },
            success: res => {
              wx.showToast({
                title: res.msg,
                icon: 'none'
              })
              Paging.refresh();
            }
          })
        }
      }
    })
  },
  // 批量加入购物车
  batchAddCollection() {
    let ids = this.data.carts.filter(cart => {
      return cart.isSelected;
    }).map(cart => {
      return cart.goods_id;
    });
    APP.ajax({
      url: APP.api.getCartsColleSave,
      data: {
        goods_ids: ids
      },
      success: res => {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  // 计算总价
  calcTotalPrice() {
    return this.data.carts.filter(cart => {
      return cart.isSelected;
    }).reduce((total, cart) => {
      if (cart.spec_group_id_str != 0) {
        return total + Number(cart.spec_group_info.sell_price) * cart.num;
      } else {
        return total + Number(cart.goods_info.sell_price) * cart.num;
      }
    }, 0).toFixed(2);
  },
  // 上拉加载
  onReachBottom() {
    this.getOrderData()
  },
  // 下拉刷新
  onPullDownRefresh() {
    Paging.refresh();
    this.resetCartData();
  },
  // 更新sku数据
  confirm(e) {
    this.closeBottomPopup()
    let data = this.findItemById()
    data.spec_group_id = e.detail.findSku.id;
    this.update(data)
  },
  // 更新数量数据数据
  update(data) {
    let index = data.index;
    let carts = this.data.carts;
    APP.ajax({
      url: APP.api.getCartsUpdate,
      data: data,
      success: res => {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 500
        });
        this.setData({
          [`carts[${index}]`]: res.data
        }, () => {
          this.allPreice()
        })
      }
    })
  },
  // 打开弹出层
  openBottomPopup(e) {
    let goodsinfo = APP.utils.getDataSet(e, 'goodsinfo');
    let index = APP.utils.getDataSet(e, 'index');
    let id = APP.utils.getDataSet(e, 'id');
    if (!goodsinfo.goods_spec_group_info.length) {
      return
    }
    this.setData({
      showBottomPopup: true,
      thisClickId: id,
      goodsInfo: this.data.carts[index].goods_info,
      sendfindsku: this.data.carts[index].spec_group_info,
    }, () => {
      this.selectComponent("#selectsku").refresh();
    })
  },
  // 关闭弹出层
  closeBottomPopup() {
    this.setData({
      showBottomPopup: false
    })
  },
  // 跳转到订单确认页面
  sendOrderAffirm() {
    let that = this;
    let orderConfirmGoodsList = [];
    this.data.carts.forEach(item => {
      if (that.data.selectObj[item.id]) {
        orderConfirmGoodsList.push({
          goodsInfo: item.goods_info,
          specGroupInfo: item.spec_group_info,
          num: item.num
        })
      }
    });
    if (!orderConfirmGoodsList.length) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none'
      })
      return;
    }
    wx.setStorageSync('orderConfirmGoodsList', orderConfirmGoodsList);
    wx.navigateTo({
      url: '/pages/ComCreateOrder/index'
    })
  }
})