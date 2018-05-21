const APP = getApp();
Page({
  data: {
    cartsList: [], // 购物车商品信息列表包含了sku信息组合
    selectObj: {}, // 选择的商品列表
    allPreice: 0.00, // 商品的总价
    goodsInfo: '',    // 商品详细信息
    thisClickId: '', // 当前编辑的那个商品

    selectAll: false, 
    showBottomPopup: false,
    pageNum: 1,
    pageLimit: 10,
  },
  onLoad(options) {
    
  },
  // 页面新显示的时候
  onShow: function () {
    this.setData({
      selectObj:{},
      selectAll:false,
      cartsList:[],
      allPreice: 0.00,
      pageNum: 1,
      thisClickId: ''
    })
    this.getCartsList()
    
  },
  // 获取页面的数据
  getCartsList() {
    let pageNum = this.data.pageNum;
    let cartsList = this.data.cartsList
    APP.ajax({
      url: APP.api.getCartsAll,
      header: {
        'page-limit': this.data.pageLimit,
        'page-num': pageNum,
      },
      data: {},
      success: res => {
        console.log(res.data)
        if (res.data.length) {
          this.setData({
            cartsList: cartsList.concat(res.data)
          })
        }
      }
    })
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
    let cartsList = this.data.cartsList;
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
          [`cartsList[${index}]`]: res.data
        }, () => {
          this.allPreice()
        })
      }
    })
  },
  // 找到当前编辑的那个宝贝信息
  findItemById() {
    let cartsList = this.data.cartsList;
    let index = cartsList.findIndex(item => {
      return item.id == this.data.thisClickId
    })
    let oneItem = cartsList[index]
    // 返回需要发送的信息
    return {
      index: index,
      id: this.data.thisClickId,
      goods_id: oneItem.goods_id,
      num: oneItem.num,
      spec_group_id: oneItem.spec_group_id,
    }
  },
  // 校验当前是全选还是非全选
  checkSelectAll() {
    let listLen = this.data.cartsList.length;
    let objLen = Object.keys(this.data.selectObj).length;
    let selectAll = objLen == listLen ? true : false;
    this.setData({
      selectAll: selectAll
    })
  },
  // 全选按钮
  selectAll() {
    this.setData({
      selectAll: !this.data.selectAll
    }, () => {
      let cartsList = this.data.cartsList;
      let selectObj = {};
      if (this.data.selectAll) {
        cartsList.forEach(item => {
          selectObj[item.id] = true;
        });
      }
      this.setData({
        selectObj: selectObj
      }, () => {
        this.allPreice()
      })
    })
  },
  // 总价计算
  allPreice() {
    let selectObj = this.data.selectObj;
    let cartsList = this.data.cartsList;
    let allPreice = 0;
    cartsList.forEach(item => {
      if (selectObj[item.id]) {
        let num = item.num;
        let price = item.spec_group_info.sell_price
        let sum = price * num;
        allPreice += sum;
      }
    });
    this.setData({
      allPreice: allPreice
    })
  },
  // 单个宝贝的选择
  select(e) {
    let selectObj = this.data.selectObj;
    let id = APP.utils.getDataSet(e, 'id');
    if (selectObj[id]) {
      delete selectObj[id];
    } else {
      selectObj[id] = true
    }
    this.setData({
      selectObj: selectObj
    }, () => {
      this.checkSelectAll()
      this.allPreice()
    })
  },
  // 点击减的按钮
  minus(e) {
    let id = APP.utils.getDataSet(e, 'id');
    this.setData({
      thisClickId: id,
    }, () => {
      let sendData = this.findItemById();
      if (sendData.num == 1) {
        return;
      } else {
        sendData.num -= 1;
      }
      this.update(sendData)
    })
  },
  // 点击加的按钮
  plus(e) {
    let id = APP.utils.getDataSet(e, 'id');
    this.setData({
      thisClickId: id,
    }, () => {
      let sendData = this.findItemById();
      sendData.num += 1;
      this.update(sendData);
    })
  },
  // 打开弹出层
  openBottomPopup(e) {
    let index = APP.utils.getDataSet(e, 'index');
    let id = APP.utils.getDataSet(e, 'id');
    this.setData({
      showBottomPopup: true,
      thisClickId: id,
      goodsInfo: this.data.cartsList[index].goods_info,
      sendfindsku: this.data.cartsList[index].spec_group_info,
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
   
    let cartsList = this.data.cartsList;
    let selectObj = this.data.selectObj;
    // console.log(selectObj)
    let cartsDetail = []; // 订单确认页面需要读取的产品信息
    let goodsInfo = []; // 订单确认页面需要发送请求的信息
    let goodsIds = [];  // 订单确认页面需要发送请求的信息
    cartsList.forEach(item => {
      if (selectObj[item.id]) {
        cartsDetail.push(item);
        goodsIds.push(item.goods_id)
        goodsInfo.push({
          goods_id: item.goods_id,
          num: item.num,
          spec_group_id: item.spec_group_id,
        })
      }
    })
    if(cartsDetail.length ==0 || goodsInfo.length==0 || goodsIds.length==0){
      wx.showToast({
        title: '最少选择一个商品',
        icon: 'none',
        duration: 500
      });
      return;
    }
    let orderAffim = {
      goodsInfo: goodsInfo,
      goodsIds: goodsIds,
      cartsDetail: cartsDetail
    }
    // console.log(orderAffim)
    // 本地存储 当前选中的订单信息以及商品信息
    wx.setStorageSync('orderAffim', orderAffim)
    wx.navigateTo({
      url: `/pages/detailOrderAffirm/detailOrderAffim`
    })
  },

})