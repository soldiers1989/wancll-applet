// 引入配置文件
import { imageHost } from './config.js';
// 网络静态图片
export const imgs = {
  // 首页五张小图
  smallImg: [
    `${imageHost.wapImages}/tag1.png`,
    `${imageHost.wapImages}/tag2.png`,
    `${imageHost.wapImages}/tag3.png`,
    `${imageHost.wapImages}/tag4.png`,
    `${imageHost.wapImages}/tag5.png`
  ],
  avatar: `${imageHost.images}/avatar.png`,
  notice: `${imageHost.wapImages}/wangkaikuaibao.png`,
  logo: `${imageHost.wapImages}/wap_logo.png`,
  noContentImg: `${imageHost.wapImages}/no_content.png`,

  idcardFrontExample: `${imageHost.wapImages}/idcard_front_example.png`,
  idcardBackExample: `${imageHost.wapImages}/idcard_back_example.png`,
  uploadCardFront: `${imageHost.wapImages}/idcard_front.png`,
  uploadCardBack: `${imageHost.wapImages}/idcard_back.png`,
}
  
