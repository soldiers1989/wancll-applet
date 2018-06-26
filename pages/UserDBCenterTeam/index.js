const APP = getApp();
Page({
  data: {
    teamUsers:[],
    user:{},
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
      user:wx.getStorageSync('user')
    })
  },
  getOrderData() {
    // 数据请求完了
    if (!this.data.FPage.hasData) {
      return;
    }
    wx.showLoading({
      title: '加载中...',
    })
    APP.ajax({
      url: APP.api.bonusTeamUser,
      data: data,
      header: {
        'page-limit': 10,
        'page-num': this.data.FPage.pageNum,
      },
      success: (res) => {
        wx.hideLoading();
        if (res.data.team_users.length) {
          this.setData({
            teamUsers: this.data.teamUsers.concat(res.data.team_users),
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
      teamUsers: []
    }, () => {
      this.getOrderData()
    })
  },

  onReachBottom: function () {
    this.getOrderData()
  }
})