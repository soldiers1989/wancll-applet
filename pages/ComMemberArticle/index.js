const APP = getApp();
Page({
  data: {
    article: {}
  },
  onLoad: function(options) {
    APP.ajax({
      url: APP.api.articleArticle,
      data: {
        id:options.id
      },
      success: res => {
        wx.setNavigationBarTitle({
          title: res.data.title,
        })
        this.setData({
          article: res.data
        })
      }
    })
  },
})