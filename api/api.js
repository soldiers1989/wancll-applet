// 请求的api
export const api = {
  // 主页
  indexConfigs: `/api_query/configs/wap_index`,
  indexAnnouncement: `/api_articles/annoncements/lists`,
  indexAdvertisements: `/api_articles/advertisements/lists`,
  indexWapIndex: `/api_query/configs/wap_index`,
  // 营销活动
  activities: `/api_query/market/activity`,
  // 内容相关
  ruleRead: `/api_articles/rules/read`,
  announcementRead: `/api_articles/annoncements/read`,
  bannerList: `/api_articles/banners/lists`,
  // 商品
  goodsList: `/api_goods/goods/lists`,
  goodsCatesListTree: '/api_goods/goods_cates/lists_tree',
  goodsRead: `/api_goods/goods/read`,
  goodsIsCollected: `/api_query/goods/is_collect`,
  goodsCollectCancel: `/api_goods/goods_collections/cancel`,
  goodsCollectSave: `/api_goods/goods_collections/save`,
  goodsComments: `/api_query/goods/comments`,
  // 确认订单
  orderAffimAddress: `/api_query/users/default_address`,
  orderAffimView: `/api_orders/orders/view`,
  orderAffimUser: `/api_query/market/user`,
  orderSaveAll: `/api_orders/orders/save`,
  // 购物车
  cartSave: `/api_goods/carts/save`,
  cartList: `/api_goods/carts/lists`,
  cartsUpdate: `/api_goods/carts/update`,
  cartsDelete: `/api_goods/carts/batch_delete`,
  cartsColleSave: `/api_goods/goods_collections/batch_save`,
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
  //系统相关
  systemInfo: `/api_query/systems/info`,
  getCode: '/api_systems/helper/send_code',
  // 个人中心
  userRead: `/api_users/users/read`,
  userUpdate: `/api_users/users/update`,
  userCompleteInfo: `/api_users/users/complete_user_info`,
  // 用户设置
  userSettingPass: `/api_users/user_accounts/reset_password`,
  userSettingPayPass: `/api_users/user_accounts/reset_pay_password`,
  userMobileModify: `/api_users/user_accounts/change_mobile`,
  userIsSetPayPassword: `/api_query/users/is_set_pay_password`,
  // 反馈
  submitHelpAndOption: `/api_articles/feedbacks/save`,
  // 订单相关
  orderAll: `/api_orders/orders/lists`,
  orderCancel: `/api_orders/cancel_orders/user_cancel`,
  orderTip: `/api_orders/tip_deliver/tip`,
  orderPrePay: `/api_orders/pay/pre_pay`,
  orderMoney: `/api_orders/pay/money`,
  orderCount: `/api_query/orders/count`,
  // orderAliPayApp: `/api_orders/pay/ali_pay_app`,
  // orderWechatPayApp: `/api_orders/pay/wechat_pay_app`,
  orderRefound: `/api_orders/return_goods/save`,
  orderUserSing: `/api_orders/sign_orders/user_sign`,
  orderExpress100: `/api_query/transport/read_by_kd100`,
  orderComments: `/api_goods/goods_comments/save`,
  orderDelete: `/api_orders/orders/delete`,
  orderDetail: `/api_orders/orders/read`,
  orderIsPay: `/api_query/pay/is_pay`,
  // 收藏夹
  collectionList: `/api_goods/goods_collections/lists`,
  collectionDelete: `/api_goods/goods_collections/delete`,
  // 地址 
  addressList: `/api_users/addresses/lists`,
  addressSetDefault: `/api_users/addresses/set_default`,
  addressDelete: `/api_users/addresses/delete`,
  addressRead: `/api_users/addresses/read`,
  addressRegions: `/api_systems/regions/index`,
  addressSave: `/api_users/addresses/save`,
  addressUpdate: `/api_users/addresses/update`,
  // 我的评论
  userComments: `/api_goods/goods_comments/lists`,
  // 我的钱包
  myWallet: `/api_query/users/asset`,
  myWalletLog: `/api_users/user_asset_logs/lists`,
  recharge: `/api_users/user_recharges/save`,
  withdraw: `/api_users/user_drawcashs/save`,
  // 我的银行卡
  bankCardList: `/api_users/bank_cards/lists`,
  bankCardRead: `/api_users/bank_cards/read`,
  bankCardUpdate: `/api_users/bank_cards/update`,
  bankCardSave: `/api_users/bank_cards/save`,
  bankCardDelete: `/api_users/bank_cards/delete`,
  // 优惠券
  couponList: `/api_users/user_coupons/lists`,
  couponConvert: `/api_users/user_coupons/receive`,
  coupons: `/api_query/market/coupon`,
  couponSave: `/api_users/user_coupons/save`,
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
  // 分销中心
  drpApply: `/api_drp/user_apply_distributor/apply`,
  drpCondition: `/api_drp/rules/become_distributor_info`,
  drpApplyRead: `/api_drp/user_apply_distributor/read`,
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
  bonusApply: `/api_bonus/user_apply_bonus/apply`,
  bonusCondition: `/api_bonus/rules/become_bonus_info`,
  bonusApplyRead: `/api_bonus/user_apply_bonus/read`,
  bonusCenter: `/api_query/bonus/bonus_info`,
  bonusApplysList: `/api_bonus/bonus_applys/lists`,
  bonusApplysRead: `/api_bonus/bonus_applys/read`,
  bonusPaySave: `/api_bonus/bonus_applys/save`,
  bonusOrderList: `/api_bonus/bonus_orders/lists`,
  bonusTeamUser: `/api_bonus/team/team_users`,
  bonusChildUser: `/api_bonus/team/child_users`,
  bonusRules: `/api_bonus/rules/index`,
  // 收款账户
  userThirdAcc: `/api_users/user_third_accounts/lists`,
  userThirdUpdate: `/api_users/user_third_accounts/update`,
  // 资产
  userAssetRead: `/api_query/users/asset`,
  scoreLogList: `/api_users/score_logs/lists`,
}