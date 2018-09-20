const APP = getApp()
Page({
  data: {
    list: [],
    page: 1,
    haveNoData: false,
    noContentImg: APP.imgs.noContentImg,
    user: {},
    team_info: {},
  },
  onLoad(options) {
    this.setData({
      user: wx.getStorageSync('user')
    })
    this.getList()
  },
  getList() {
    APP.ajax({
      url: APP.api.bonusTeamUser,
      header: {
        'page-num': this.data.page,
        'page-limit': 10,
      }
    }).then(res => {
      let list = APP.util.arrayToUnique(this.data.list.concat(res.data.team_users))
      this.setData({
        list: list,
        haveNoData: !Boolean(list.length),
        page: this.data.page + 1,
        team_info: res.data.team_info,
      })
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      page: 1,
      list: [],
    })
    this.getList()
  },
  // 上拉加载
  onReachBottom() {
    this.getList()
  }
})