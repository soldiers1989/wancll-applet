const APP = getApp();
Page({
  data: {
    itemInfo: '', // 商品信息
    goodsId: '', // 商品的 id数组
    num: '', // 商品个数
    money: '', // 多少钱 
    allMoney:'', //终合计 多少钱  
    specGroupId: '', // sku 对应id
    takeAddress: '', // 地址列表
    addressId: '', // 地址id
    view: '', // 当前的钱和优惠状态
    user: '', // 用户的优惠券信息
    selectSpecGroupInfo: '', // 选中的sku对象
    selectShow: '', // 显示的优惠券信息
    selectType:'',
    selectNum:'',
    // 控制弹出层显示
    showBottomPopupAddress: false,
    showBottomPopupDis1: false,
    showBottomPopupDis2: false,

  },
  onLoad(options) {
    // 读取本地的当前选中的商品信息
    let itemInfo = wx.getStorageSync('buyItem');
    // 得到规格尺寸信息重新组合和排列
    let specGroupInfo = itemInfo.goods_spec_group_info;
    let selectSpecGroupInfo = specGroupInfo.filter(item => {
      return item.id == options.spec_group_id;
    })
    selectSpecGroupInfo[0].spec_option_group = selectSpecGroupInfo[0].spec_option_group.split('_').join(';');
    //设置数据
    this.setData({
      itemInfo: itemInfo,
      goodsId: options.goods_id,
      specGroupId: options.spec_group_id,
      num: options.num,
      money: options.money,
      selectSpecGroupInfo: selectSpecGroupInfo[0]
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
    let obj =  {
      "goods_id": this.data.goodsId,
      "num": this.data.num,
      "spec_group_id": this.data.specGroupId,
    }
    let str = `[${JSON.stringify(obj)}]`;
    return str
  },
  // 参数数组
  goodsIds() {
    let id = this.data.goodsId;
    return [id]
  },
  // 获取默认的地址
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
  // 获取sku信息
  getViewData() {
    let goodsInfo = this.goodsInfo();
    APP.ajax({
      url: APP.api.orderAffimView,
      data: {
        address_id: this.data.addressId,
        goods_info: goodsInfo,
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
    let goodsIds = this.goodsIds();
    APP.ajax({
      url: APP.api.orderAffimUser,
      data: {
        goods_ids: goodsIds,
        money: this.data.view.goods_money
      },
      success: res => {
        this.setData({
          user: res.data
        },()=>{
          this.allMoney()
        })
        // console.log('uesr', res.data)
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
      console.log(address[0])
      this.setData({
        takeAddress: address[0]
      }, () => {
        this.toggilBottomPopupAddress();
      })
    })
  },
  minus() {
    let num = this.data.num;
    if (num > 1) {
      --num
      this.setData({
        num: num,
      },()=>{
        this.getViewData();
        this.getUserData();
      })
    }else{
      return;
    }
  },
  plus() {
    let num = this.data.num;
    ++num
    this.setData({
      num: num,
    },()=>{
      this.getViewData();
      this.getUserData();
    })
  },
  // 计算总价 勾选了满减后 增减商品后都要计算
  allMoney(){
    let money = this.data.view.total_money;
    // 选了折扣
    if(this.data.selectNum){
      let num = Number(this.data.selectNum);
      let allMoney = 0;
      if(this.data.selectType=="full"){
        allMoney = money - num
      }else{
        allMoney = money * (num * 0.1)
      }
      this.setData({
        allMoney:allMoney.toFixed(2)
      })
    }else{
      this.setData({
        allMoney:money
      })
    }
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
      selectType:'coupon',
      selectNum:coupon.change_value
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
      selectType:'full',
      selectNum:full.reduce_money
    }, () => {
      this.toggilBottomPopupDis1();
      this.allMoney()
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