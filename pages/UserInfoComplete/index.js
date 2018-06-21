const APP = getApp();
Page({
  data: {
    condition: false,
    name:'',
    email:'',
    qq:'',
    wechat:'',
    // 三级联动
    province: {},
    city: {},
    county: {},
    showAddress: '请选择地址',
  },
  onLoad: function (options) {

  },
  showPicker() {
    this.setData({
      condition: true
    });
  },
  pinAddress() {
    this.setData({
      showAddress: `${this.data.province.name} ${this.data.city.name} ${this.data.county.name}`,
    })
  },
  // 默认地址选择
  getCitys(e) {
    this.setData({
      province: e.detail.province,
      city: e.detail.city,
      county: e.detail.county
    }, () => {
      this.pinAddress()
    })
  },
  enterName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  enterQQ(e) {
    this.setData({
      qq: e.detail.value
    })
  },
  enterWechat(e) {
    this.setData({
      wechat: e.detail.value
    })
  },
  enterEmial(e) {
    this.setData({
      email: e.detail.value
    })
  },
  send(){
    if (!this.data.name) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      })
      return;
    }
    if (!this.data.qq) {
      wx.showToast({
        title: '请输入qq号',
        icon: 'none'
      })
      return;
    }
    if (!this.data.wechat) {
      wx.showToast({
        title: '请输入微信号',
        icon: 'none'
      })
      return;
    }
    if (!this.data.email) {
      wx.showToast({
        title: '请输入邮箱',
        icon: 'none'
      })
      return;
    }
    APP.ajax({
      url: APP.api.userSettingUpdate,
      data:{
        qq: this.data.qq,
        wechat: this.data.wechat,
        email: this.data.email,
        province_code: this.data.province.code,
        city_code: this.data.city.code,
        area_code: this.data.county.code,
        nick_name: this.data.name,
      },
      success:res=>{
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          })
        },800)
      }
    })
  }
})