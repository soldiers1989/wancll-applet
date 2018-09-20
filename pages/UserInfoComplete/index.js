const APP = getApp();
Page({
  data: {
    condition: false,
    name: '',
    email: '',
    qq: '',
    wechat: '',
    // 三级联动
    province: {},
    city: {},
    county: {},
    showAddress: '请选择地址',
  },
  onLoad: function(options) {
    APP.ajax({
      url: APP.api.userRead,
    }).then(res => {
      let showAddress;
      if (res.data.province && res.data.city && res.data.area) {
        if (res.data.province.name == res.data.city.name) {
          showAddress = res.data.province.name;
        } else {
          showAddress = `${res.data.province} ${res.data.city} ${res.data.area}`
        }
      } else {
        showAddress = '请选择地址'
      }
      this.setData({
        name: res.data.nick_name,
        email: res.data.email,
        qq: res.data.qq,
        wechat: res.data.wechat,
        showAddress: showAddress,
      })
    }).catch(err => {
      console.warn(err)
    })
  },
  showPicker() {
    this.setData({
      condition: true
    }, () => {
      this.pinAddress()
    });
  },
  pinAddress() {
    let showAddress;
    if (this.data.province.name == this.data.city.name) {
      showAddress = this.data.province.name;
    } else {
      showAddress = `${this.data.province.name} ${this.data.city.name} ${this.data.county.name}`
    }
    this.setData({
      showAddress: showAddress
    })
  },
  // 默认地址选择
  getCitys(e) {
    this.setData({
      province: e.detail.province,
      city: e.detail.city,
      county: e.detail.county
    }, () => {
      if (this.data.condition) {
        this.pinAddress()
      }
    })
  },
  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  qqInput(e) {
    this.setData({
      qq: e.detail.value
    })
  },
  wechatInput(e) {
    this.setData({
      wechat: e.detail.value
    })
  },
  emailInput(e) {
    this.setData({
      email: e.detail.value
    })
  },
  submit() {
    if (!this.data.name) {
      APP.util.toast('请输入昵称')
      return;
    }
    if (!this.data.qq) {
      APP.util.toast('请输入qq号')
      return;
    }
    if (!this.data.wechat) {
      APP.util.toast('请输入微信号')
      return;
    }
    if (!this.data.email) {
      APP.util.toast('请输入邮箱')
      return;
    }
    APP.ajax({
      url: APP.api.userUpdate,
      data: {
        qq: this.data.qq,
        wechat: this.data.wechat,
        email: this.data.email,
        province_code: this.data.province.code,
        city_code: this.data.city.code,
        area_code: this.data.county.code,
        nick_name: this.data.name,
      },
    }).then(res => {
      APP.util.toast(res.msg)
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 800)
    }).catch(err => {})
  }
})