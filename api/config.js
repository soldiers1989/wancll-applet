// 公共配置文件
const host = 'http://wancllshop.lugu110.wancll.vip'
// 必须请求头信息
const headers = {
  'auth': 'Basic_Ivj6eZRxMTx2yiyunZvnG8R69',
  'client-type': 'applet'
}
// 主机名称
const defaultHost = host + '/index.php'
// 图片地址
const imageHost = {
  wapImages: host + '/public/static/wap/images',
  images: host + '/public/static/images',
  appletUploadImages: host + '/public/upload/applet/'
}
// 支付类型 
const payType = {
  goodsOrderPay: 'goodsOrderPay',
  rechargeOrderPay: 'rechargeOrderPay'
}

export {
  headers,
  defaultHost,
  imageHost,
  payType
}