// pages/detail/detail.js
const APP = getApp()
import {
  getDetailData
} from './detail-data.js'
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
    detailId: -1, // 商品的id
    isCollect: 0, // 是否收藏
    detailInfo: [], // read:res.data
    goodsGroupInfo: [], // read:res.data.goods_spec_group_info
    goodsSpecInfo: [], // read:res.data.goods_spec_info
    comments: [], // comments:res.data
    templateData: {}, // template:res.data
    skuData: [], // 重新组装的sku数据
    lineValue: {}, // 当前点击的sku数据
    findSku: '', // 点击后筛选出的sku
    // 控制
    show: 1,
    showBottomPopup: false,
    openType: '', // 打开sku的类型是点击加入购物车还是立即购买
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      detailId: options.id
    })
    getDetailData(this, options.id);
    let token = wx.getStorageSync('token')
    if (token) {
      this.isCollect()
    }
  },
  // 打开弹出层sku选择器
  openBottomPopup() {
    // 执行 sku 一些列逻辑计算
    this.assemblySkuData()
    this.setData({
      showBottomPopup: true
    })
  },
  // 关闭
  closeBottomPopup(e) {
    let type = APP.utils.getDataSet(e, 'type');
    if (type == 'icon') {
      this.setData({
        showBottomPopup: false
      })
    } else {
      // 选择全部
      let skuLength = Object.keys(this.data.goodsSpecInfo).length;
      if (Object.keys(this.data.lineValue).length == skuLength) {
        this.setData({
          showBottomPopup: false
        }, () => {
          if (this.data.openType == "buy") {
            setTimeout(() => {
              this.sendBuyNow('buy')
            }, 500)

          } else {
            setTimeout(() => {
              this.addCarts('carts')
            }, 500)
          }
        })
      } else {
        wx.showToast({
          title: "请选择商品属性",
          icon: 'none',
        })
      }
    }

  },
  // 点击收藏加载判断商品是否收藏
  isCollect() {
    APP.ajax({
      url: APP.api.detailCollect,
      data: {
        goods_id: this.data.detailId
      },
      success: (res) => {
        this.setData({
          isCollect: res.data.is_collect
        })
      }
    })
  },
  // 点击购物车按钮
  goCarts() {
    wx.switchTab({
      url: '/pages/carts/carts'
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
              goods_id: this.data.detailInfo.id,
              spec_group_id: this.data.findSku.id,
              status: this.data.detailInfo.status,
              num: 1              
            },
            success: (res) => {
              wx.showToast({
                title: res.msg,
                icon: 'none',
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
    let param = APP.utils.paramsJoin({
      goods_id: this.data.detailInfo.id,
      spec_group_id: this.data.findSku.id,      
      money: this.data.findSku.sell_price,
      num: 1      
    });
    wx.navigateTo({
      url: `/pages/detailOrderAffirm/detailOrderAffim?${param}`
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
          goods_id: this.data.detailId
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
  // 处理sku数据
  assemblySkuData() {
    // 只处理一次
    if (this.data.skuData.length != 0) {
      return;
    }
    let names = this.data.templateData.spec_template.names;
    let goodsGroupInfo = this.data.goodsGroupInfo;
    let goodsSpecInfo = this.data.goodsSpecInfo;
    let sku = [];
    names.forEach((item, index) => {
      let id = item.id
      sku.push({
        name: item,
        select: goodsSpecInfo[id]
      })
    });
    // 排序sku数据
    goodsGroupInfo.sort((n1, n2) => {
      return n1.sell_price - n2.sell_price
    })
    this.setData({
      goodsGroupInfo: goodsGroupInfo,
      skuData: sku
    }, () => {
      this.changeOptionIds()
    })
    console.log(sku)
  },
  // 点击选择sku
  changeSelect(e) {
    let nameid = APP.utils.getDataSet(e, 'nameid');
    let id = APP.utils.getDataSet(e, 'id');
    let lineValue = this.data.lineValue;
    lineValue[nameid] = id;
    // 这里应该做一个防止重复点击同一个按钮，先放着 
    this.setData({
      lineValue: lineValue
    }, () => {
      this.sortPriceFilter();
    })
  },
  // 排序对比选出匹配的数据
  sortPriceFilter() {
    let idsArray = this.data.goodsGroupInfo;
    let lineValue = this.data.lineValue;
    let skuLength = this.data.skuData.length;
    let newValueArr = [];
    // 重组sku值
    idsArray.forEach(item => {
      item.spec_option_ids.sort()
    });
    // 生成数组
    for (const key in lineValue) {
      newValueArr.push(lineValue[key])
    }
    newValueArr.sort()
    // 筛选
    let find = idsArray.filter((item) => {
      return item.spec_option_ids.toString() == newValueArr.toString()
    })
    // 选择完了所有的sku才发生改变
    if (newValueArr.length == skuLength) {
      find[0].spec_option_group = find[0].spec_option_group.split("_").join(';')
      // console.log(find[0])
      this.setData({
        findSku: find[0]
      })
    }
  },
  // 讲横线连接的sku数据用数组表示
  changeOptionIds() {
    let data = this.data.goodsGroupInfo;
    data.forEach((item, index) => {
      let optionsIds = item.spec_option_ids.split('_')
      item.spec_option_ids = optionsIds
    })
  },
  // 切换详情和评价
  changeTab() {
    let id = this.selectComponent("#tab").data.selectedId
    this.setData({
      show: id
    })
  }
})