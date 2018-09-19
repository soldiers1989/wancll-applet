const APP = getApp()
import {
  chooseImage,
} from '../../utils/common.js'
Page({
  data: {
    name: '',
    idcard: '',
    idcardFront: APP.imgs.idcardFrontExample,
    idcardBack: APP.imgs.idcardBackExample,
    uploadCardFront: APP.imgs.uploadCardFront,
    uploadCardBack: APP.imgs.uploadCardBack,
    status: '',
    id: '',
    loading: false,
  },
  onLoad(options) {
    if (options.id) {
      this.setData({
        id: options.id,
        status: options.status
      })
    }
  },
  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  idcardInput(e) {
    this.setData({
      idcard: e.detail.value
    })
  },
  // 上传文件
  uploadFile(e) {
    let type = APP.util.getDataSet(e, 'type')
    chooseImage({
      count: 1,
    }).then(values => {
      this.setData({
        [type]: values[0],
      })
    }).catch(err => {})
  },
  // 提交
  submit() {
    if (!this.data.name) {
      APP.util.toast('请填写真实姓名')
      return
    }
    if (!this.data.idcard) {
      APP.util.toast('请填写身份证号码')
      return
    }
    if (this.data.idcardFront == APP.imgs.idcardFrontExample) {
      APP.util.toast('请上传身份证正面照')
      return
    }
    if (this.data.idcardBack == APP.imgs.idcardBackExample) {
      APP.util.toast('请上传身份证反面照')
      return
    }
    let data = {
      id_card_front_img: this.data.idcardFront,
      id_card_back_img: this.data.idcardBack,
      status: 1,
      name: this.data.name,
      id_card: this.data.idcard,
      imgs: [],
    }
    let url = ''
    if (this.data.id) {
      url = APP.api.updateAuthInfo
      data.id = this.data.id
    } else {
      url = APP.api.submitAuthInfo
    }
    this.setData({
      loading: true
    })
    APP.ajax({
      url: url,
      data: data,
    }).then(res => {
      APP.util.toast(res.msg)
      setTimeout(() => {
        wx.navigateBack()
      }, 500)
    }).catch(err => {
      this.setData({
        loading: false,
      })
    })
  },
  onShareAppMessage() {

  }
})