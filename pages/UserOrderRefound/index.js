const APP = getApp();
import {
  chooseImage,
} from '../../utils/common.js'
Page({
  data: {
    goods: {},
    imgs: [],
    desc: '',
    loading: false,
  },
  onLoad(options) {
    this.setData({
      goods: wx.getStorageSync('refundGoods')
    })
  },
  // 输入绑定
  textareaInput(e) {
    this.setData({
      desc: e.detail.value
    })
  },
  // 添加图片
  addImage() {
    chooseImage({
      count: 4
    }).then(values => {
      this.setData({
        imgs: values
      })
    }).catch(err => {})
  },
  // 图片预览
  previewImage(e) {
    let id = APP.util.getDataSet(e, 'id')
    wx.previewImage({
      current: this.data.imgs[id],
      urls: this.data.imgs,
    })
  },
  // 删除预览图片
  deleltImage(e) {
    let id = APP.util.getDataSet(e, 'id')
    let arr = this.data.imgs
    arr.splice(id, 1);
    this.setData({
      imgs: arr
    })
  },
  // 退款 
  submit() {
    if (!this.data.desc) {
      APP.util.toast('输入退款原因')
      return
    }
    this.setData({
      loading: true,
    })
    APP.ajax({
      url: APP.api.orderRefound,
      data: {
        order_id: this.data.goods.order_id,
        order_goods_id: this.data.goods.id,
        imgs: this.data.imgs,
        return_reason: this.data.desc,
        return_type: 1
      },
    }).then(res => {
      APP.util.toast(res.msg)
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1,
        })
      }, 800)
    }).catch(err => {
      this.setData({
        loading: false,
      })
    })
  },
  onShareAppMessage() {

  }
})