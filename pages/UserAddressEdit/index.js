const APP = getApp()
Page({
  data: {
    condition: false,
    isEdit: false,
    id: 0,
    enterName: '',
    enterMobile: '',
    enterTextarea: '',
    enterDefault: 1,
    // 三级联动
    province: {},
    city: {},
    county: {},
    showAddress: '请选择地址',
    loading: false,
  },
  onLoad(options) {
    // 编辑模式 先获取地址
    if (options.id) {
      wx.setNavigationBarTitle({
        title: '编辑地址',
      })
      this.getAddress(options.id)
    } else {
      wx.setNavigationBarTitle({
        title: '新增地址',
      })
    }
  },
  getAddress(id) {
    APP.ajax({
      url: APP.api.addressRead,
      data: {
        id: id
      },
    }).then(res => {
      let data = res.data
      this.setData({
        isEdit: true,
        id: data.id,
        enterName: data.consignee_name,
        enterMobile: data.mobile,
        enterTextarea: data.address,
        enterDefault: data.is_default,
        province: {
          name: data.province,
          code: data.province_code
        },
        city: {
          name: data.city,
          code: data.city_code
        },
        county: {
          name: data.area,
          code: data.area_code
        }
      }, () => {
        this.pinAddress()
      })
    })
  },
  pinAddress() {
    let showAddress
    if (this.data.province.name == this.data.city.name) {
      showAddress = this.data.province.name
    } else {
      showAddress = `${this.data.province.name} ${this.data.city.name} ${this.data.county.name}`
    }
    this.setData({
      showAddress: showAddress
    })
  },
  showPicker() {
    this.setData({
      condition: true
    }, () => {
      this.pinAddress()
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
  // 默认值是否选择
  radioChange(e) {
    this.setData({
      enterDefault: e.detail.value
    })
  },
  enterName(e) {
    this.setData({
      enterName: e.detail.value
    })
  },
  enterMobile(e) {
    this.setData({
      enterMobile: e.detail.value
    })
  },
  enterTextarea(e) {
    this.setData({
      enterTextarea: e.detail.value
    })
  },
  // 提交
  submit() {
    if (!this.data.enterName) {
      APP.util.toast('请输入收货人名字')
      return
    }
    if (!this.data.enterMobile) {
      APP.util.toast('请输入收货人联系电话')
      return
    }
    if (!APP.validator.mobile(this.data.enterMobile)) {
      APP.util.toast('手机格式不正确')
      return
    }
    if (!this.data.enterTextarea) {
      APP.util.toast('请输入详细地址')
      return
    }
    let url = ''
    if (!this.data.isEdit) {
      url = APP.api.addressSave
    } else {
      url = APP.api.addressUpdate
    }
    this.setData({
      loading: true
    })
    APP.ajax({
      url: url,
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
    }).then(res => {
      APP.util.toast(res.msg)
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }).catch(err => {
      this.setData({
        loading: false
      })
    })
  }
})