const APP = getApp()
import {
  chooseImage,
} from '../../utils/common.js'
Page({
  data: {
    thum: '',
    orderId: '',
    goodsId: '',
    imgs: [],
    score: 0,
    message: '',
    loading: false,
  },
  onLoad: function(options) {
    this.setData({
      thum: options.thum,
      orderId: options.orderId,
      goodsId: options.goodsId,
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
  // 输入绑定
  textareaInput(e) {
    this.setData({
      message: e.detail.value
    })
  },
  // 点星星
  canesll() {
    this.setData({
      score: 0
    })
  },
  star(e) {
    let n = APP.util.getDataSet(e, 'n')
    this.setData({
      score: n
    })
  },
  // 发送评价
  submit() {
    if (!this.data.message) {
      APP.util.toast('输入评价内容')
      return
    }
    if (!this.data.score) {
      APP.util.toast('评个分吧！')
      return
    }
    this.setData({
      loading: true,
    })
    APP.ajax({
      url: APP.api.orderComments,
      data: {
        content: this.data.message,
        goods_id: this.data.goodsId,
        imgs: this.data.imgs,
        order_id: this.data.orderId,
        score: this.data.score,
        status: 1
      },
    }).then(res => {
      APP.util.toast(res.msg)
      setTimeout(() => {
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
  onShareAppMessage: function() {

  }
})