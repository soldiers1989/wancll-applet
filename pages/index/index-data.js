const APP = getApp();
export function getOtherData(that) {
  // 获取首页轮播图  
  let proImgUrls = new Promise((resolve) => {
    APP.ajax({
      url: APP.api.indexBanners,
      data: {
        type: "wap首页轮播"
      },
      success: (res) => {
        resolve(res.data);
      }
    })
  })
  // 获取首页公告  
  let proNotice = new Promise((resolve) => {
    let notice = {};
    notice.img = APP.imgs.notice;
    APP.ajax({
      url: APP.api.indexAnnoncements,
      data: {
        type: "wap首页公告"
      },
      success: (res) => {
        notice.data = res.data
        resolve(notice);
      }
    })
  })
  // 获取促销列表
  let proSellList = new Promise((resolve) => {
    let title = ['新品', '精品', '热销', '折扣', '清仓']
    let smallImg = APP.imgs.smallImg;
    let sellList = [];
    title.forEach((item, index) => {
      sellList.push({
        title: item,
        img: smallImg[index]
      })
    });
    resolve(sellList);
  })
  // 获取限时折扣
  let proActivity = new Promise((resolve) => {
    APP.ajax({
      url: APP.api.indexActivity,
      success: (res) => {
        resolve(res.data);
        console.log('活动', res.data)
      }
    })
  })
  // 获取商品列表
  // 下拉刷新要不要重新刷新商品？？？？

  // 输出结果
  Promise.all([
    proImgUrls,
    proNotice,
    proSellList,
    proActivity,
  ]).then((values) => {
    that.setData({
      imgUrls: values[0],
      notice: values[1],
      sellList: values[2],

      discount: values[3].discount ? values[3].discount : [],
      full: values[3].full ? values[3].full : [],
      ready: true
    }, () => {
      let timer = setTimeout(() => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        clearTimeout(timer);
      }, 500)
      // 设置倒计时
      setInterval(() => {
        APP.utils.timeDown(that, that.data.discount[0].end_timestamp * 1000)
      }, 1000)
    })
  })




  // // 获取首页公告
  // APP.ajax({
  //   url: APP.api.indexAdvertisements,
  //   data: { type: "wap首页广告" },
  //   success: (res) => {
  //     // console.log(res)
  //   }
  // })

  // ------------------
  // APP.ajax({
  //   url: APP.api.indexConfigs,
  //   success: (res) => {
  //     // console.log(res)
  //   }
  // })

  // 获取首页活动

  // 获取首页广告

}
export function getGoodsData(that, id = '') {
  const pageLimit = 10;
  let count = that.data.dataCount;
  let data = that.data.goods;
  // 数据获取完了 不请求
  if (count == data.length) {
    that.setData({
      loading: false
    })
    return
  }
  APP.ajax({
    url: APP.api.goods,
    data: {
      goods_cate_id: id
    },
    header: {
      'page-limit': 10,
      'page-num': that.data.pageNum
    },
    success: (res) => {
      that.setData({
        dataCount: res.page.data_count,
        goods: data.concat(res.data)
      }, () => {
        that.data.pageNum++;
      })
    }
  })
}