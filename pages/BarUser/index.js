const APP = getApp()
import {
  getUserData,
  queryAuthStatus,
  signIn,
  getMemberParams
} from './data.js';
import {
  imageHost,
  params
} from '../../api/config.js';
Page({
  data: {
    imageHost: imageHost,
    user: {},
    count: {},
    asset: {},
    is_open_bonus: '',
    is_open_drp: '',

    distributorInfo: {},
    isMember: false,

    animation: {},
    isShowGold: false, // 金币掉落
  },
  onLoad() {
    // this.doGoldMusic();
  },
  doGoldMusic() {
    wx.playVoice({
      filePath: '../../static/music/gold.mp3',
      duration: 3000,
      success: res => {
        console.log(111);
      },
      fail: res => {
        console.log(res);
      }
    })
  },
  // 金币掉落动画
  doGold() {
    var animation = wx.createAnimation({
      transformOrigin: "100% 100%",
      duration: 5000,
      timingFunction: "ease",
      delay: 0
    });
    this.animation = animation;
    animation.translateY(1600);
    this.setData({
      animationData: animation.export()
    });
    setTimeout(function() {
      animation.translate(30).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)
  },
  // 判断是否金卡会员
  checkIsMember() {
    if (this.data.user && this.data.user.member_level == params.bcMember) {
      this.setData({
        isMember: true
      });
    }
  },
  // 跳转到订单状态页面
  goOrderList(e) {
    let target = APP.utils.getDataSet(e, 'target')
    wx.navigateTo({
      url: `/pages/UserOrderList/index?target=${target}`,
    })
  },
  // 跳转到子页面
  goSubPages(e) {
    let target = APP.utils.getDataSet(e, 'target')
    // if (target == 'UserDBCenter') {
    //   this.checkDBPage(target)
    // }else if (target == 'UserDRCenter') {
    //   this.checkDRPage(target)
    // }else{
    wx.navigateTo({
      url: `/pages/${target}/index`,
    })
    // }
  },
  // checkDRPage(target) {
  //   APP.ajax({
  //     url: APP.api.drpCenter,
  //     success: infoResp=>{
  //       APP.ajax({
  //         url: APP.api.userDrp,
  //         success: becomeInfoResp => {
  //           // 如果不是分销商
  //           if (!infoResp.data.is_distributor) {
  //             var value = becomeInfoResp.data.become_distributor_condition;
  //             if (value == 'apply') {
  //               // 跳转到申请页面
  //               APP.ajax({
  //                 url: APP.api.userDrpRead,
  //                 success: applyResp=>{
  //                   if (!applyResp.data.status) {
  //                     wx.navigateTo({
  //                       url: `/pages/UserDBAndDRApply/index?type=distribution`,
  //                     })
  //                   } else if (applyResp.data.status == 1) {
  //                     wx.showToast({
  //                       title: '审核中,请耐心等待',
  //                       icon: 'none'
  //                     })
  //                   } else if (applyResp.data.status == 2) {
  //                     wx.showToast({
  //                       title: '审核未通过,请重新提交',
  //                       icon: 'none'
  //                     })
  //                     setTimeout(() => {
  //                       wx.navigateTo({
  //                         url: `/pages/UserDBAndDRApply/index?type=distribution`,
  //                       })
  //                     }, 800);
  //                   }
  //                 }
  //               })
  //             } else if (value == 'order_num') {
  //               wx.showToast({
  //                 title: '成为分销商需完成' + becomeInfoResp.data.become_distributor_value + '笔订单',
  //                 icon: 'none'
  //               })
  //             } else if (value == 'order_money') {
  //               wx.showToast({
  //                 title: '成为分销商订单金额需达到' + becomeInfoResp.data.become_distributor_value,
  //                 icon: 'none'
  //               })
  //             } else if (value == 'goods') {
  //               wx.showToast({
  //                 title: '成为分销商需购买商品',
  //                 icon: 'none'
  //               })
  //               setTimeout(()=> {
  //                 wx.navigateTo({
  //                   url: `/pages/ComGoodsList/index?distribution=1`,
  //                 })
  //               }, 800);
  //             }
  //           } else {
  //             if (becomeInfoResp.data.is_need_complete_user_info) {
  //               // 查询用户是否完善个人信息
  //               APP.ajax({
  //                 url: APP.api.userCompleteInfo,
  //                 success: completeResp => {
  //                   if (completeResp.data.is_complete) {
  //                     wx.navigateTo({
  //                       url: `/pages/UserDRCenter/index`,
  //                     })
  //                   } else {
  //                     wx.navigateTo({
  //                       url: `/pages/UserInfoComplete/index`,
  //                     })
  //                   }
  //                 }
  //               })
  //             } else {
  //               wx.navigateTo({
  //                 url: `/pages/UserDRCenter/index`,
  //               })
  //             }
  //           }
  //         }
  //       })
  //     }
  //   })
  // },
  // checkDBPage(target) {
  //   APP.ajax({
  //     url: APP.api.bonusCenter,
  //     success: infoResp => {
  //       APP.ajax({
  //         url: APP.api.userBonus,
  //         success: becomeInfoResp => {
  //           if (!infoResp.data.is_bonus) {
  //             var value = becomeInfoResp.data.become_bonus_condition;
  //             if (value == 'apply') {
  //               // 跳转到申请页面
  //               APP.ajax({
  //                 url: APP.api.userBonusRead,
  //                 success: applyResp => {
  //                   if (!applyResp.data.status) {
  //                     wx.navigateTo({
  //                       url: `/pages/UserDBAndDRApply/index?type=bonus`,
  //                     })
  //                   } else if (applyResp.data.status == 1) {
  //                     wx.showToast({
  //                       title: '审核中, 请耐心等待',
  //                       icon: 'none'
  //                     })
  //                   } else if (applyResp.data.status == 2) {
  //                     wx.showToast({
  //                       title: '审核未通过,请重新提交',
  //                       icon: 'none'
  //                     })
  //                     setTimeout(() => {
  //                       wx.navigateTo({
  //                         url: `/pages/UserDBAndDRApply/index?type=bonus`,
  //                       })
  //                     }, 800);
  //                   }
  //                 }
  //               })
  //             } else if (value == 'order_num') {
  //               wx.showToast({
  //                 title: '成为分红商需完成' + becomeInfoResp.data.become_bonus_value + '笔订单',
  //                 icon: 'none'
  //               })
  //             } else if (value == 'order_money') {
  //               wx.showToast({
  //                 title: '成为分红商订单金额需达到' + becomeInfoResp.data.become_bonus_value + '元',
  //                 icon: 'none'
  //               })
  //             } else if (value == 'goods') {
  //               wx.showToast({
  //                 title: '成为分红商需购买商品',
  //                 icon: 'none'
  //               })
  //               setTimeout( ()=> {
  //                 wx.navigateTo({
  //                   url: `/pages/ComGoodsList/index?bonus=1`,
  //                 })
  //                 // goto('goods_list_model', { bonus: 1 })
  //               }, 800);
  //             }
  //           } else {
  //             if (becomeInfoResp.data.is_need_complete_user_info) {
  //               // 查询用户是否完善个人信息
  //               APP.ajax({
  //                 url: APP.api.userCompleteInfo,
  //                 success: completeResp=>{
  //                   if (completeResp.data.is_complete) {
  //                     wx.navigateTo({
  //                       url: `/pages/UserDBCenter/index`,
  //                     })
  //                   } else {
  //                     wx.navigateTo({
  //                       url: `/pages/UserInfoComplete/index`,
  //                     })
  //                   }
  //                 }
  //               })
  //             } else {
  //               wx.navigateTo({
  //                 url: `/pages/UserDBCenter/index`,
  //               })
  //             }
  //           }
  //         }
  //       })
  //     }
  //   })
  // },
  // 跳转到购物车页面
  goCarts(e) {
    let target = APP.utils.getDataSet(e, 'target')
    wx.switchTab({
      url: `/pages/${target}/index`,
    })
  },
  // 跳转成长值记录
  showGrow() {
    wx.navigateTo({
      url: `/pages/UserGrow/index`,
    })
  },
  // 跳转到设置页面
  settingInfo() {
    wx.navigateTo({
      url: `/pages/UserSetting/index`,
    })
  },
  onShow: function() {
    // 判断登录状态
    if (!wx.getStorageSync('token')) {
      wx.redirectTo({
        url: '/pages/ComLogin/index',
      })
    } else {
      // 发起请求
      getUserData(this);
    }
  },
  // 签到
  signIn() {
    signIn(this);
  },
  auth() {
    queryAuthStatus();
  },
  onPullDownRefresh() {
    getUserData(this);
    wx.stopPullDownRefresh();
  },
  onShareAppMessage() {

  }
})