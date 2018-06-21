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
    pageNum: 1,
    noContent: false,
    noContentImg: APP.imgs.noContentImg
  },
  onLoad: function (options) {
    this.getOrderData(this.data.tabSelectedId)
    this.setData({
      user:wx.getStorageSync('user')
    })
  },
  getOrderData(id) {
    APP.ajax({
      url: APP.api.drpTeamUser,
      data: { team_type:id},
      header: {
        'page-limit': 10,
        'page-num': this.data.pageNum,
      },
      success: (res) => {
        console.log(res.data.team_users.length, this.data.pageNum);
        if (res.data.team_users.length!=0) {
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
  // 点击切换顶部的标签
  tabchange(e) {
    let id = this.selectComponent("#tab").data.selectedId
    // 禁止重复点击
    if (id == this.data.tabSelectedId) {
      return;
    }
    this.setData({
      tabSelectedId: id,
      teamUsers: [],
      pageNum: 1,
    }, () => {
      this.getOrderData(id);
    })
  },
  onPullDownRefresh: function () {
    this.setData({
      pageNum: 1,
      teamUsers: []
    }, () => {
      this.getOrderData(this.data.tabSelectedId)
    })
  },

  onReachBottom: function () {
    this.getOrderData(this.data.tabSelectedId)
  }
})