const APP = getApp()
Page({
  data: {
    list: [],
    haveNoData: false,
    page: 1,
    noContentImg: APP.imgs.noContentImg,
  },
  onLoad(options) {
    this.getList()
  },
  getList() {
    APP.ajax({
      url: APP.api.userComments,
      header: {
        'page-num': this.data.page,
        'page-limit': 10,
      }
    }).then(res => {
      let list = APP.util.arrayToUnique(this.data.list.concat(res.data))
      this.setData({
        list: list,
        haveNoData: !Boolean(list.length),
        page: this.data.page + 1
      })
    }).catch(err => {})
  },
  onPullDownRefresh() {
    this.setData({
      page: 1,
      list: [],
    })
    this.getList()
    wx.stopPullDownRefresh()
  },
  onReachBottom() {
    this.getList()
  },
  previewImg(e) {
    let imgs = APP.util.getDataSet(e, 'imgs')
    let currentImg = APP.util.getDataSet(e, 'currentimg')
    wx.previewImage({
      urls: imgs,
      current: currentImg,
    })
  }
})