const APP = getApp();
const passwordSelectList = ['登录密码修改', '支付密码修改'];
import { updateUserInfo, getUserInfo } from './settingData.js';
import { getBase64Image } from '../../../utils/common.js';
Page({
  data: {
    user: {},
    genderList: ['保密', '男', '女'],
  },
  onLoad(options) {
    getUserInfo(this);
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
  }
})