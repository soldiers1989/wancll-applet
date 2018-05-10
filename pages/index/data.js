const APP = getApp();
export function getOtherData(that){
  // 获取首页轮播图
  APP.ajax({
    url: APP.api.banners,
    data: { type: "wap首页轮播" },
    success: (res) => {
      console.log('wap首页轮播',res.data)
      that.setData({
        imgUrls: res.data
      })
    }
  })
  APP.ajax({
    url: APP.api.configs,
    success: (res) => {
      console.log(res)
    }
  })
  // 获取首页公告
  APP.ajax({
    url: APP.api.annoncements,
    data: { type: "wap首页公告" },
    success: (res) => {
      console.log('wap首页公告',res.data)
      that.setData({
        notice: res.data
      })
    }
  })
  APP.ajax({
    url: APP.api.market,
    success: (res) => {
      console.log(res)
    }
  })
  APP.ajax({
    url: APP.api.advertisements,
    data: { type: "wap首页广告" },
    success: (res) => {
      console.log(res)
    }
  })
}
// 获取商品参数 并控制 loading显示
export function getGoodsData(that,id='') {
  let prevId = id;
  
  const pageLimit = 10;
  let data = that.data.goods;
  APP.ajax({
    url: APP.api.goods,
    data: { goods_cate_id: id },
    header: {
      'page-limit': pageLimit,
      'page-num': that.data.pageNum
    },
    success: (res) => {
      if (res.data.length) {
        console.log('商品列表', res)
        that.setData({
          goods: data.concat(res.data)
        }, () => { that.data.pageNum++; })
      }else{
        that.setData({
          loading: false
        })
      }
    }
  })
}