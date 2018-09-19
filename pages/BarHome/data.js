const APP = getApp();

// 获取背景图片
export function getBackground(that) {
  APP.ajax({
    url: APP.api.indexBackground,
    success: (res) => {
      let backgroundImgs = {};
      let background = ['foreign', 'score', 'group', 'activity'];
      for (var i = 0; i < res.data.length; i++) {
        let url = '';
        if (background.indexOf(res.data[i].position) != -1) {
          url = 'url(' + res.data[i].img + ')';
        } else {
          url = res.data[i].img;
        }
        backgroundImgs[res.data[i].position] = res.data[i];
        backgroundImgs[res.data[i].position].url = url;
      }
      that.setData({
        backgroundImgs: backgroundImgs
      });
    }
  })
}

export function getOtherData(that) {
  // 获取首页轮播图  
  let proImgUrls = new Promise((resolve) => {
    APP.ajax({
      url: APP.api.indexBanners,
      data: {
        type_id: 11
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
      success: (res) => {
        notice.data = res.data
        resolve(notice);
      }
    })
  })

  // 获取首页标签
  let proTags = new Promise((resolve) => {
    APP.ajax({
      url: APP.api.indexTags,
      success: (res) => {
        resolve(res.data);
      }
    })
  })

  // 获取促销列表
  let proSellList = new Promise((resolve) => {
    let title = ['新品', '精品', '热销', '折扣', '清仓', '测试']
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
      }
    })
  })
  // 获取广告+轮播产品列表
  let proWapIndex = new Promise((resolve) => {
    APP.ajax({
      url: APP.api.indexWapIndex,
      success: (res) => {
        resolve(res.data);
      }
    })
  })

  // 获取海外商品
  let proForeignGoods = new Promise((resolve) => {
    APP.ajax({
      url: APP.api.goods,
      header: {
        'page-limit': 20,
        'page-num': 1
      },
      data: {
        is_foreign: 1,
        is_member_goods: 0,
      },
      success: (res) => {
        resolve(res.data);
      }
    })
  })

  // 获取团购专区商品
  let proGroupGoods = new Promise((resolve) => {
    APP.ajax({
      url: APP.api.groupGoods,
      header: {
        'page-limit': 20,
        'page-num': 1
      },
      success: (res) => {
        resolve(res.data);
      }
    })
  })

  // 获取积分专区商品
  let proScoreGoods = new Promise((resolve) => {
    APP.ajax({
      url: APP.api.scoreGoods,
      header: {
        'page-limit': 20,
        'page-num': 1
      },
      success: (res) => {
        resolve(res.data);
      }
    })
  })

  // 获取商品列表
  // 输出结果
  Promise.all([
    proImgUrls,
    proNotice,
    proSellList,
    proActivity,
    proWapIndex,
    proTags,
    proForeignGoods,
    proGroupGoods,
    proScoreGoods,
  ]).then((values) => {
    that.setData({
      imgUrls: values[0],
      notice: values[1],
      sellList: values[2],
      // discount: values[3].discount ? values[3].discount : [],
      discount: values[3].discount ? values[3].discount[0] : {},
      full: values[3].full ? values[3].full : [],
      wapIndex: values[4],
      tags: values[5],
      foreignGoods: values[6],
      groupGoods: values[7],
      scoreGoods: values[8],
      ready: true
    }, () => {
      // console.log(values[1])
      let timer = setTimeout(() => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        clearTimeout(timer);
      }, 500)
      // 设置倒计时
      if (that.data.discount.id) {
        setInterval(() => {
          APP.utils.timeDown(that, that.data.discount.end_timestamp * 1000)
        }, 1000)
      }
    })
  })
}