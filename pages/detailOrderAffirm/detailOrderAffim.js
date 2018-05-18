const APP = getApp();
Page({
  data: { 
    goodsInfo:'',
    address:'',
    view:'',
    user:''
  },
  onLoad(options){
    console.log(options)
    this.getAddress();
    this.getUserData();
  },
  // 获取地址
  getAddress(){
    APP.ajax({
      url:APP.api.orderAffimAddress,
      success:res=>{
        this.setData({
          address:res.data
        },()=>{
          this.getViewData(res.data.id)
        })
      }
    })
  },
  // 获取sku信息
  getViewData(addressId){
    APP.ajax({
      url:APP.api.orderAffimView,
      data:{
        address_id:addressId,
        goods_info:''
      },
      success:res=>{
        
      }
    })
  },
  // 获取优惠券信息
  getUserData(){
    APP.ajax({
      url:APP.api.orderAffimUser,
      data:{},
      success:res=>{
        
      }
    })
  }
})