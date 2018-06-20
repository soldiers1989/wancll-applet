const APP = getApp();
Page({
  data: {
    bonusData: {},
    bonusInfo: {},
    payType:'',
    inputData: '',
    hidden: true,
    nocancel: false,
  },

  onLoad: function (options) {
    this.getData()
  },
  getData(){
    APP.ajax({
      url: APP.api.drpRules,
      success: res => {
        this.setData({
          bonusData: res.data,
        })
      }
    })
    APP.ajax({
      url: APP.api.drpCenter,
      success: res => {
        this.setData({
          bonusInfo: res.data,
        })
      }
    })
  },
  inputData(e) {
    this.setData({
      inputData: e.detail.value
    });
  },
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  confirm: function () {
    this.setData({
      hidden: true
    });
    APP.ajax({
      url: APP.api.drpPaySave,
      data: {
        pay_password: this.data.inputData,
        receipt_type: this.data.payType
      },
      success:res=>{
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
        setTimeout(()=>{
          this.getData()
        },500)
      }
    })
  },
  payWallet() {
    this.pay()
    this.setData({
      payType:'money'
    })
  },
  payWx() {
    this.pay()
    this.setData({
      payType: '"wechat"'
    })
  },
  payAli() {
    this.pay()
    this.setData({
      payType: 'ali'
    })
  },

  pay() {
    APP.ajax({
      url: APP.api.setPayPass,
      success: (res) => {
        if (res.data.is_set_pay_password == 1) {
          this.setData({
            hidden: !this.data.hidden
          });
        } else {
          wx.showToast({
            title: '请设置支付密码',
            icon: 'none',
          })
          setTimeout(() => {
            wx.navigateTo({
              url: `/pages/UserSettingPass/index?id=1`,
            })
          }, 500)
        }
      }
    })
  }
})