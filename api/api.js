// 请求的api
export const api = {
  // 主页
  indexBanners: `/api_articles/banners/lists`,
  indexConfigs: `/api_query/configs/wap_index`,
  indexAnnoncements: `/api_articles/annoncements/lists`,
  indexActivity: `/api_query/market/activity`,
  indexAdvertisements: `/api_articles/advertisements/lists`,
  indexWapIndex: `/api_query/configs/wap_index`,

  // 通用文章页面
  articlesReg: `/api_articles/rules/read`,
  articlesNotice: `/api_articles/annoncements/read`,

  // 商品页面 
  goodsTree: `/api_goods/goods_cates/lists_tree`,

  // 多页面公用
  goods: `/api_goods/goods/lists`,
  setPayPass: `/api_query/users/is_set_pay_password`,


  // 商品的详情页 
  detailRead: `/api_goods/goods/read`,
  detailCollect: `/api_query/goods/is_collect`,
  detailCollectCancel: `/api_goods/goods_collections/cancel`,
  detailCollectSave: `/api_goods/goods_collections/save`,
  detailComments: `/api_query/goods/comments`,
  detailTemplate: `/api_query/goods_cates/template`,
  detailCartsSave: `/api_goods/carts/save`,

  // 确认订单
  orderAffimAddress: `/api_query/users/default_address`,
  orderAffimView: `/api_orders/orders/view`,
  orderAffimUser: `/api_query/market/user`,
  orderSaveAll: `/api_orders/orders/save`,

  // 购物车
  getCartsAll: `/api_goods/carts/lists`,
  getCartsUpdate: `/api_goods/carts/update`,
  getCartsDelete: `/api_goods/carts/batch_delete`,
  getCartsColleSave: `/api_goods/goods_collections/batch_save`,
  
  

  // 登录注册相关
  userLogin: `/api_users/user_accounts/login`,
  userRegister: `/api_users/user_accounts/register`,

  // 微信授权登录
  getSessionCode: `/api_systems/oauth/applet_get_session_key`,
  getWechatUserInfo: `/api_systems/oauth/applet_get_user_info`,
  queryUserByUnionId: `/api_query/oauth/openid`,
  queryWechatBindStatus: `/api_query/oauth/binding`,
  unbind: `/api_users/binding/delete`,
  bindWechatInLogin: `/api_users/binding/save_in_login`,
  bindMobileInNoLogin: `/api_users/binding/save_in_no_login`,

  // 微信支付
  wechatPay: `/api_orders/pay/wechat_pay_applet`,

  // 个人中心
  user: `/api_users/users/read`,
  userCount: `/api_query/orders/count`,
  userAsset: `/api_query/users/asset`,
  userGrowLogs: `/api_users/score_logs/lists`,
  userInfo: `/api_query/systems/info`,
  userBonus:`/api_bonus/rules/become_bonus_info`,
  userBonusRead: `/api_bonus/user_apply_bonus/read`,
  userCompleteInfo: `/api_users/users/complete_user_info`,
  userDrp: `/api_drp/rules/become_distributor_info`,
  userDrpRead: `/api_drp/user_apply_distributor/read`,
  
  

  // 个人中心设置
  userSettingCode: `/api_systems/helper/send_code`,
  userSettingPass: `/api_users/user_accounts/reset_password`,
  userSettingPayPass: `/api_users/user_accounts/reset_pay_password`,
  userSettingUpdate: `/api_users/users/update`,
  userSettingMobile: `/api_users/user_accounts/change_mobile`,

  // 反馈
  submitHelpAndOption: `/api_articles/feedbacks/save`,

  // 订单相关
  orderAll: `/api_orders/orders/lists`,
  orderCancel: `/api_orders/cancel_orders/user_cancel`,
  orderTip: `/api_orders/tip_deliver/tip`,
  orderPrePay: `/api_orders/pay/pre_pay`,
  orderMoney: `/api_orders/pay/money`,
  // orderAliPayApp: `/api_orders/pay/ali_pay_app`,
  // orderWechatPayApp: `/api_orders/pay/wechat_pay_app`,
  orderRefound: `/api_orders/return_goods/save`,
  orderUserSing: `/api_orders/sign_orders/user_sign`,
  orderExpress100: `/api_query/transport/read_by_kd100`,
  orderComments: `/api_goods/goods_comments/save`,
  orderDelete: `/api_orders/orders/delete`,
  orderDetail: `/api_orders/orders/read`,

  // 订单是否支付
  orderIsPay: `/api_query/pay/is_pay`,

  // 收藏夹
  collections: `/api_goods/goods_collections/lists`,
  collectionsDelete: `/api_goods/goods_collections/delete`,

  // 地址 
  addressList: `/api_users/addresses/lists`,
  addressSetDefault: `/api_users/addresses/set_default`,
  addressDelete: `/api_users/addresses/delete`,
  addressRead: `/api_users/addresses/read`,
  addressRegions: `/api_systems/regions/index`,
  addressSave: `/api_users/addresses/save`,
  addressUpdate: `/api_users/addresses/update`,

  // 我的评论
  itemComments: `/api_goods/goods_comments/lists`,

  // 我的钱包
  myWallet: `/api_query/users/asset`,
  myWalletLog: `/api_users/user_asset_logs/lists`,
  recharge: `/api_users/user_recharges/save`,
  withdraw: `/api_users/user_drawcashs/save`,

  // 我的银行卡
  myBankCard: `/api_users/bank_cards/lists`,
  myBankCardRead: `/api_users/bank_cards/read`,
  myBankCardUpdate: `/api_users/bank_cards/update`,
  myBankCardSave: `/api_users/bank_cards/save`,
  myBankCardDelete: `/api_users/bank_cards/delete`,

  // 优惠券
  myDiscount: `/api_users/user_coupons/lists`,
  myDiscountReceive: `/api_users/user_coupons/receive`,
  myDiscountCoupon: `/api_query/market/coupon`,
  myDiscountCouponSave: `/api_users/user_coupons/save`,

  // 商品搜索
  goodsKeywordsList: `/api_goods/goods_keywords/lists`,
  userGoodsKeywordsRead: `/api_users/user_goods_keywords/read`,
  deleteKeywords: `/api_users/user_goods_keywords/delete`,

  // 工具api
  uploadFile: `/api_systems/helper/upload_file`,

  // 实名认证
  queryAuthStatus: `/api_query/users/auth`,
  submitAuthInfo: `/api_users/user_auths/save`,
  updateAuthInfo: `/api_users/user_auths/update`,

  // 分销分红申请
  getDrpApply: `/api_drp/user_apply_distributor/apply`,
  getBonusApply: `/api_bonus/user_apply_bonus/apply`,

  // 分销中心
  drpCenter: `/api_query/drp/distributor_info`,
  drpCenterInfo: `/api_query/drp/commission_info`,
  drpRules: `/api_drp/rules/index`,
  drpOrderList: `/api_drp/drp_orders/lists`,
  drpApplysList: `/api_drp/commission_applys/lists`,
  drpPaySave: `/api_drp/commission_applys/save`,
  drpApplysRead: `/api_drp/commission_applys/read`,
  drpChildUser: `/api_drp/team/child_users`,
  drpTeamUser: `/api_drp/team/team_users`,
  

  // 分红中心
  bonusCenter: `/api_query/bonus/bonus_info`,
  bonusApplysList: `/api_bonus/bonus_applys/lists`,
  bonusApplysRead: `/api_bonus/bonus_applys/read`,
  bonusPaySave: `/api_bonus/bonus_applys/save`,
  bonusOrderList: `/api_bonus/bonus_orders/lists`,
  bonusTeamUser: `/api_bonus/team/team_users`,
  bonusChildUser: `/api_bonus/team/child_users`,
  bonusRules: `/api_bonus/rules/index`,
  
  // 收款账户
  userRhirdAcc: `/api_users/user_third_accounts/lists`,
  userRhirdUpdate: `/api_users/user_third_accounts/update`,

}