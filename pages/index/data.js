

// 获取首页banner
export function getBanners(){
  ajax({
    url: api.banners,
    data: {
      'type': "wap首页轮播"
    },
    success: (res) => {
      return res.data.data
    }
  })
}