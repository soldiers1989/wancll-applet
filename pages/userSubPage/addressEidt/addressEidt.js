const APP = getApp();
Page({
  data: {
    condition: false,
    isEdit: false,
    id:0,
    enterName: '',
    enterMobile: '',
    enterTextarea: '',
    enterDefault: 0,
    // 三级联动
    province: {},
    city: {},
    county: {}
  },

  onLoad(options) {
    let that = this;
    // 编辑模式
    if (options.id) {
      APP.ajax({
        url: APP.api.addressRead,
        data: { id: options.id },
        success(res) {
          console.log(res.data)
          that.setData({
            isEdit: true,
            id: res.data.id,
            enterName: res.data.consignee_name,
            enterMobile: res.data.mobile,
            enterTextarea: res.data.address,
            enterDefault: res.data.is_default,
            province: { name: res.data.province, code: res.data.province_code },
            city: { name: res.data.city, code: res.data.city_code },
            county: { name: res.data.area, code: res.data.area_code }
          })
        }
      })
    }
  },
  showPicker() {
    this.setData({
      condition: true
    });
  },
  radioChange(e) {
    this.setData({
      enterDefault: e.detail.value
    })
  },
  // 默认地址选择
  getCitys(e) {
    this.setData({
      province: e.detail.province,
      city: e.detail.city,
      county: e.detail.county
    })
  },
  enterName(e) {
    this.setData({ enterName: e.detail.value })
  },
  enterMobile(e) {
    this.setData({ enterMobile: e.detail.value })
  },
  enterTextarea(e) {
    this.setData({ enterTextarea: e.detail.value })
  },
  send() {
    if (!this.data.enterName) {
      wx.showToast({
        title: '请输入收货人名字', icon: 'none'
      })
      return;
    }
    if (!this.data.enterMobile) {
      wx.showToast({
        title: '请输入收货人联系电话', icon: 'none'
      })
      return;
    }
    if (!this.data.enterTextarea) {
      wx.showToast({
        title: '请输入详细地址', icon: 'none'
      })
      return;
    }
    let api = '';
    if (!this.data.isEdit) {
      api = APP.api.addressSave
    } else {
      api = APP.api.addressUpdate
    }
    APP.ajax({
      url: api,
      data: {
        id: this.data.id,
        address: this.data.enterTextarea,
        area_code: this.data.county.code,
        city_code: this.data.city.code,
        consignee_name: this.data.enterName,
        is_default: this.data.enterDefault,
        mobile: this.data.enterMobile,
        province_code: this.data.province.code,
      },
      success(res) {
        console.log(res.data)
        wx.showToast({
          title: res.msg,icon:'none'
        })
        setTimeout(()=>{
          wx.navigateTo({
            url: '/pages/userSubPage/address/address',
          })
        },1000)
      }
    })
  }
})