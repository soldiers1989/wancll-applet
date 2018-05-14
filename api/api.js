import { defaultHost } from './config.js';

// 请求的api
export const api = {
  // 主页
  indexBanners: `${defaultHost}/api_articles/banners/lists`,
  indexConfigs: `${defaultHost}/api_query/configs/wap_index`,
  indexAnnoncements: `${defaultHost}/api_articles/annoncements/lists`,
  indexMarket: `${defaultHost}/api_query/market/activity`,
  indexAdvertisements: `${defaultHost}/api_articles/advertisements/lists`,

  // 商品页面 
  goodsTree: `${defaultHost}/api_goods/goods_cates/lists_tree`,

  // 多页面公用
  goods: `${defaultHost}/api_goods/goods/lists`,

  // 商品的详情页 
  detailRead: `${defaultHost}/api_goods/goods/read`,
  detailCollect: `${defaultHost}/api_query/goods/is_collect`,
  detailComments: `${defaultHost}/api_query/goods/comments`,
  detailTemplate: `${defaultHost}/api_query/goods_cates/template`,

  // 登录相关
  loginUser: `${defaultHost}/api_users/user_accounts/login`,

  // 个人中心
  userCount: `${defaultHost}/api_query/orders/count`,
  userAsset: `${defaultHost}/api_query/users/asset`,
  
  // 订单相关
  orderAll: `${defaultHost}/api_orders/orders/lists`,
  orderCancel: `${defaultHost}/api_orders/cancel_orders/user_cancel`,
  orderTip: `${defaultHost}/api_orders/tip_deliver/tip`,
  orderTip: `${defaultHost}/api_orders/tip_deliver/tip`,
  orderPrePay: `${defaultHost}/api_orders/pay/pre_pay`,
  orderPassword: `${defaultHost}/api_query/users/is_set_pay_password`,
  orderMoney: `${defaultHost}/api_orders/pay/money`,
  // orderAliPayApp: `${defaultHost}/api_orders/pay/ali_pay_app`,
  // orderWechatPayApp: `${defaultHost}/api_orders/pay/wechat_pay_app`,
  orderRefound: `${defaultHost}/api_orders/return_goods/save`,
  orderUserSing: `${defaultHost}/api_orders/sign_orders/user_sign`,
  orderExpress100: `${defaultHost}/api_query/transport/read_by_kd100`,
  orderComments: `${defaultHost}/api_goods/goods_comments/save`,
  orderDelete: `${defaultHost}/api_orders/orders/delete`
}