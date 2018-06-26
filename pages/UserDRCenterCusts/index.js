const APP = getApp();
Page({
  data: {
    custsUser: [],
    user: {},
    // 分页功能
    FPage: {
      pageNum: 1,
      hasData: true,
      noContent: false,
      noContentImg: APP.imgs.noContentImg
    }
  },
  onLoad: function (options) {
    this.getOrderData()
    this.setData({
      user: wx.getStorageSync('user')
    })
  },
  // 获取数据
  getOrderData() {
    // 数据请求完了
    if (!this.data.FPage.hasData) {
      return;
    }
    APP.ajax({
      url: APP.api.drpChildUser,
      header: {
        'page-limit': 10,
        'page-num': this.data.FPage.pageNum,
      },
      success: (res) => {
        if (res.data.length) {
          this.setData({
            custsUser: this.data.custsUser.concat(res.data),
            ['FPage.pageNum']: ++(this.data.FPage.pageNum),
            ['FPage.noContent']: false,
          })
        } else {
          // 如果是第一页就位空
          if (this.data.FPage.pageNum == 1) {
            this.setData({
              ['FPage.noContent']: true,
              ['FPage.hasData']: false
            })
          } else {
            this.setData({
              ['FPage.hasData']: false
            })
          }
        }
      }
    })
  },

  onPullDownRefresh: function () {
    this.setData({
      ['FPage.pageNum']: 1,
      ['FPage.hasData']: true,
      custsUser: []
    }, () => {
      this.getOrderData()
    })
  },

  onReachBottom: function () {
    this.getOrderData()
  }

})