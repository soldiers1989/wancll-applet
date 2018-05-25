const APP = getApp()
Page({
  data: {
    // 轮播参数
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    // tab组件参数
    tabList: [{
      id: 1,
      title: '详情'
    }, {
      id: 2,
      title: '评价'
    }],
    tabListSelectedId: 1,
    tabListScroll: true,
    tabListHeight: 45,
    // 数据
    goodsId: -1, //   商品的id
    goodsInfo: '', //  商品信息 read:res.data
    isCollect: 0, //  默认是否收藏

    comments: [], // comments:res.data
    lineValue: {}, // 当前点击的sku数据
    findSku: '', // 点击后筛选出的sku
    cartsDetail:[], // 加入购物车后返回的
    // 控制
    showTab: 1,
    showBottomPopup: false,
    openType: '', // 打开sku的类型是点击加入购物车还是立即购买
  },
  onLoad(options) {
    // 请求商品数据
    APP.ajax({
      url: APP.api.detailRead,
      data: {
        id: options.id
      },
      success: res => {
        this.setData({
          goodsId: options.id,
          goodsInfo: res.data,
          // goodsGroupInfo: res.data.goods_spec_group_info,
          // goodsSpecInfo: res.data.goods_spec_info,
        }, () => {
          // 判断是否登录状态 然后获取收藏状态
          let token = wx.getStorageSync('token');
          if (token) {
            this.isCollect()
          }
        })
      }
    })
    // 请求评论数据
    APP.ajax({
      url: APP.api.detailComments,
      data: {
        goods_id: options.id
      },
      success: res => {
        this.setData({
          comments: res.data
        })
      }
    })
  },
  // 默认加载时候判断是否收藏的商品
  isCollect() {
    APP.ajax({
      url: APP.api.detailCollect,
      data: {
        goods_id: this.data.goodsId
      },
      success: (res) => {
        this.setData({
          isCollect: res.data.is_collect
        })
      }
    })
  },
  // 点击的时候判断商品是否收藏
  changeCollect() {
    let token = wx.getStorageSync('token')
    if (!token) {
      wx.showToast({
        title: "请先登录",
        icon: 'none',
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/login/login'
        })
      }, 1000)
    } else {
      let url = '';
      if (this.data.isCollect) {
        url = APP.api.detailCollectCancel
      } else {
        url = APP.api.detailCollectSave
      }
      APP.ajax({
        url: url,
        data: {
          goods_id: this.data.goodsId
        },
        success: (res) => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
          })
          let isCollect = res.data.id ? 1 : 0
          this.setData({
            isCollect: isCollect
          })
        }
      })
    }
  },
  // 点击购物车按钮
  goCarts() {
    wx.switchTab({
      url: '/pages/carts/carts'
    })
  },
  // 切换详情和评价
  changeTab() {
    let id = this.selectComponent("#tab").data.selectedId
    this.setData({
      showTab: id
    })
  },

  // 打开弹出层sku选择器
  openBottomPopup() {
    this.setData({
      showBottomPopup: true
    })
  },
  // 子组件的关闭按钮点击时候也同时关闭
  closeBottomPopup() {
    this.setData({
      showBottomPopup: false
    })
  },
  // 点击确定按钮关闭的时候
  confirm(e) {
    this.setData({
      lineValue: e.detail.lineValue,
      findSku: e.detail.findSku,
      showBottomPopup: false
    }, () => {
      let type = APP.utils.getDataSet(e, 'type');
      if (this.data.openType == "buy") {
        setTimeout(() => {
          this.sendBuyNow('buy')
        }, 500)
      } else if (this.data.openType == "carts") {
        setTimeout(() => {
          this.addCarts('carts')
        }, 500)
      }
    })
  },
  // 点击加入购物车
  addCarts(e) {
    let type = e == 'carts' ? 'carts' : APP.utils.getDataSet(e, 'type');
    this.setData({
      openType: type
    }, () => {
      let token = wx.getStorageSync('token')
      if (!token) {
        wx.showToast({
          title: "请先登录",
          icon: 'none',
        })
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }, 1000)
      } else {
        if (this.data.findSku) {
          APP.ajax({
            url: APP.api.detailCartsSave,
            data: {
              goods_id: this.data.goodsInfo.id,
              spec_group_id: this.data.findSku.id,
              status: this.data.goodsInfo.status,
              num: 1
            },
            success: (res) => {
              wx.showToast({
                title: res.msg,
                icon: 'none',
              })
              this.setData({
                cartsDetail:[res.data]
              })
            }
          })
        } else {
          this.openBottomPopup();
        }
      }
    })
  },
  // 点击立即购买
  buyNow(e) {
    let type = e == 'buy' ? 'buy' : APP.utils.getDataSet(e, 'type');
    this.setData({
      openType: type
    }, () => {
      let token = wx.getStorageSync('token')
      if (!token) {
        wx.showToast({
          title: "请先登录",
          icon: 'none',
        })
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }, 1000)
      } else {
        if (this.data.findSku) {
          this.sendBuyNow();
        } else {
          this.openBottomPopup();
        }
      }
    })
  },
  // 跳转到订单详情页
  sendBuyNow() {
    // 组装成和购物车的数据一样的格式
    let cartsDetail = []; // 订单确认页面需要读取的产品信息
    let goodsInfo = []; // 订单确认页面需要发送请求的信息
    let goodsIds = []; // 订单确认页面需要发送请求的信息
    // 填入数据
    goodsInfo.push({
      goods_id: this.data.goodsInfo.id,
      spec_group_id: this.data.findSku.id,
      num: 1,
    })
    // 加入购物车后直接生成的数据
    if(this.data.cartsDetail.length){
      cartsDetail = this.data.cartsDetail
    }else{
      cartsDetail.push({
        goods_id: Number(this.data.goodsId),
        spec_group_id: this.data.findSku.id,
        spec_group_info: this.data.findSku,
        num: 1,
        goods_info: this.data.goodsInfo
      })
    }
    // 组装id
    goodsIds.push(Number(this.data.goodsId))
    let orderAffim = {
      goodsInfo: goodsInfo,
      goodsIds: goodsIds,
      cartsDetail: cartsDetail
    }
    // 本地存储 当前选中的订单信息以及商品信息
    wx.setStorageSync('orderAffim', orderAffim)
    wx.navigateTo({
      url: `/pages/detailOrderAffirm/detailOrderAffim`
    })
  }
})