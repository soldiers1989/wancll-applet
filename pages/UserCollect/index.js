const APP = getApp()
Page({
  data: {
    list: [],
    haveNoData: false,
    page: 1,
    noContentImg: APP.imgs.noContentImg,
  },
  onLoad() {
    this.getList()
  },
  getList() {
    APP.ajax({
      url: APP.api.collectionList,
    }).then(res => {
      let list = APP.util.arrayToUnique(this.data.list.concat(res.data))
      this.setData({
        list: list,
        haveNoData: !Boolean(list.length),
        page: this.data.page + 1
      })
    })
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
  goDetail(e) {
    let id = APP.util.getDataSet(e, 'id')
    wx.navigateTo({
      url: `/pages/ComGoodsDetail/index?id=${id}`,
    })
  },
  // 删除收藏
  collectionDelete(e) {
    let id = APP.util.getDataSet(e, 'id')
    let index = APP.util.getDataSet(e, 'index')
    wx.showModal({
      title: '提示',
      content: '确定要从收藏中移除商品吗？',
      success: (res) => {
        if (res.confirm) {
          APP.ajax({
            url: APP.api.collectionDelete,
            data: {
              id: id,
            },
          }).then(res => {
            APP.util.toast(res.msg)
            this.data.list.splice(index, 1)
            console.log(this.data.list.length)
            this.setData({
              list: this.data.list,
              haveNoData: !Boolean(this.data.list.length),
            })
          })
        }
      }
    })
  }
})