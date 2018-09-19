const APP = getApp();
Page({
  data: {
    article: {}
  },
  onLoad: function(options) {
    // 公告内容
    if (options.type == 'index') {
      wx.setNavigationBarTitle({
        title: '公告详情',
      })
      this.getData({
        url: APP.api.articlesNotice,
        data: {
          id: options.id
        }
      })
    }
    if (options.type == 'article') {
      wx.setNavigationBarTitle({
        title: '文章详情',
      });
      this.getData({
        url: APP.api.articleArticle,
        data: {
          id: options.id
        }
      });
    }
    // 注册页面
    if (options.type == 'reg') {
      let title = ''
      if (options.id == 1) {
        title = '服务条款'
      }
      if (options.id == 2) {
        title = '隐私政策'
      }
      wx.setNavigationBarTitle({
        title: title,
      })
      this.getData({
        url: APP.api.articlesReg,
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
      success: res => {
        wx.setNavigationBarTitle({
          title: res.data.title,
        });
        res.data.content = APP.utils.richPicReplace(res.data.content);
        this.setData({
          article: res.data
        })
      }
    })
  },
})