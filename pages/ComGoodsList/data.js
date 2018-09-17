const APP = getApp()

function getGoodsList(that) {
  APP.ajax({
    url: APP.api.goodsList,
    data: that.data.data,
    header: {
      'page-num': that.data.page,
      'page-limit': 10
    }
  }).then((resp) => {
    let goodsList = APP.util.arrayToUnique(that.data.goodsList.concat(resp.data))
    that.setData({
      goodsList: goodsList,
      page: that.data.page + 1,
      hasNoData: !Boolean(goodsList.length),
    })
  }).catch(e => { })
}

export {
  getGoodsList,
}