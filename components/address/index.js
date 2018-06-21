const APP = getApp();
import { getList, setDefaultAddress, deleteAddress } from './indexData.js';
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
    noContent: false,
    noContentImg: APP.imgs.noContentImg
  },
  // // 组件生成到页面获取的参数
  // attached() {
  //   // 渲染即 获取全国城市列表    
  //   if (!wx.getStorageSync('citys')) {
  //     APP.ajax({
  //       url: APP.api.addressRegions,
  //       success(res) {
  //         wx.setStorageSync('citys', res.data)
  //       }
  //     })
  //   }
  // },
  // 组件的方法列表 
  methods: {
    // 刷新数据
    refresh() {
      this.setData({
        addressList: [],
        pageNum: 1
      });
      getList(this);
    },
    // 下拉加载数据
    concat() {
      getList(this);
    },
    // 将点击每个地址列表得到的值传递出去 用 getclickid 接收
    selectAddress(e) {
      let id = APP.utils.getDataSet(e, 'id');
      this.triggerEvent('getclickid', {
        id: id
      });
    },
    // 点击设置默认地址
    setDefaultAddress(e) {
      let id = APP.utils.getDataSet(e, 'id');
      setDefaultAddress(this, id);
    },
    // 判断点击的是新增还是编辑 然后跳转到编辑页面
    editAddress(e) {
      let id = APP.utils.getDataSet(e, 'id');
      let param = id == 'new' ? '' : `?id=${id}`;
      wx.navigateTo({
        url: `/pages/UserAddressEidt/index${param}`
      })
    },
    // 删除地址操作
    deleteAddress(e) {
      let id = APP.utils.getDataSet(e, 'id');
      deleteAddress(this, id);
    },
  }
})