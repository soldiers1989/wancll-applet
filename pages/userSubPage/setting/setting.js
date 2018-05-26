const APP = getApp();
const passwordSelectList = ['登录密码修改', '支付密码修改'];
import { updateUserInfo, queryWechatBindStatus, unbind, bindWechatInLogin, getUserData } from './settingData.js';
import { getBase64Image, handleWechatLogin } from '../../../utils/common.js';
Page({
  data: {
    user: {},
    genderList: ['保密', '男', '女'],
    hasBindWechat: false,
  },
  onLoad(options) {
    this.setData({
      user: wx.getStorageSync('user')
    });
    queryWechatBindStatus(this);
  },
  goHelpAndOption(){
    wx.navigateTo({
      url: `/pages/userSubPage/helpAndOption/helpAndOption`,
    })
  },
  // 改变头像
  changeAvatar() {
    getBase64Image((base64) => {
      updateUserInfo(this, { avatar: base64 });
    })

  },
  //密码修改
  changePassword() {
    wx.showActionSheet({
      itemList: passwordSelectList,
      success: res => {
        wx.navigateTo({
          url: `/pages/userSubPage/settingPassword/settingPassword?id=${res.tapIndex}`,
        })
      }
    })
  },
  // 性别选择
  selectGender() {
    let that = this;
    wx.showActionSheet({
      itemList: this.data.genderList,
      success(res) {
        updateUserInfo(that, { gender: res.tapIndex });
      }
    })
  },
  // 修改昵称
  changeName(e) {
    updateUserInfo(this, { nick_name: e.detail.value });
  },
  // 修改手机号码
  changeMobile(e) {
    wx.navigateTo({
      url: '/pages/userSubPage/modifyMobile/modifyMobile',
    })
  },
  // 解绑
  unbind() {
    let that = this;
    wx.showModal({
      title: '确定解除微信账号绑定?',
      success(res) {
        if (res.confirm) {
          unbind(that);
        }
      }
    })
  },
  // 绑定
  bind(res) {
    handleWechatLogin(this, res.detail);
  },

  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success(res) {
        if (res.confirm) {
          wx.clearStorageSync()
          wx.reLaunch({
            url: '/pages/index/index'
          })
        }
      }
    })
  },
  onPullDownRefresh() {
    getUserData(this);
    queryWechatBindStatus(this);
    wx.stopPullDownRefresh();
  },
  onShareAppMessage() {

  }
})