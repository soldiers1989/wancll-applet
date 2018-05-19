const APP = getApp();

export function getDetailData(that,id=''){
  let p = new Promise((resolve,reject)=>{
    APP.ajax({
      url: APP.api.detailRead,
      data: { id: id },
      success: (res) => {
        wx.setStorageSync('buyItem', res.data)
        console.log(res.data)
        that.setData({
          detailInfo: res.data,
          goodsGroupInfo:res.data.goods_spec_group_info,
          goodsSpecInfo:res.data.goods_spec_info,
        },()=>{
          resolve(res.data);
        })
      }
    })
  })
  p.then((res)=>{
    APP.ajax({
      url: APP.api.detailTemplate,
      data: { goods_cate_id: res.goods_cate_id },
      success: (resq) => {
        that.setData({
          templateData: resq.data
        })
      }
    })
  })
  
  APP.ajax({
    url: APP.api.detailComments,
    data: { goods_id: id },
    success: (res) => {
      // console.log('评论',res.data)
      that.setData({
        comments: res.data
      })
    }
  })
  
}