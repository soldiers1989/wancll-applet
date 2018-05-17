const APP = getApp();
const sexList = ['保密', '男', '女'];
const password = ['登录密码修改', '支付密码修改'];
Page({
  data: {
    sex: '',
    mobile: '',
    name: '',
    avatar: '',
  },
  onLoad: function (options) {
    let user = wx.getStorageSync('user');
    this.setData({
      mobile: user.mobile,
      sex: sexList[user.gender],
      name: user.nick_name,
      avatar: user.avatar
    })
  },
  // 添加图片
  changeAvatar() {
    let that = this;
    // const ctx = wx.createCanvasContext('myCanvas')
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        // ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
        // ctx.draw()
        // console.log(ctx)
        that.setData({ avatar: res.tempFilePaths[0] })
      }
    })
    
    // wx.canvasGetImageData({
    //   canvasId: 'myCanvas',
    //   x: 0,
    //   y: 0,
    //   width: 100,
    //   height: 100,
    //   success: res => {
    //     console.log(res.width) // 100
    //     console.log(res.height) // 100
    //     console.log(res.data instanceof Uint8ClampedArray) // true
    //     console.log(res.data.length) // 100 * 100 * 4
    //     console.log(res.data)
    //     var base64 = wx.arrayBufferToBase64(res.data.buffer);
    //     console.log(base64)
    //     // this.setData({
    //     //   b64: base64
    //     // });
    //   }
    // })
  },
  //密码修改
  changePassword(){
    wx.showActionSheet({
      itemList: password,
      success:res=>{
        wx.navigateTo({
          url: `/pages/userSubPage/settingPassword/settingPassword?id=${res.tapIndex}`,
        })
      }
    })
  },
  // 性别选择
  selectSex() {
    let that = this;
    wx.showActionSheet({
      itemList: sexList,
      success(res) {
        that.setData({ sex: sexList[res.tapIndex] }, () => {
      
        })
      }
    })
  },
  // 修改昵称
  changeName(e) {
    this.setData({ name: e.detail.value })
  },
  // 修改昵称
  changeMobile(e) {
    this.setData({ mobile: e.detail.value })
  },

  logout(){
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success:(res)=>{
        if (res.confirm) {
          wx.clearStorageSync()
          wx.reLaunch({
            url:`/pages/login/login`
          })
        }
      }
    })
  }
})