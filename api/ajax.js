import { headers} from './config.js';

export function ajax(option){
  let options = option || {};
  let url = options.url || '';
  let data = options.data || {};
  let method = options.method || 'POST';
  let success = options.success || callback;
  let fail = options.fail || callback;
  let complete = options.complete || callback;
  wx.request({
    url: url,
    data: data,
    header: {
      'auth':headers.auth,
      'client-type':headers.clientType,
    },
    method: method,
    dataType: 'json',
    responseType: 'text',
    success: success ||success(),
    fail: fail || fail(),
    complete: complete ||complete(),
  })
}

function callback(res){}