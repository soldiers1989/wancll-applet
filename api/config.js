// 公共配置文件

// 必须请求头信息
export const headers = {
  'auth': 'Basic_Ivj6eZRxMTx2yiyunZvnG8R69',
  'clientType': 'applet'
}
// 主机名称
// export const defaultHost = 'http://192.168.31.140'
// export const defaultHost = 'http://aimaiyoupin.com'
export const defaultHost = 'http://test_yilei.wx.wygoo.com'

// 图片地址
export const imageHost = {
  wapImages: defaultHost + '/public/static/wap/images',
  images: defaultHost + '/public/static/images',
  appletUploadImages: defaultHost + '/public/upload/applet/'
}

// 支付类型 
export const payType = {
  goodsOrderPay: 'goodsOrderPay',
  rechargeOrderPay: 'rechargeOrderPay',
  buyMember:'buyMember'
}

// 后台参数
export const params = {
  commonMember:1, // 普通会员
  bcMember: 9,  // 黑卡会员
}