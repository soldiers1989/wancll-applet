const APP = getApp();
export function getOtherData(that){
  // 获取首页轮播图
  APP.ajax({
    url: APP.api.indexBanners,
    data: { type: "wap首页轮播" },
    success: (res) => {
      that.setData({
        imgUrls: res.data
      })
    }
  })
  APP.ajax({
    url: APP.api.indexConfigs,
    success: (res) => {
      // console.log(res)
    }
  })
  // 获取首页公告
  APP.ajax({
    url: APP.api.indexAnnoncements,
    data: { type: "wap首页公告" },
    success: (res) => {
      that.setData({
        notice: res.data
      })
    }
  })
  APP.ajax({
    url: APP.api.indexMarket,
    success: (res) => {
      // console.log(res)
    }
  })
  APP.ajax({
    url: APP.api.indexAdvertisements,
    data: { type: "wap首页广告" },
    success: (res) => {
      // console.log(res)
    }
  })
}
// 获取商品参数 并控制 loading显示
export function getGoodsData(that,id='') {  
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