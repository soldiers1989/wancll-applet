const APP = getApp();

Page({
  data: {
    bgImg: APP.imgs.DRcenter,
    user: {},
    drpData: {},
  },
  
  goSubPage(e) {
    let target = APP.utils.getDataSet(e, 'target');
    wx.navigateTo({
      url: `/pages/UserDRCenterNew${target}/index`,
    })
  },

  onShow: function () {
    let user = wx.getStorageSync('user');
    APP.ajax({
      url: APP.api.drpCenterNew,
      success: res => {
        res.data.total_money = Number(res.data.total_money).toFixed(2);
        res.data.except_money = Number(res.data.except_money).toFixed(2);
        this.setData({
          drpData: res.data,
          user: user
        })
      }
    })
  },
})