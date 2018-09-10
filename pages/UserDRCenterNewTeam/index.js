const APP = getApp();
import PagingData from '../../utils/PagingData';
import {
  params
} from '../../api/config.js';
const Paging = new PagingData();
Page({
  data: {
    custsUser: [],
    user: {},
    // 分页功能
    FPage: {
      pageNum: 1,
      hasData: true,
      noContent: false,
      noContentImg: APP.imgs.noContentImg
    }
  },
  onLoad: function(options) {
    this.setData({
      user: wx.getStorageSync('user')
    })
    this.getCount();
    Paging.init({
      type: 2,
      that: this,
      url: 'drpChildUserNew',
      pushData: 'custsUser',
      getFunc: this.getOrderData
    })
    this.getOrderData()
  },
  getCount() {
    APP.ajax({
      url: APP.api.drpChildUserNew,
      data: {
        member_level: params.commonMember
      },
      success: res => {
        wx.setNavigationBarTitle({
          title: '我的团队(' + res.page.data_count + ')',
        })
      }
    });
  },
  getOrderData() {
    Paging.getPagesData({
      postData: {
        member_level: params.bcMember
      }
    })
  },
  onPullDownRefresh() {
    Paging.refresh()
  },
  onReachBottom() {
    this.getOrderData()
  }
})