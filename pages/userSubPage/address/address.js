const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
    pageNum: 1,
    pageLimit: 10,
    loading: true,
    defaultAddress:-1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressList();
  },
  getAddressList() {
    let that = this;
    let pageNum = this.data.pageNum;
    let addressList = this.data.addressList
    APP.ajax({
      url: APP.api.addressList,
      header: {
        'page-limit': that.data.pageLimit,
        'page-num': pageNum,
      },
      data: {},
      success(res) {
        that.setData({
          addressList: addressList.concat(res.data),
          pageNum: ++pageNum
        },()=>{
          that.getDefaultAddress()
        })
      }
    })
  },
  getDefaultAddress(){
    let addressList = this.data.addressList;
    let isDefault = addressList.filter((item,index)=>{
      return item.is_default == 1;
    })
    this.setData({ defaultAddress: isDefault[0].id})
  },
  editAddress(e){
    let id = APP.utils.getDataSet(e, 'id');
    let that = this;
    if(id == 'new'){
      this.goAddressEidt()
    }else{
      this.goAddressEidt(id)
    }
  },
  goAddressEidt(id){
    let param = id ? `?id=${id}`:'';
    wx.navigateTo({ url: `/pages/userSubPage/addressEidt/addressEidt${param}`})
  },
  deleteAddress(e) {
    let id = APP.utils.getDataSet(e, 'id');
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除该地址吗？',
      success: function (res) {
        if (res.confirm) {
          APP.ajax({
            url: APP.api.addressDelete,
            data: { id: id },
            success(res) {
              wx.showToast({
                title: res.msg,
                icon: 'none',
              })
              setTimeout(()=>{
                that.setData({
                  pageNum: 1,
                  addressList:[]
                },()=>{
                  that.getAddressList()
                })
              },1000)
            }
          })
        }
      }
    })
  },
  setDefaultAddress(e){
    let id = APP.utils.getDataSet(e,'id');
    let that = this;
    APP.ajax({
      url: APP.api.addressSetDefault,
      data: {
        is_default:1,
        id:id
      },
      success(res) {
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
        that.setData({ defaultAddress: id })
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
    this.getAddressList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})