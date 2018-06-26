const APP = getApp();
Page({
  data: {
    // 渲染数据列表
    goodsList: [],
    // 发送请求需要的数据
    data: {},
    // 分页功能
    FPage: {
      pageNum: 1,
      hasData: true,
      noContent: false,
      noContentImg: APP.imgs.noContentImg
    },
    // 售罄
    noStockImage: APP.imgs.noStock,

  },
  onLoad: function (options) {
    // 加载页面的判断
    let data = {};
    if (options.cateId) {
      data.goods_cate_id = options.cateId
    } else if (options.keyword) {
      data.keyword = options.keyword;
    } else if (options.tag) {
      data.tag = options.tag;
    } else if (options.distribution) {
      data.system_type = 'drp'
    } else if (options.bonus) {
      data.system_type = 'bonus'
    }
    this.setData({
      data: data
    }, () => {
      this.getGoodsList();
    })
  },

  // 获取商品数据
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/ComDetail/index?id=${id}`,
    })
  },
  // 分页数据请求
  getGoodsList() {
    // 判断是否数据请求完了
    if (!this.data.FPage.hasData) {
      return;
    }
    wx.showLoading({
      title: '加载中...',
    })
    APP.ajax({
      url: APP.api.goods,
      data: this.data.data,
      header: {
        'page-limit': 10,
        'page-num': this.data.FPage.pageNum,
      },
      success: res => {
        wx.hideLoading();
        if (res.data.length) {
          this.setData({
            goodsList: this.data.goodsList.concat(res.data),
            ['FPage.pageNum']: ++(this.data.FPage.pageNum),
            ['FPage.noContent']: false,
          })
        } else {
          // 如果是第一页就为空
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
  // 上拉加载
  onReachBottom() {
    this.getGoodsList();
  },
  // 下拉刷新

  onShareAppMessage() {

  }
})