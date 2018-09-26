const APP = getApp()
// 首页数据
function getData(that) {
  // 获取首页轮播图  
  let bannersPromise = APP.ajax({
    url: APP.api.bannerList,
    data: {
      type_id: 11
    }
  })
  // 获取首页公告  
  let announcementsPromise = APP.ajax({
    url: APP.api.indexAnnouncement,
    data: {
      type_id: 29
    }
  })
  // 获取促销列表
  let tagsPromise = new Promise((resolve) => {
    let titles = ['新品', '精品', '热销', '折扣', '清仓']
    let tagImgs = APP.imgs.tagImgs
    let tags = titles.map((item, index) => {
      return {
        title: item,
        img: tagImgs[index]
      }
    })
    resolve(tags)
  })
  // 获取限时折扣
  let activitiesPromise = APP.ajax({
    url: APP.api.activities
  })

  // 输出结果
  Promise.all([
    bannersPromise,
    announcementsPromise,
    tagsPromise,
    activitiesPromise
  ]).then((values) => {
    that.setData({
      banners: values[0].data,
      announcements: values[1].data,
      tags: values[2],
      discountActivities: values[3].data.discount ? values[3].data.discount : [],
      ready: true
    }, () => {
      let timer = setTimeout(() => {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        clearTimeout(timer)
      }, 500)
      if (that.data.discountActivities.length > 0) {
        // 设置倒计时
        setInterval(() => {
          APP.util.timeDown(that, that.data.discountActivities[0].end_timestamp * 1000)
        }, 1000)
      }
    })
  }).catch(e => {
    wx.hideLoading()
    wx.stopPullDownRefresh()
  })
}
// 查询商品列表
function getGoodsList(that) {
  APP.ajax({
    url: APP.api.goodsList,
    header: {
      'page-num': that.data.page,
      'page-limit': 10
    }
  }).then((resp) => {
    let goodsList = APP.util.arrayToUnique(that.data.goodsList.concat(resp.data))
    that.setData({
      goodsList: goodsList,
      page: that.data.page + 1
    })
  }).catch(e => {})
}

export {
  getData,
  getGoodsList,
}