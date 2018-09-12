const APP = getApp();
Page({
  data: {
    article: {}
  },
  onLoad: function(options) {
    APP.ajax({
      url: APP.api.articleArticle,
      data: {
        id: options.id
      },
      success: res => {
        wx.setNavigationBarTitle({
          title: res.data.title,
        })
        
        res.data.content = res.data.content.replace('<img', '<img style="max-width:100%;height:auto" ');
        this.setData({
          article: res.data
        })
      }
    })
  },
})