// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }

// module.exports = {
//   formatTime: formatTime
// }

// 获取点击参数
function getDataSet(e, field) {
  if (e.currentTarget.dataset[field]) {
    return e.currentTarget.dataset[field]
  } else {
    return e.target.dataset[field]
  }
}
// 组装传递的参数
function paramsJoin(paramsObj) {
  let arr = [];
  for (let name in paramsObj) {
    arr.push(`${name}=${paramsObj[name]}`);
  }
  return arr.join('&');
}
// 获取本地存储订单Id
function getOrderById(id,fn) {
  wx.getStorage({
    key: 'orderList',
    success(res) {
      let obj = res.data.filter((item) => {
        return item.id == id;
      })
      fn(obj[0])
    },
  })
}
// 获取本地存储订单Id下的某个商品
function getGoodsById(goodsArr, goodsId) {
  let obj = goodsArr.filter((item) => {
    return item.goods_id == goodsId;
  })
  return obj[0]
}

module.exports = {
  getDataSet,
  paramsJoin,
  getOrderById,
  getGoodsById  
}