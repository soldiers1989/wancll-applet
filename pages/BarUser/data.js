const APP = getApp();

// 获取数据
function getData(that) {
  // 订单统计
  let orderCountPromise = APP.ajax({
    url: APP.api.orderCount,
  })
  // 用户资产
  let userAssetPromise = APP.ajax({
    url: APP.api.userAssetRead,
  })
  // 用户信息
  let userReadPromise = APP.ajax({
    url: APP.api.userRead,
  })
  // 系统信息
  let systemInfoPromise = APP.ajax({
    url: APP.api.systemInfo,
  })
  Promise.all([orderCountPromise, userAssetPromise, userReadPromise, systemInfoPromise]).then(resps => {
    let orderCount = resps[0].data
    let userAsset = resps[1].data
    let user = resps[2].data
    user.avatar = user.avatar || APP.imgs.avatar
    wx.setStorage({
      key: 'user',
      data: user,
    })
    let systemInfo = resps[3].data
    that.setData({
      orderCount: orderCount,
      userAsset: userAsset,
      user: user,
      systemInfo: systemInfo
    })
    wx.stopPullDownRefresh()
  }).catch(err => {
    wx.stopPullDownRefresh()
  })
}
// 查询实名认证状态
function queryAuthStatus(that) {
  APP.ajax({
    url: APP.api.queryAuthStatus,
  }).then(resp => {
    let status = resp.data.status;
    if (status == 0) {
      wx.navigateTo({
        url: `/pages/UserIdcardSubmit/index?status=${status}`,
      })
    } else if (status == 2) {
      wx.showToast({
        title: '您的信息未通过审核,请重新提交',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateTo({
          url: `/pages/UserIdcardSubmit/index?status=${status}&id=${resp.data.id}`,
        })
      }, 1000)
    } else if (status == 1 || status == 3) {
      wx.navigateTo({
        url: '/pages/UserIdcardInfo/index',
      })
    }
  }).catch(err => {})
}
// 检查分销
function checkDRPage(that) {
  APP.ajax({
    url: APP.api.drpCenter,
  }).then(infoResp => {
    APP.ajax({
      url: APP.api.drpCondition,
    }).then(becomeInfoResp => {
      // 如果不是分销商
      if (!infoResp.data.is_distributor) {
        let value = becomeInfoResp.data.become_distributor_condition
        if (value == 'apply') {
          // 跳转到申请页面
          APP.ajax({
            url: APP.api.drpApplyRead,
          }).then(applyResp => {
            setLoadingFalse(that)
            if (!applyResp.data.status) {
              wx.navigateTo({
                url: `/pages/UserDBAndDRApply/index?type=distribution`,
              })
            } else if (applyResp.data.status == 1) {
              APP.util.toast('审核中,请耐心等待')
            } else if (applyResp.data.status == 2) {
              APP.util.toast('审核未通过,请重新提交')
              setTimeout(() => {
                wx.navigateTo({
                  url: `/pages/UserDBAndDRApply/index?type=distribution`,
                })
              }, 800)
            }
          }).catch(err => {
            setLoadingFalse(that)
          })
        } else if (value == 'order_num') {
          setLoadingFalse(that)
          APP.util.toast(`成为分销商需完成${becomeInfoResp.data.become_distributor_value}笔订单`)
        } else if (value == 'order_money') {
          setLoadingFalse(that)
          APP.util.toast(`成为分销商订单金额需达到${becomeInfoResp.data.become_distributor_value}元`)
        } else if (value == 'goods') {
          setLoadingFalse(that)
          APP.util.toast('成为分销商需购买商品')
          setTimeout(() => {
            wx.navigateTo({
              url: `/pages/ComGoodsList/index?distribution=1`,
            })
          }, 800)
        }
      } else {
        if (becomeInfoResp.data.is_need_complete_user_info) {
          // 查询用户是否完善个人信息
          APP.ajax({
            url: APP.api.userCompleteInfo,
          }).then(completeResp => {
            setLoadingFalse(that)
            if (completeResp.data.is_complete) {
              wx.navigateTo({
                url: `/pages/UserDRCenter/index`,
              })
            } else {
              wx.navigateTo({
                url: `/pages/UserInfoComplete/index`,
              })
            }
          }).catch(err => {
            setLoadingFalse(that)
          })
        } else {
          setLoadingFalse(that)
          wx.navigateTo({
            url: `/pages/UserDRCenter/index`,
          })
        }
      }
    }).catch(err => {
      setLoadingFalse(that)
    })
  }).catch(err => {
    setLoadingFalse(that)
  })
}

function setLoadingFalse(that) {
  that.setData({
    loading: false
  })
}
// 检查分红
function checkDBPage(that) {
  APP.ajax({
    url: APP.api.bonusCenter,
  }).then(infoResp => {
    APP.ajax({
      url: APP.api.bonusCondition,
    }).then(becomeInfoResp => {
      if (!infoResp.data.is_bonus) {
        var value = becomeInfoResp.data.become_bonus_condition
        if (value == 'apply') {
          // 跳转到申请页面
          APP.ajax({
            url: APP.api.bonusApplyRead,
          }).then(applyResp => {
            setLoadingFalse(that)
            if (!applyResp.data.status) {
              wx.navigateTo({
                url: `/pages/UserDBAndDRApply/index?type=bonus`,
              })
            } else if (applyResp.data.status == 1) {
              APP.util.toast('审核中, 请耐心等待')
            } else if (applyResp.data.status == 2) {
              APP.util.toast('审核未通过,请重新提交')
              setTimeout(() => {
                wx.navigateTo({
                  url: `/pages/UserDBAndDRApply/index?type=bonus`,
                })
              }, 800)
            }
          }).catch(err => {
            setLoadingFalse(that)
          })
        } else if (value == 'order_num') {
          setLoadingFalse(that)
          APP.util.toast(`成为分红商需完成${becomeInfoResp.data.become_bonus_value}笔订单`)
        } else if (value == 'order_money') {
          setLoadingFalse(that)
          APP.util.toast(`成为分红商订单金额需达到${becomeInfoResp.data.become_bonus_value}元`)
        } else if (value == 'goods') {
          setLoadingFalse(that)
          APP.util.toast('成为分红商需购买商品')
          setTimeout(() => {
            wx.navigateTo({
              url: `/pages/ComGoodsList/index?bonus=1`,
            })
          }, 800)
        }
      } else {
        if (becomeInfoResp.data.is_need_complete_user_info) {
          // 查询用户是否完善个人信息
          APP.ajax({
            url: APP.api.userCompleteInfo,
          }).then(completeResp => {
            setLoadingFalse(that)
            if (completeResp.data.is_complete) {
              wx.navigateTo({
                url: `/pages/UserDBCenter/index`,
              })
            } else {
              wx.navigateTo({
                url: `/pages/UserInfoComplete/index`,
              })
            }
          }).catch(err => {
            setLoadingFalse(that)
          })
        } else {
          setLoadingFalse(that)
          wx.navigateTo({
            url: `/pages/UserDBCenter/index`,
          })
        }
      }
    }).catch(err => {
      setLoadingFalse(that)
    })
  }).catch(err => {
    setLoadingFalse(that)
  })
}

export {
  getData,
  queryAuthStatus,
  checkDRPage,
  checkDBPage,
}