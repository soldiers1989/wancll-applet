const APP = getApp();
Page({
  data: {
    article: {}
  },
  onLoad(options) {
    // 公告内容
    if (options.type == 'announcement') {
      wx.setNavigationBarTitle({
        title: '公告详情',
      })
      this.getData({
        url: APP.api.announcementRead,
        data: {
          id: options.id
        }
      })
    }
    // 注册页面
    if (options.type == 'rule') {
      this.getData({
        url: APP.api.ruleRead,
        data: {
          id: options.id
        }
      })
    }
  },
  getData(options) {
    APP.ajax({
      url: options.url,
      data: options.data,
    }).then(resp => {
      this.setData({
        article: resp.data
      })
    }).catch(e => {})
  },
})