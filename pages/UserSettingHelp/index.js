const APP = getApp();
Page({
  data: {
    content: '',
    title: '功能异常'
  },
  onLoad(options) {},
  inputChange(e) {
    this.setData({
      content: e.detail.value
    })
  },
  submit() {
    if (!this.data.content) {
      APP.util.toast('请填写反馈意见')
      return;
    }
    let userId = wx.getStorageSync('user').id;
    APP.ajax({
      url: APP.api.submitHelpAndOption,
      data: {
        user_id: userId,
        title: this.data.title,
        content: this.data.content
      },
    }).then(res => {
      APP.util.toast(res.msg)
      setTimeout(() => {
        wx.navigateBack();
      }, 800)
    })
  },
  radioChange(e) {
    this.setData({
      title: e.detail.value
    })
  },
  onShareAppMessage() {

  }
})