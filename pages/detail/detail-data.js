const APP = getApp();

export function getDetailData(that,id=''){
  let p = new Promise((resolve,reject)=>{
    APP.ajax({
      url: APP.api.detailRead,
      data: { id: id },
      success: (res) => {
        resolve(res.data);
        console.log(res.data)
        that.setData({
          detailInfo: res.data,
          // imgUrls: res.data.imgs
        })
      }
    })
  })
  p.then((res)=>{
    APP.ajax({
      url: APP.api.detailTemplate,
      data: { goods_cate_id: res.goods_cate_id },
      success: (resq) => {
        console.log(resq.data)
        // that.setData({
        //   imgUrls: res.data
        // })
      }
    })
  })
  
  // 需要token !!! 待定
  APP.ajax({
    url: APP.api.detailCollect,
    data: { goods_id: id },
    success: (res) => {
      console.log(res.data)
      // that.setData({
      //   imgUrls: res.data
      // })
    }
  })
  APP.ajax({
    url: APP.api.detailComments,
    data: { goods_id: id },
    success: (res) => {
      console.log(res.data)
      that.setData({
        comments: res.data
      })
    }
  })
  
}