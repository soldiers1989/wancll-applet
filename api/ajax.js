import { headers} from './config.js';

// 封装原来的请求 添加公共请求头的配置
export function ajax(option){
  // 配置header
  let headerConfig = {
    'auth': headers.auth,
    'client-type': headers.clientType,
  }
  let header = {}
  if (option.header){
    header = Object.assign(option.header, headerConfig)
  }else{
    header = headerConfig;
  }
  // 其他参数
  let options = option || {};
  let url = options.url || '';
  let data = options.data || {};
  let method = options.method || 'POST';
  let success = options.success
  wx.request({
    url: url,
    data: data,
    header: header,
    method: method,
    dataType: 'json',
    responseType: 'text',
    success(res) {
      if (res.data.code == 1) {
        success(res.data);
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
      }
    },
    fail(err) {
      wx.showToast({
        title: '哎呀，网络粗错了',
        icon: 'none',
      });
      console.log(err);
    }
  })
}
