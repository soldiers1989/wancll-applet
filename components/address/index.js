const APP = getApp();
Component({
  // 传递过来的参数
  properties: {

  },
  // 默认参数
  data: {
    addressList: [],
    pageNum: 1,
    pageLimit: 20,
    loading: true,
    defaultAddress: -1,
  },
  // 组件生成到页面获取的参数
  attached() {
    // 渲染即 获取全国城市列表    
    if (!wx.getStorageSync('citys')) {
      APP.ajax({
        url: APP.api.addressRegions,
        success(res) {
          wx.setStorageSync('citys', res.data)
        }
      })
    }
  },
  // 组件的方法列表 
  methods: {
    // 刷新数据
    refresh() {
      this.getAddressList('refresh')
    },
    // 下拉加载数据
    concat(){
      this.getAddressList('concat')
    },
    // 获取收货地址列表
    getAddressList(type) {
      let pageNum = this.data.pageNum; 
      let addressList = this.data.addressList
      // 刷新地址的
      if(type =='refresh'){
        pageNum = 1;
        addressList=[];
      }
      APP.ajax({
        url: APP.api.addressList,
        header: {
          'page-limit': this.data.pageLimit,
          'page-num': pageNum,
        },
        data: {},
        success: res => {
          this.setData({
            addressList: addressList.concat(res.data),
            pageNum: ++pageNum
          }, () => {
            wx.setStorageSync('address', addressList.concat(res.data))
            this.getDefaultAddress()
          })
        }
      })
    },
    // 将点击每个地址列表得到的值传递出去 用 getclickid 接收
    selectAddress(e) {
      let id = APP.utils.getDataSet(e, 'id');
      this.triggerEvent('getclickid', {
        id: id
      });
    },
    // 获取默认地址
    getDefaultAddress() {
      let addressList = this.data.addressList;
      let isDefault = addressList.filter((item, index) => {
        return item.is_default == 1;
      })
      this.setData({
        defaultAddress: isDefault[0].id
      })
    },
    // 点击设置默认地址
    setDefaultAddress(e) {
      let id = APP.utils.getDataSet(e, 'id');
      APP.ajax({
        url: APP.api.addressSetDefault,
        data: {
          is_default: 1,
          id: id
        },
        success: res => {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          this.setData({
            defaultAddress: id
          })
        }
      })
    },
    // 判断点击的是新增还是编辑 然后跳转到编辑页面
    editAddress(e) {
      let id = APP.utils.getDataSet(e, 'id');
      let param = id == 'new' ? '' : `?id=${id}`;
      wx.navigateTo({
        url: `/pages/userSubPage/addressEidt/addressEidt${param}`
      })
    },
    // 删除地址操作
    deleteAddress(e) {
      let id = APP.utils.getDataSet(e, 'id');
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
              success: res => {
                wx.showToast({
                  title: res.msg,
                  icon: 'none',
                })
                setTimeout(() => {
                  this.refresh()
                }, 1000)
              }
            })
          }
        }
      })
    },
  }
})