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
  buyMember: 'buyMember'
}

// 后台参数
export const params = {
  commonMember: 1, // 普通会员
  bcMember: 9, // 黑卡会员
  // 跳转类型
  redirect_type: {
    not_used: 0,
    outer_link: 1,
    inner_link: 2,
    tag: 3,
    category: 4,
    goods_discount: 5,
    goods_group: 6,
    goods_score: 7,
    foreign: 8,
    article: 9
  }
}