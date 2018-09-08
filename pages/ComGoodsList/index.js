const APP = getApp();
import PagingData from '../../utils/PagingData';
const Paging = new PagingData();
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

    adImg: [], // 广告图

  },
  onLoad: function(options) {
    Paging.init({
      type: 2,
      that: this,
      url: 'goods',
      pushData: 'goodsList',
      getFunc: this.getGoodsList
    })

    // 加载页面的判断
    let data = {};
    if (options.cateId) {
      data.goods_cate_id = options.cateId
    } else if (options.type == 'keyword') {
      data.keyword = options.value;
    } else if (options.tag) {
      data.tag = options.tag;

      // 新人专区 要加载广告图
      if (options.tag == '新人专区') {
        APP.ajax({
          url: APP.api.indexBackground,
          success: res => {
            this.setData({
              adImg: res.data.filter(item => {
                return item.position == '新人专区';
              })
            });
          }
        });
      }
    }

    this.setData({
      data: data
    }, () => {
      this.getGoodsList();
    })
  },
  // 去搜索页面
  goSearchPage() {
    wx.navigateTo({
      url: '/pages/ComSearch/index',
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
    Paging.getPagesData({
      postData: this.data.data
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    Paging.refresh()
  },
  // 上拉加载
  onReachBottom() {
    this.getGoodsList();
  }
})