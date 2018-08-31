const APP = getApp();

// 获取轮播图
export function getGroupBanner(that) {
  APP.ajax({
    url: APP.api.indexBanners,
    data:{
      type_id:28,
    },
    success(res) {
      that.setData({
        banner:res.data 
      })
    }
  })
}


// 获取团购订单
export function getGroupOrdersCount(that) {
  APP.ajax({
    url: APP.api.groupOrderCount,
    success(res) {
      that.setData({
        orderCount: res.data
      })
    }
  })
}

// 获取团购相关参数
export function getGroupParams(that) {
  APP.ajax({
    url: APP.api.groupParams,
    data: {},
    success: res => {
      that.setData({
        groupParams: res.data
      });
    },
  })
}