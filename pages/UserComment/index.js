const APP = getApp();
Page({
  data: {
    goodsComments: [],
    pageNum: 1,
    pageLimit: 10,
    loading: true,
    noContent: false,
    noContentImg: APP.imgs.noContentImg
  },
  onLoad(options) {
    this.getData();
  },
  getData() {
    let that = this
    let pageNum = this.data.pageNum;
    let goodsComments = this.data.goodsComments
    APP.ajax({
      url: APP.api.itemComments,
      header: {
        'page-limit': that.data.pageLimit,
        'page-num': pageNum,
      },
      success(res) {
        if (res.data.length) {
          that.setData({
            goodsComments: that.data.goodsComments.concat(res.data),
            pageNum: ++pageNum,
            noContent: false,
          })
        } else if (that.data.pageNum == 1) {
          that.setData({
            noContent: true,
          })
        }
      }
    })
  },
  previewImg(e) {
    let imgs = e.currentTarget.dataset.imgs;
    let currentImg = e.currentTarget.dataset.currentimg;
    wx.previewImage({
      urls: imgs,
      current: currentImg,
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    this.setData({
      goodsComments: [],
      pageNum: 1
    })
    this.getData();
  },
  onReachBottom: function () {
    this.getData();
  },
  onShareAppMessage: function () {

  }
})