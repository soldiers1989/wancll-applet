const APP = getApp();
Page({
  data: {
    tabList: [{
      id: 0,
      name: '全部'
    }, {
      id: 1,
      name: '待审核'
    }, {
      id: 2,
      name: '未通过审核'
    }, {
      id: 3,
      name: '已打款'
    }],
    tabSelectedId: 0,
    apply_num: '',
    money: '',
    // 分页数据
    list: [],
    page: 1,
    haveNoData: false,
    noContentImg: APP.imgs.noContentImg,
  },
  // 初始化
  onLoad: function(options) {
    this.getList()
  },
  getList() {
    let data = {}
    if (this.data.tabSelectedId) {
      data.status = this.data.tabSelectedId
    }
    APP.ajax({
      url: APP.api.bonusApplysList,
      data: data,
      header: {
        'page-num': this.data.page,
        'page-limit': 10,
      }
    }).then(res => {
      let list = APP.util.arrayToUnique(this.data.list.concat(res.data.applys))
      this.setData({
        list: list,
        haveNoData: !Boolean(list.length),
        page: this.data.page + 1,
        apply_num: res.data.apply_num,
        money: res.data.money,
      })
    }).catch(err => {
      console.warn(err)
    })
  },
  // 上拉加载
  onReachBottom() {
    this.getList()
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      page: 1,
      list: [],
    })
    this.getList()
    wx.stopPullDownRefresh()
  },
  // 点击切换顶部的标签
  tabChange(event) {
    this.setData({
      page: 1,
      list: [],
      tabSelectedId: event.detail
    })
    this.getList()
  },
  // 进入详情
  goDetailInfo(e) {
    let id = APP.utils.getDataSet(e, 'id');
    wx.navigateTo({
      url: `/pages/UserDBCenterDetailInfo/index?id=${id}`,
    })
  }
})