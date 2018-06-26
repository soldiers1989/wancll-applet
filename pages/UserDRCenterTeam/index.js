const APP = getApp();
Page({
  data: {
    tabList: [{
      id: 1,
      title: '一级'
    }, {
      id: 2,
      title: '二级'
    }, {
      id: 3,
      title: '三级'
    }],
    tabSelectedId: 1,
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
    this.getOrderData(this.data.tabSelectedId)
    this.setData({
      user:wx.getStorageSync('user')
    })
  },
  getOrderData(id) {
    // 数据请求完了
    if (!this.data.FPage.hasData) {
      return;
    }
    APP.ajax({
      url: APP.api.drpTeamUser,
      data: { team_type:id},
      header: {
        'page-limit': 10,
        'page-num': this.data.FPage.pageNum,
      },
      success: (res) => {
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
  // 点击切换顶部的标签
  tabchange(e) {
    let id = this.selectComponent("#tab").data.selectedId
    if (id == this.data.tabSelectedId) {
      return;
    }
    this.setData({
      tabSelectedId: id,
      teamUsers: [],
      ['FPage.hasData']: true,
      ['FPage.pageNum']: 1,
    }, () => {
      this.getOrderData(id);
    })
  },
  onPullDownRefresh: function () {
    this.setData({
      ['FPage.pageNum']: 1,
      ['FPage.hasData']: true,
      teamUsers: []
    }, () => {
      this.getOrderData(this.data.tabSelectedId)
    })
  },

  onReachBottom: function () {
    this.getOrderData(this.data.tabSelectedId)
  }
})