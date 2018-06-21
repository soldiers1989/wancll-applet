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
    pageNum: 1,
    noContent: false,
    noContentImg: APP.imgs.noContentImg
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderData(this.tabSelectedId)
  },
  // 获取数据
  getOrderData(status) {
    let data = status != 0 ? { status: status } : {}
    APP.ajax({
      url: APP.api.drpApplysList,
      data: data,
      header: {
        'page-limit': 10,
        'page-num': this.data.pageNum,
      },
      success:(res)=> {
        if (res.data.applys.length) {
          this.setData({
            dbList: this.data.dbList.concat(res.data.applys),
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
      dbList: [],
      pageNum: 1,
    }, () => {
      this.getOrderData(id);
    })
  },
  goDetailInfo(e){
    let id = APP.utils.getDataSet(e,'id');
    wx.navigateTo({
      url: `/pages/UserDRCenterDetailInfo/index?id=${id}`,
    })
  },
  
  onPullDownRefresh: function () {
    this.setData({
      pageNum: 1,
      dbList: []
    }, () => {
      this.getOrderData(this.tabSelectedId)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getOrderData(this.tabSelectedId)
  }

})