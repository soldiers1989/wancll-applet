const APP = getApp();
Page({
  data: {
    teamUsers:[],
    user:{},
    pageNum: 1,
    noContent: false,
    noContentImg: APP.imgs.noContentImg
  },
  onLoad: function (options) {
    this.getOrderData()
    this.setData({
      user:wx.getStorageSync('user')
    })
  },
  getOrderData() {
    APP.ajax({
      url: APP.api.bonusTeamUser,
      header: {
        'page-limit': 10,
        'page-num': this.data.pageNum,
      },
      success: (res) => {
        if (res.data.team_users.length) {
          this.setData({
            teamUsers: this.data.teamUsers.concat(res.data.team_users),
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
      teamUsers: []
    }, () => {
      this.getOrderData()
    })
  },

  onReachBottom: function () {
    this.getOrderData()
  }
})