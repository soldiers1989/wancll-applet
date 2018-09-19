const APP = getApp()
Component({
  // 传递过来的参数
  properties: {},
  // 默认参数
  data: {
    list: [],
    page: 1,
    haveNoData: false,
    noContentImg: APP.imgs.noContentImg,
  },
  // 组件的方法列表 
  methods: {
    // 刷新数据
    refresh() {
      this.setData({
        page: 1,
        list: [],
      })
      this.getList()
    },
    getList() {
      APP.ajax({
        url: APP.api.addressList,
        header: {
          'page-num': this.data.page,
          'page-limit': 10,
        },
      }).then(res => {
        let list = APP.util.arrayToUnique(this.data.list.concat(res.data))
        this.setData({
          list: list,
          haveNoData: !Boolean(list.length),
          page: this.data.page + 1
        })
      }).catch(err => {})
    },
    // 将点击每个地址列表得到的值传递出去 用 getclickid 接收
    selectAddress(e) {
      let id = APP.util.getDataSet(e, 'id')
      this.triggerEvent('getclickid', {
        id: id
      })
    },
    // 点击设置默认地址
    setDefaultAddress(e) {
      let id = APP.util.getDataSet(e, 'id')
      let index = APP.util.getDataSet(e, 'index')
      APP.ajax({
        url: APP.api.addressSetDefault,
        data: {
          is_default: 1,
          id: id
        },
      }).then(res => {
        APP.util.toast(res.msg)
        this.setData({
          list: this.data.list.map(i => {
            i.is_default = i.id == id ? true : false
            return i
          })
        })
      }).catch(err => {})
    },
    // 判断点击的是新增还是编辑 然后跳转到编辑页面
    editAddress(e) {
      let id = APP.util.getDataSet(e, 'id')
      let param = id == 'new' ? '' : `?id=${id}`
      wx.navigateTo({
        url: `/pages/UserAddressEdit/index${param}`
      })
    },
    // 删除地址操作
    deleteAddress(e) {
      let id = APP.util.getDataSet(e, 'id')
      let index = APP.util.getDataSet(e, 'index')
      wx.showModal({
        title: '提示',
        content: '确定要删除该地址吗？',
        success: res => {
          if (res.confirm) {
            APP.ajax({
              url: APP.api.addressDelete,
              data: {
                id: id
              },
            }).then(res => {
              APP.util.toast(res.msg)
              this.data.list.splice(index, 1)
              this.setData({
                list: this.data.list,
                haveNoData: !Boolean(this.data.list)
              })
            }).catch(err => {})
          }
        }
      })
    }
  }
})