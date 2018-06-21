const APP = getApp();
Page({
  data: {
    custsUser: [],
    user: {},
    pageNum: 1,
    noContent: false,
    noContentImg: APP.imgs.noContentImg
  },
  onLoad: function (options) {
    this.getOrderData()
    this.setData({
      user: wx.getStorageSync('user')
    })
  },
  getOrderData() {
    APP.ajax({
      url: APP.api.drpChildUser,
      header: {
        'page-limit': 10,
        'page-num': this.data.pageNum,
      },
      success: (res) => {
        console.log(res.data)
        if (res.data.length) {
          this.setData({
            custsUser: this.data.custsUser.concat(res.data),
            pageNum: ++(this.data.pageNum),
            noContent: false,
          })
        } else if (this.data.pageNum == 1) {
          this.setData({
            noContent: true
          })
        }
      }
    })
  },

  onPullDownRefresh: function () {
    this.setData({
      pageNum: 1,
      custsUser: []
    }, () => {
      this.getOrderData()
    })
  },

  onReachBottom: function () {
    this.getOrderData()
  }
})