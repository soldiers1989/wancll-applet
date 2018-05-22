const APP = getApp();
Page({
  data: {
    conlectList: [],
    pageNum: 1,
    pageLimit: 10,
    loading: true,
  },
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
        wx.stopPullDownRefresh();
        that.setData({
          conlectList: conlectList.concat(res.data),
          pageNum: ++pageNum
        })
      },
      fail(err){
        wx.stopPullDownRefresh();
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
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  onPullDownRefresh () {
    this.setData({
      conlectList: [],
      pageNum: 1
    })
    this.getConlectList();
  },
  onReachBottom () {
    this.getConlectList()
  },
  onShareAppMessage () {

  }
})