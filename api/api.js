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
  userGrowLogs: `${defaultHost}/api_users/score_logs/lists`,
  
  // 个人中心设置
  userSettingCode: `${defaultHost}/api_systems/helper/send_code`,
  userSettingPass: `${defaultHost}/api_users/user_accounts/reset_password`,
  userSettingPayPass: `${defaultHost}/api_users/user_accounts/reset_pay_password`,
  
  // 订单相关
  orderAll: `${defaultHost}/api_orders/orders/lists`,
  orderCancel: `${defaultHost}/api_orders/cancel_orders/user_cancel`,
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
  orderDelete: `${defaultHost}/api_orders/orders/delete`,
  orderDetail: `${defaultHost}/api_orders/orders/read`,

  // 收藏夹
  collections: `${defaultHost}/api_goods/goods_collections/lists`,
  collectionsDelete: `${defaultHost}/api_goods/goods_collections/delete`,
  
  // 地址 
  addressList: `${defaultHost}/api_users/addresses/lists`,
  addressSetDefault: `${defaultHost}/api_users/addresses/set_default`,
  addressDelete: `${defaultHost}/api_users/addresses/delete`,
  addressRead: `${defaultHost}/api_users/addresses/read`,
  addressRegions: `${defaultHost}/api_systems/regions/index`,
  addressSave: `${defaultHost}/api_users/addresses/save`,
  addressUpdate: `${defaultHost}/api_users/addresses/update`,

  // 我的评论
  itemComments: `${defaultHost}/api_goods/goods_comments/lists`,

  // 我的钱包
  myWallet: `${defaultHost}/api_query/users/asset`,
  myWalletLog: `${defaultHost}/api_users/user_asset_logs/lists`,

  // 我的银行卡
  myBankCard: `${defaultHost}/api_users/bank_cards/lists`,
  myBankCardRead: `${defaultHost}/api_users/bank_cards/read`,
  myBankCardUpdate: `${defaultHost}/api_users/bank_cards/update`,
  myBankCardSave: `${defaultHost}/api_users/bank_cards/save`,
  myBankCardDelete: `${defaultHost}/api_users/bank_cards/delete`,
  
  // 优惠券
  myDiscount: `${defaultHost}/api_users/user_coupons/lists`,  
  myDiscountReceive: `${defaultHost}/api_users/user_coupons/receive`,  
  myDiscountCoupon: `${defaultHost}/api_query/market/coupon`,  
  myDiscountCouponSave: `${defaultHost}/api_users/user_coupons/save`,  
  
}