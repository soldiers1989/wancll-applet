const APP = getApp();
Page({
  data: {
    cartsDetail: '', // 商品信息
    goodsIds: '', // 请求的数据参数商品的 id数组
    goodsInfo: '', // 请求的数据参数

    allMoney: '', //终合计 多少钱  

    takeAddress: '', // 地址列表
    addressId: '', // 地址id

    view: '', // 当前的钱和优惠状态
    user: '', // 用户的优惠券信息

    selectShow: '', // 显示的优惠券信息
    selectType: '', // 选中的优惠券类型
    selectNum: '', // 选中的金额或者满折

    memo: '',

    // 控制弹出层显示
    showBottomPopupAddress: false,
    showBottomPopupDis1: false,
    showBottomPopupDis2: false,

  },
  onLoad(options) {
    // 读取本地存储的购物车订单信息
    let cartsGoodsInfo = wx.getStorageSync('orderAffim')
    let cartsDetail = cartsGoodsInfo.cartsDetail;
    let goodsIds = cartsGoodsInfo.goodsIds;
    let goodsInfo = cartsGoodsInfo.goodsInfo;


    // 得到规格尺寸信息重新组合和排列
    // let specGroupInfo = itemInfos.goods_spec_group_info;
    // let selectSpecGroupInfo = specGroupInfo.filter(item => {
    //   return item.id == options.spec_group_id;
    // })
    // selectSpecGroupInfo[0].spec_option_group = selectSpecGroupInfo[0].spec_option_group.split('_').join(';');
    //设置数据
    this.setData({
      cartsDetail: cartsDetail,
      goodsIds: goodsIds,
      goodsInfo: goodsInfo,
      // specGroupId: options.spec_group_id,
      // num: options.num,
      // money: options.money,
      // selectSpecGroupInfo: selectSpecGroupInfo[0]
    }, () => {
      this.getDefaultAddress();;
    })
  },
  // 页面显示的时候重新加载 地址数据
  onShow() {
    this.selectComponent("#address").refresh();
  },
  // 组装参数 goods_info
  goodsInfo() {
    let obj = {
      "goods_id": this.data.goodsId,
      "num": this.data.num,
      "spec_group_id": this.data.specGroupId,
    }
    let str = `[${JSON.stringify(obj)}]`;
    return str
  },
  // 获取默认的地址 得到id 然后调用 获取价格
  getDefaultAddress() {
    APP.ajax({
      url: APP.api.orderAffimAddress,
      success: res => {
        this.setData({
          takeAddress: res.data,
          addressId: res.data.id,
        }, () => {
          this.getViewData()
        })
      }
    })
  },
  // 获取价格信息 然后调用获得优惠券信息
  getViewData() {
    APP.ajax({
      url: APP.api.orderAffimView,
      data: {
        address_id: this.data.addressId,
        goods_info: JSON.stringify(this.data.goodsInfo),
      },
      success: res => {
        this.setData({
          view: res.data
        }, () => {
          // console.log('view',res.data)
          this.getUserData()
        })
      }
    })
  },
  // 获取优惠券信息
  getUserData() {
    APP.ajax({
      url: APP.api.orderAffimUser,
      data: {
        goods_ids: this.data.goodsIds,
        money: this.data.view.goods_money
      },
      success: res => {
        this.setData({
          user: res.data
        }, () => {
          this.allMoney()
        })
      }
    })
  },
  // 点击地址刷新数据 然后关闭弹窗
  getClickId(e) {
    let id = e.detail.id;
    this.setData({
      addressId: id
    }, () => {
      let addressList = wx.getStorageSync('address');
      let address = addressList.filter(item => {
        return item.id == id
      })
      this.setData({
        takeAddress: address[0]
      }, () => {
        this.toggilBottomPopupAddress();
      })
    })
  },
  // 减少商品数量
  minus(e) {
    let index = APP.utils.getDataSet(e, 'index');
    let goodsInfo = this.data.goodsInfo;
    let cartsDetail = this.data.cartsDetail;

    let findG = goodsInfo.findIndex(item => {
      return item.goods_id == index;
    });
    let findC = cartsDetail.findIndex(item => {
      return item.goods_id == index;
    });
    if (goodsInfo[findC].num == 1) {
      return
    } else {
      goodsInfo[findC].num -= 1;
      cartsDetail[findG].num -= 1;
      this.setData({
        goodsInfo: goodsInfo,
        cartsDetail: cartsDetail,
      }, () => {
        this.getViewData();
      })
    }
  },

  // 添加商品数量
  plus(e) {
    let index = APP.utils.getDataSet(e, 'index');
    let goodsInfo = this.data.goodsInfo;
    let cartsDetail = this.data.cartsDetail;

    let findG = goodsInfo.findIndex(item => {
      return item.goods_id == index;
    });
    let findC = cartsDetail.findIndex(item => {
      return item.goods_id == index;
    });
    goodsInfo[findC].num += 1;
    cartsDetail[findG].num += 1;
    this.setData({
      goodsInfo: goodsInfo,
      cartsDetail: cartsDetail,
    }, () => {
      this.getViewData();
    })
  },
  // 满折选择
  selectCoupon(e) {
    let id = APP.utils.getDataSet(e, 'id');
    let coupons = this.data.user.coupon.filter(item => {
      return item.id == id;
    })
    let coupon = coupons[0]
    let str = `满${coupon.reach_money}打${coupon.change_value}折`
    this.setData({
      selectShow: str,
      selectType: 'coupon',
      selectNum: coupon.change_value
    }, () => {
      this.toggilBottomPopupDis2();
      this.allMoney()
    })
  },
  // 减满选择
  selectFull(e) {
    let id = APP.utils.getDataSet(e, 'id');
    let fulls = this.data.user.full.filter(item => {
      return item.id == id;
    })
    let full = fulls[0]
    let str = `满${full.full_money}减${full.reduce_money}元`
    this.setData({
      selectShow: str,
      selectType: 'full',
      selectNum: full.reduce_money
    }, () => {
      this.toggilBottomPopupDis1();
      this.allMoney()
    })
  },
  // 买家留言
  memo(e) {
    this.setData({
      memo: e.detail.value
    })
  },
  // 计算总价 勾选了满减后 增减商品后都要计算
  allMoney() {
    let money = this.data.view.total_money;
    // 选了折扣
    if (this.data.selectNum) {
      let num = Number(this.data.selectNum);
      let allMoney = 0;
      if (this.data.selectType == "full") {
        allMoney = money - num
      } else {
        allMoney = money * (num * 0.1)
      }
      this.setData({
        allMoney: allMoney.toFixed(2)
      })
    } else {
      this.setData({
        allMoney: money
      })
    }
  },
  // 发送订单
  saveOrder() {
    // 组装数据
    APP.ajax({
      url: APP.api.orderSaveAll,
      data: {
        address_id: this.data.addressId,
        goods_info: JSON.stringify(this.data.goodsInfo),
        market_activity_id: 0,
        market_activity_type: 0,
        memo: this.data.memo
      },
      success(res) {
        wx.setStorageSync('buyOrder', res.data)
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
        setTimeout(() => {
          wx.redirectTo({
            url: `/pages/userSubPage/orderPay/pay?orderNo=${res.data.order_no}&orderMoney=${res.data.total_money}`
          })
        }, 1000)
      }
    })
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