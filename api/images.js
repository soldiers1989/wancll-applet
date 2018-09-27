// 引入配置文件
import {
  imageHost
} from './config.js'
// 网络静态图片Ï
const imgs = {
  // 首页五张小图
  tagImgs: [
    `${imageHost.wapImages}/tag1.png`,
    `${imageHost.wapImages}/tag2.png`,
    `${imageHost.wapImages}/tag3.png`,
    `${imageHost.wapImages}/tag4.png`,
    `${imageHost.wapImages}/tag5.png`,
  ],
  avatar: `${imageHost.images}/avatar.png`,
  announcementImg: `${imageHost.wapImages}/wangkaikuaibao.png`,
  logo: `${imageHost.wapImages}/wap_logo.png`,
  noContentImg: `${imageHost.wapImages}/no_content.png`,
  homeBgImg: `${imageHost.wapImages}/home.png`,
  // 实名认证
  idcardFrontExample: `${imageHost.wapImages}/idcard_front_example.png`,
  idcardBackExample: `${imageHost.wapImages}/idcard_back_example.png`,
  uploadCardFront: `${imageHost.wapImages}/idcard_front.png`,
  uploadCardBack: `${imageHost.wapImages}/idcard_back.png`,
  //优惠券
  coupon: `${imageHost.wapImages}/coupon.png`,
  couponPass: `${imageHost.wapImages}/coupon_guoqi.png`,
  couponGet: `${imageHost.wapImages}/coupon_get.png`,
  indexCoupon: `${imageHost.wapImages}/index_coupon.png`,
  // 满减优惠
  indexFull: `${imageHost.wapImages}/index_full.png`,
  // 售罄
  noStockImg: `${imageHost.images}/shouxin.png`,
  // 我的二维码背景
  myEwmCode: `${imageHost.wapImages}/yaoqing.png`,
  // 分红中心背景
  DRcenter: `${imageHost.wapImages}/distribution_bg.png`,
}

export {
  imgs,
}