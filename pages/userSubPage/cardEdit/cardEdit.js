const APP = getApp();
const bank = [
  '中国农业银行',
  '中国建设银行',
  '中国工商银行',
  '中国银行',
  '招商银行',
  '光大银行',
  '中国邮政储蓄银行',
  '兴业银行',
  '中信银行',
  '浦发银行',
  '广发银行',
  '平安银行',
  '交通银行',
  '华夏银行',
  '民生银行',
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEdit:false,
    id: 0,
    index: 0,
    bankArray: bank,
    enterName: '',
    enterCard: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    if (options.id != 'new') {
      APP.ajax({
        url: APP.api.myBankCardRead,
        data: { id: options.id },
        success(res) {
          console.log(res.data)
          that.setData({
            isEdit:true,
            index: that.selectBank(res.data.bank_name),
            enterName: res.data.card_holder,
            enterCard: res.data.card_number,
            id: res.data.id,
          })
        }
      })
    }
  },
  // 默认选择的银行
  selectBank(str) {
    let index = bank.findIndex((item) => {
      return item == str
    })
    return index;
  },
  bindPickerChange(e) {
    this.setData({ index: e.detail.value })
  },
  enterName(e) {
    this.setData({ enterName: e.detail.value })
  },
  enterCard(e) {
    this.setData({ enterCard: e.detail.value })
  },
  send(){
    let that = this;
    if (!that.data.enterName) {
      wx.showToast({
        title: '输入持卡人姓名',
        icon: 'none',
      })
      return
    }
    if (!that.data.enterCard) {
      wx.showToast({
        title: '输入卡号',
        icon: 'none',
      })
      return
    }
    let api = '';
    let toUrl='';
    if (that.data.isEdit){
      api = APP.api.myBankCardUpdate;
    }else{
      api = APP.api.myBankCardSave;
    }
    APP.ajax({
      url: api,
      data:{
        id:that.data.id,
        bank_name: that.data.bankArray[that.data.index],
        card_holder: that.data.enterName,
        card_number: that.data.enterCard
      },
      success(res){
        wx.showToast({ title: res.msg, icon: 'none', });
        setTimeout(()=>{
          wx.navigateTo({ url: `/pages/userSubPage/card/card`})
        },1000)
      }
    })
  },
  deleteCard(){
    let that = this;    
    APP.ajax({
      url: APP.api.myBankCardDelete,
      data: { id: that.data.id},
      success(res) {
        wx.showToast({ title: res.msg, icon: 'none', });
        setTimeout(() => {
          wx.navigateTo({ url: `/pages/userSubPage/card/card` })
        }, 1000)
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