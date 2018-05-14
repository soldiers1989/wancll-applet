const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:0,
    goodsInfo: {},
    tempFilePaths:[],
    refoundTexts:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    // 获取本地存储的订单列表
    APP.utils.getOrderById(options.orderId, (res) => {
      let goodsList = res.order_goods_info
      this.setData({ 
        orderId: options.orderId,
      },()=>{
        let goodsInfo = APP.utils.getGoodsById(goodsList, options.goodsId)
        this.setData({ goodsInfo:goodsInfo})
      })
    })
    
  },
  // 输入绑定
  textareaInput(e){
    this.setData({
      refoundTexts:e.detail.value
    })
  },
  // 添加图片
  addImage(){
    let that = this;
    let paths = this.data.tempFilePaths;
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res){
        let path = res.tempFilePaths
        path.forEach((item,index)=>{
          if (paths.length<4){
            paths.push(item)
          }
        })
        that.setData({ tempFilePaths: paths})
      }
    })
  },
  // 图片预览
  previewImage(e){
    let id = APP.utils.getDataSet(e,'id')
    let that=this
    wx.previewImage({
      current: that.data.tempFilePaths[id],
      urls: that.data.tempFilePaths,
    })
  },
  // 删除预览图片
  deleltImage(e){
    let id = APP.utils.getDataSet(e, 'id')
    let arr = this.data.tempFilePaths
    arr.splice(id,1);
    this.setData({ tempFilePaths: arr})
  },
  // 退款  此方法不完善，等待修复
  send(){
    let that=this;
    if (!that.data.refoundTexts){
      wx.showToast({
        title: '输入退款原因',
        icon: 'none',
      })
      return
    }
    APP.ajax({
      url: APP.api.orderRefound,
      data: {
        order_id: Number(that.data.orderId),
        order_goods_id: that.data.goodsInfo.id,
        imgs: that.data.tempFilePaths,
        return_reason: that.data.refoundTexts,
        return_type:1
      },
      success(res) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          success(){
            let params = APP.utils.paramsJoin({
              target: wx.getStorageSync('thisOrderList')
            })
            setTimeout(() => {
              wx.navigateTo({
                url: `/pages/userSubPage/order/order?${params}`,
              })
            }, 1000)
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})