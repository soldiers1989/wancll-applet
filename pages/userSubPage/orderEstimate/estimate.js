const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: 0,
    goodsInfo: {},
    tempFilePaths: [],
    score:0,
    commentTexts:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地存储的订单列表
    APP.utils.getOrderById(options.orderId, (res) => {
      let goodsList = res.order_goods_info
      this.setData({
        orderId: options.orderId,
      }, () => {
        let goodsInfo = APP.utils.getGoodsById(goodsList, options.goodsId)
        this.setData({ goodsInfo: goodsInfo })
      })
    })
  },
  // 添加图片
  addImage() {
    let that = this;
    let paths = this.data.tempFilePaths;
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        let path = res.tempFilePaths
        path.forEach((item, index) => {
          if (paths.length < 4) {
            paths.push(item)
          }
        })
        that.setData({ tempFilePaths: paths })
      }
    })
  },
  // 图片预览
  previewImage(e) {
    let id = APP.utils.getDataSet(e, 'id')
    let that = this
    wx.previewImage({
      current: that.data.tempFilePaths[id],
      urls: that.data.tempFilePaths,
    })
  },
  // 删除预览图片
  deleltImage(e) {
    let id = APP.utils.getDataSet(e, 'id')
    let arr = this.data.tempFilePaths
    arr.splice(id, 1);
    this.setData({ tempFilePaths: arr })
  },
  // 输入绑定
  textareaInput(e) {
    this.setData({
      commentTexts: e.detail.value
    })
  },
  // 点星星
  canesll(){
    this.setData({ score: 0 })
  },
  star(e){
    let n = APP.utils.getDataSet(e,'n');
    console.log(n)
    this.setData({ score:n})
  },
  send(){
    if (!this.data.commentTexts) {
      wx.showToast({
        title: '输入评价内容',
        icon: 'none',
      })
      return
    }
    if (!this.data.score){
      wx.showToast({
        title: '评个分吧！',
        icon: 'none',
      })
      return
    }
    APP.ajax({
      url: APP.api.orderComments,
      data: {
        content: this.data.commentTexts,
        goods_id: this.data.goodsInfo.goods_id,
        imgs: this.data.tempFilePaths,
        order_id: this.data.goodsInfo.order_id,
        score: this.data.score,
        status:1
      },
      success(res) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          success() {
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