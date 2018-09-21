import {
  headers,
  imageHost,
  defaultHost,
} from '../api/config.js'
const APP = getApp()

// 选择图片
function chooseImage(option) {
  let count = option.count || 1
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: count,
      success(res) {
        let promises = res.tempFilePaths.map(item => {
          return uploadFile(item)
        })
        wx.showLoading({
          title: '上传中',
        })
        Promise.all(promises).then(values => {
          resolve(values)
          wx.hideLoading()
        }).catch(err => {
          reject(err)
          wx.hideLoading()
        })
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 上传文件
function uploadFile(filePath) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: defaultHost + APP.api.uploadFile,
      filePath: filePath,
      header: headers,
      formData: {
        save_path: '/public/upload/applet/'
      },
      name: 'file',
      success(res) {
        resolve(JSON.parse(res.data).data.host_file_path)
      },
      fail(err) {
        reject(err)
      },
    })
  })
}

// 代理微信登陆
function handleWechatLogin(that, userinfo) {
  if (!userinfo.encryptedData) {
    return
  }
  wx.showLoading()
  // 微信登录获取临时code
  wx.login({
    success(res) {
      // 通过临时code 从服务端换取 session_code,openid等信息，如果用户已经在其他平台登陆则可以直接获取union_id
      APP.ajax({
        url: APP.api.getSessionCode,
        data: {
          code: res.code
        },
      }).then(res => {
        wx.hideLoading()
        // 通过服务端的接口解密数据
        APP.ajax({
          url: APP.api.getWechatUserInfo,
          data: {
            session_key: res.data.session_key,
            encrypted_data: userinfo.encryptedData,
            iv: userinfo.iv
          },
        }).then(res => {
          queryUserInfoByUnionId(JSON.parse(res.data), that)
        }).catch(err => {
          // 失败重新获取
          // handleWechatLogin(that, userinfo)
        })
      }).catch(err => {})
    }
  })
}
// 根据 unionId 查询用户信息
function queryUserInfoByUnionId(resData, that) {
  let unionId = resData.unionId
  let avatar = resData.avatarUrl
  let nick_name = resData.nickName
  let real_openid = resData.openId
  let user = wx.getStorageSync('user')
  // 登录状态直接绑定uniondId
  if (user) {
    APP.ajax({
      url: APP.api.bindWechatInLogin,
      data: {
        openid_type: 'wechat',
        openid: unionId
      },
    }).then(res => {
      APP.util.toast(res.msg)
      that.setData({
        hasBindWechat: true
      })
    }).catch(err => {})
  } else {
    // 非登陆状态从服务端查询
    APP.ajax({
      url: APP.api.queryUserByUnionId,
      data: {
        type: 'wechat',
        openid: unionId
      },
    }).then(res => {
      // 如果 union_id 已经绑定服务端账户
      if (res.data.user) {
        res.data.user.avatar = res.data.user.avatar ? res.data.user.avatar : APP.imgs.avatar
        // 登录之后先全部存入本地
        wx.setStorageSync("token", res.data.token)
        wx.setStorageSync("user", res.data.user)
        // 再跳转
        wx.switchTab({
          url: '/pages/BarUser/index',
        })
      } else {
        wx.showActionSheet({
          itemList: ['绑定已有账号', '注册新账号'],
          success(res) {
            if (res.tapIndex == 0) {
              wx.navigateTo({
                url: `/pages/ComBindMobile/index?unionId=${unionId}&nick_name=${nick_name}&avatar=${avatar}&real_openid=${real_openid}`,
              })
            } else if (res.tapIndex == 1) {
              wx.navigateTo({
                url: `/pages/ComRegister/index?unionId=${unionId}&nick_name=${nick_name}&avatar=${avatar}&real_openid=${real_openid}`,
              })
            }
          }
        })
      }
    }).then(err => {})
  }
}

// 代理微信支付
function handleWechatPay(orderNo) {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        APP.ajax({
          url: APP.api.wechatPay,
          data: {
            code: res.code,
            order_no: orderNo,
          },
        }).then(res => {
          // 支付成功 resolve
          res.data.success = resolve
          wx.requestPayment(res.data)
        }).catch(err => {
          reject(err)
        })
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
// 查询订单是否支付
function queryOrderIsPay(orderNo) {
  wx.showLoading({
    title: '支付处理中',
  })
  return new Promise((resolve, reject) => {
    let intervalInt = setInterval(() => {
      APP.ajax({
        url: APP.api.orderIsPay,
        data: {
          order_no: orderNo
        },
      }).then(res => {
        if (res.data.is_pay == 1) {
          wx.hideLoading()
          APP.util.toast('支付成功')
          clearInterval(intervalInt)
          resolve()
        }
      }).catch(err => {
        console.log(err)
      })
    }, 3000)
  })
}
// 查询是否设置支付密码
function queryIsSetPayPassword() {
  return new Promise((resolve, reject) => {
    APP.ajax({
      url: APP.api.userIsSetPayPassword,
    }).then(res => {
      if (res.data.is_set_pay_password == 1) {
        resolve()
      } else {
        APP.util.toast('请设置支付密码')
        setTimeout(() => {
          wx.navigateTo({
            url: `/pages/UserSettingPass/index?type=2`,
          })
        }, 500)
        reject()
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export {
  chooseImage,
  handleWechatLogin,
  handleWechatPay,
  queryOrderIsPay,
  queryIsSetPayPassword,
}