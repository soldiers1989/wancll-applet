const APP = getApp();
export function getList(that) {
  let pageNum = that.data.pageNum;
  let collectionList = that.data.collectionList
  APP.ajax({
    url: APP.api.collections,
    header: {
      'page-limit': that.data.pageLimit,
      'page-num': pageNum,
    },
    success(res) {
      if (res.data.length) {
        that.setData({
          collectionList: collectionList.concat(res.data),
          pageNum: ++pageNum,
          noContent: false,
        })
      } else if (pageNum == 1) {
        that.setData({
          noContent: true,
        })
      }
    }
  })
}

export function deleteCollection(that, id) {
  wx.showModal({
    title: '提示',
    content: '确定要从收藏中移除商品吗？',
    success(res) {
      if (res.confirm) {
        APP.ajax({
          url: APP.api.collectionsDelete,
          data: { id: id },
          success(res) {
            wx.showToast({
              title: res.msg,
              icon: 'none',
            });
            let newCollectionList = that.data.collectionList.filter(i => i.id != id);
            that.setData({
              collectionList: newCollectionList,
              noContent: newCollectionList.length ? false : true
            })
          }
        })
      }
    }
  })
}