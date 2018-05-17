const APP = getApp();
const STAUTS = ['','等待付款','等待发货','已发货','交易完成']
Page({
  data: {
    orderStaus:'',
    orderData:{},
    orderGoods:[],
  },
  onLoad(options){
    let id = options.id;
    APP.ajax({
      url:APP.api.orderDetail,
      data:{id:id},
      success:res=>{
        this.setData({
          orderStaus:STAUTS[res.data.status],
          orderData:res.data,
          orderGoods:res.data.order_goods_info,
        })
      }
    })
  }
})