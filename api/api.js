import {defaultHost} from './config.js';

// 请求的api
export const api = {
  // 主页
  banners: `${defaultHost}/api_articles/banners/lists`,
  configs: `${defaultHost}/api_query/configs/wap_index`,
  annoncements: `${defaultHost}//api_articles/annoncements/lists`,
  market: `${defaultHost}/api_query/market/activity`,
  advertisements: `${defaultHost}/api_articles/advertisements/lists`,

  
  // 商品页面 
  goodsTree: `${defaultHost}/api_goods/goods_cates/lists_tree` ,

  // 多页面公用
  goods: `${defaultHost}/api_goods/goods/lists`

}