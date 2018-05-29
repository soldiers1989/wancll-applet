const APP = getApp();

export function getList(that) {
  let pageNum = that.data.pageNum;
  let addressList = that.data.addressList
  APP.ajax({
    url: APP.api.addressList,
    header: {
      'page-limit': that.data.pageLimit,
      'page-num': pageNum,
    },
    success: res=> {
      if (res.data.length) {
        wx.setStorageSync('address',res.data)
        that.setData({
          addressList: addressList.concat(res.data),
          pageNum: ++pageNum,
          noContent: false,
        })
      } else if (that.data.pageNum == 1) {
        that.setData({
          noContent: true,
        })
      }
    }
  })
}

export function setDefaultAddress(that, id) {
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
      });
      that.setData({
        addressList: that.data.addressList.map(i => {
          i.is_default = i.id == id ? true : false;
          return i;
        })
      })
    }
  })
}

export function deleteAddress(that, id) {
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
            });
            let newAddressList = that.data.addressList.filter(i => i.id != id)
            that.setData({
              addressList: newAddressList,
              noContent: newAddressList.length > 0 ? false : true,
            })
          }
        })
      }
    }
  })
}