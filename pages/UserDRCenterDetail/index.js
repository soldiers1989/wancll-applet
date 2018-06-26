const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{
      id: 0,
      title: '全部'
    }, {
      id: 1,
      title: '待审核'
    }, {
      id: 2,
      title: '未通过审核'
    }, {
      id: 3,
      title: '已打款'
    }],
    tabSelectedId: 0,
    dbList: [],
    // 分页功能
    FPage: {
      pageNum: 1,
      hasData: true,
      noContent: false,
      noContentImg: APP.imgs.noContentImg
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderData(this.tabSelectedId)
  },
  goDetailInfo(e){
    let id = APP.utils.getDataSet(e,'id');
    wx.navigateTo({
      url: `/pages/UserDRCenterDetailInfo/index?id=${id}`,
    })
  },

  // 获取数据
  getOrderData(status) {
    // 数据请求完了
    if (!this.data.FPage.hasData) {
      return;
    }
    let data = status != 0 ? { order_status: status } : {}
    APP.ajax({
      url: APP.api.drpApplysList,
      data: data,
      header: {
        'page-limit': 10,
        'page-num': this.data.FPage.pageNum,
      },
      success: (res) => {
        if (res.data.applys.length) {
          this.setData({
            dbList: this.data.dbList.concat(res.data.applys),
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
    // 禁止重复点击
    if (id == this.data.tabSelectedId) {
      return;
    }
    this.setData({
      tabSelectedId: id,
      dbList: [],
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
      dbList: []
    }, () => {
      this.getOrderData(this.tabSelectedId)
    })
  },
  onReachBottom: function () {
    this.getOrderData(this.tabSelectedId)
  }

})