const APP = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    conlectList: [],
    pageNum: 1,
    pageLimit: 10,
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getConlectList();
  },
  getConlectList() {
    let that = this;
    let pageNum = this.data.pageNum;
    let conlectList = this.data.conlectList
    APP.ajax({
      url: APP.api.collections,
      header: {
        'page-limit': that.data.pageLimit,
        'page-num': pageNum,
      },
      data: {},
      success(res) {
        that.setData({
          conlectList: conlectList.concat(res.data),
          pageNum: ++pageNum
        })
      }
    })
  },
  deleteItem(e) {
    let id = APP.utils.getDataSet(e, 'id');
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要从收藏中移除商品吗？',
      success (res) {
        if (res.confirm) {
          APP.ajax({
            url: APP.api.collectionsDelete,
            data: { id: id },
            success(res) {
              wx.showToast({
                title: res.msg,
                icon: 'none',
              })
              setTimeout(() => {
                that.setData({ 
                  pageNum: 1,
                  conlectList:[]
                }, () => {
                  that.getConlectList()
                })
              })
            }
          })
        }
      }
    })
  },
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    // console.log(id);
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
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
    this.getConlectList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})