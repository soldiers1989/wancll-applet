const APP = getApp()

function getKeywords(that) {
  // 热搜
  APP.ajax({
    url: APP.api.goodsKeywordsList,
  }).then(resp => {
    that.setData({
      hotKeywordsList: resp.data || []
    })
  }).catch(e => {})
  // 用户搜索
  if (wx.getStorageSync('token')) {
    APP.ajax({
      url: APP.api.userGoodsKeywordsRead,
    }).then(resp => {
      that.setData({
        userKeywordsList: resp.data ? resp.data.keywords : []
      })
    }).catch(e => {})
  }
}
// 删除关键词
function deleteKeywords(that) {
  wx.showModal({
    title: '确认删除历史搜索?',
    success(res) {
      if (res.confirm) {
        APP.ajax({
          url: APP.api.deleteKeywords,
        }).then(resp => {
          wx.showToast({
            title: resp.msg,
            icon: 'none',
          })
          that.setData({
            userKeywordsList: []
          })
        }).catch(e => {})
      }
    }
  })
}

export {
  getKeywords,
  deleteKeywords,
}