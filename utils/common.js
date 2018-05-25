const APP = getApp();
// 获取base64格式的图片
export function getBase64Image(callback) {
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success(res) {
      let canvas = wx.createCanvasContext('canvas1');
      // 1. 绘制图片至canvas
      canvas.drawImage(res.tempFilePaths[0], 0, 0, 100, 100)
      // 绘制完成后执行回调，API 1.7.0
      canvas.draw(false, () => {
        // 2. 获取图像数据， API 1.9.0
        wx.canvasGetImageData({
          canvasId: 'canvas1',
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          success(res) {
            // 3. png编码
            let pngData = upng.encode([res.data.buffer], res.width, res.height)
            // 4. base64编码
            let base64 = wx.arrayBufferToBase64(pngData)
          }
        })
      })
      // wx.saveFile({
      //   tempFilePath: res.tempFilePaths[0],
      //   success(res) {
      //     wx.request({
      //       url: res.savedFilePath,
      //       method: 'get',
      //       responseType: 'arraybuffer',
      //       success(data) {
      //         let base64 = wx.arrayBufferToBase64(data.data);
      //         callback && callback(base64);
      //         wx.getSavedFileList({
      //           success: function (res) {
      //             res.fileList.forEach((i, index) => {
      //               wx.removeSavedFile({
      //                 filePath: i.filePath,
      //               })
      //             })
      //           }
      //         })
      //       }
      //     })
      //   }
      // })
    }
  })
}

// 代理微信登陆
export function handleWechatLogin(that, userinfo) {
  if (!userinfo.encryptedData) {
    return;
  }
  // 微信登录获取临时code
  wx.login({
    success(res) {
      // 通过临时code 从服务端换取 session_code,openid等信息，如果用户已经在其他平台登陆则可以直接获取union_id
      APP.ajax({
        url: APP.api.getSessionCode,
        data: {
          code: res.code
        },
        success(res) {
          if (res.data.unionid) {
            queryUserInfoByUnionId(res.data.unionid, that);
          } else {
            // 通过服务端的接口解密数据
            APP.ajax({
              url: APP.api.getWechatUserInfo,
              data: {
                session_key: res.data.session_key,
                encrypted_data: userinfo.encryptedData,
                iv: userinfo.iv
              },
              success(res) {
                queryUserInfoByUnionId(JSON.parse(res.data).unionId, that);
              },
            })
          }
        }
      })
    }
  })
}
// 根据 unionId 查询用户信息
function queryUserInfoByUnionId(unionId, that) {
  let user = wx.getStorageSync('user');
  // 登录状态直接绑定uniondId
  if (user) {
    APP.ajax({
      url: APP.api.bindWechatInLogin,
      data: {
        openid_type: 'wechat',
        openid: unionId
      },
      success(res) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        });
        that.setData({
          hasBindWechat: true
        })
      }
    })
  } else {
    // 非登陆状态从服务端查询
    APP.ajax({
      url: APP.api.queryUserByUnionId,
      data: {
        type: 'wechat',
        openid: unionId
      },
      success(res) {
        // 如果 union_id 已经绑定服务端账户
        if (res.data.user) {
          res.data.user.avatar = res.data.user.avatar ? res.data.user.avatar : APP.imgs.avatar;
          // 登录之后先全部存入本地
          wx.setStorageSync("token", res.data.token)
          wx.setStorageSync("user", res.data.user)
          // 然后再存入全局变量中
          APP.globalData.hasLogin = true
          APP.globalData.token = res.data.token.token
          APP.globalData.user = res.data.user
          // 再跳转
          wx.switchTab({
            url: '/pages/user/user',
          })
        } else {
          wx.showActionSheet({
            itemList: ['绑定已有账号', '注册新账号'],
            success(res) {
              if (res.tapIndex == 0) {
                wx.navigateTo({
                  url: `/pages/wechatBindMobile/wechatBindMobile?unionId=${unionId}`,
                })
              } else if (res.tapIndex == 1) {
                wx.navigateTo({
                  url: `/pages/register/register?unionId=${unionId}`,
                })
              }
            }
          })
        }
      }
    })
  }
}

// 代理微信支付
export function handleWechatPay(orderNo) {
  wx.login({
    success(res) {
      if (res.code) {
        APP.ajax({
          url: APP.api.wechatPay,
          data: {
            code: res.code,
            order_no: orderNo
          },
          success(res) {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })
      }
    }
  })
}