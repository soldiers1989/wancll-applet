const APP = getApp();
import PagingData from '../../utils/PagingData';
const Paging = new PagingData();
import {
  params
} from '../../api/config.js';
import {
  getMemberParams
} from '../BarUser/data.js'


Page({
  data: {
    // 轮播参数
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,

    // tab组件参数
    tabList: [{
      id: 1,
      title: '详情'
    }, {
      id: 2,
      title: '评价'
    }],
    tabListSelectedId: 1,
    tabListScroll: false,
    tabListHeight: 45,

    user: {},
    isMember: false,
    memberParams: {}, // 会员相关参数

    // 限时折扣活动
    isDiscountGoods: 0, // 是否限时折扣商品
    discountActivity: {},
    timeDown: '0天 00 : 00 : 00', // 倒计时

    // 数据
    goodsId: -1, //   商品的id
    goodsInfo: {
      attr_info: [],
      spec_info: [],
      spec_group_info: {},
      sell_price:0,
      market_price:0,
    }, //  商品信息 read:res.data
    selectedSku: {}, // 点击后筛选出的sku
    isCollect: 0, //  默认是否收藏
    comments: [], // comments:res.data
    // 分页功能
    FPage: {
      pageNum: 1,
      hasData: true,
      noContent: false,
      noContentImg: APP.imgs.noContentImg
    },

    // 控制
    showTab: 1,
    showSkuPopup: false,
    showAttrPopup: false,
    afterSelectSku: '', // 选择sku后操作：加入购物车或购买或不操作
  },
  onLoad(options) {
    if (options.parent_mobile && !this.data.user) {
      APP.globalData.parent_mobile = options.parent_mobile;
    }
    this.setData({
      goodsId: options.id,
      user: wx.getStorageSync('user'),
    });

    // 为登陆注册后跳转准备
    if(!this.data.user){
      let afterRegister = {
        type:'common_goods',
        id:options.id,
      };
      if(options.isDiscountGoods){
        afterRegister.isDiscountGoods = 1;
      }
      wx.setStorageSync('afterRegister',afterRegister);
    }

    getMemberParams(this);

    // 请求活动数据
    if (options.isDiscountGoods) {
      APP.ajax({
        url: APP.api.indexActivity,
        success: res => {
          this.setData({
            discountActivity: res.data.discount[0],
            isDiscountGoods: 1,
          }, () => {
            // 计算截止时间：默认执行一次
            APP.utils.timeDown(this, this.data.discountActivity.end_timestamp * 1000)
            setInterval(() => {
              APP.utils.timeDown(this, this.data.discountActivity.end_timestamp * 1000)
            }, 1000)
          })
        }
      })
    }

    // 请求商品数据
    APP.ajax({
      url: APP.api.detailRead,
      data: {
        id: options.id
      },
      success: res => {
        let data = res.data;
        // 转化具体规格格式，为了选中规格时匹配
        data.spec_group_info = data.spec_group_info.map(item => {
          item.spec_option_group = item.spec_option_group.split('_').sort().toString();
          return item;
        });
        // 处理文案
        (!Array.isArray(data.documents)) && (data.documents = []);
        data.is_foreign && data.documents.unshift(data.country + '品牌', '跨境商品');
        // 图片富文本替换为宽度100%
        res.data.desc = data.desc.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block"')
        // 保存商品数据
        this.setData({
          goodsInfo: data,
        }, () => {
          // 判断是否是登录状态 然后获取收藏状态
          if (wx.getStorageSync('token')) {
            this.isCollect();
            this.addTrack();
          }
        })
      }
    })
    // 分页请求评论数据
    Paging.init({
      type: 2,
      that: this,
      url: 'detailComments',
      pushData: 'comments',
      getFunc: this.getComments
    })
    this.getComments();
    // 处理金卡会员
    this.checkIsMember();
  },
  checkIsMember() {
    if (this.data.user && this.data.user.member_level == params.bcMember) {
      this.setData({
        isMember: true
      });
    }
  },
  // 请求评论数据
  getComments() {
    Paging.getPagesData({
      postData: {
        goods_id: this.data.goodsId
      },
      handler: (comments) => {
        return comments.map((comment) => {
          comment.user_info.nick_name = comment.user_info.nick_name ? comment.user_info.nick_name : '匿名用户';
          comment.user_info.avatar = comment.user_info.avatar ? comment.user_info.avatar : APP.imgs.avatar;;
          return comment;
        });
      }
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    Paging.refresh()
  },
  // 上拉获取评论数据
  onReachBottom() {
    if (this.data.showTab == 2) {
      this.getComments();
    }
  },
  // 预览图片
  previewImage(e) {
    wx.previewImage({
      current: APP.utils.getDataSet(e, 'current'),
      urls: APP.utils.getDataSet(e, 'imgs'),
    })
  },
  // 添加浏览足迹
  addTrack() {
    APP.ajax({
      url: APP.api.detailTrackSave,
      data: {
        goods_id: this.data.goodsId,
      },
    });
  },

  // 默认加载时候判断是否收藏的商品
  isCollect() {
    APP.ajax({
      url: APP.api.detailCollect,
      data: {
        goods_id: this.data.goodsId
      },
      success: (res) => {
        this.setData({
          isCollect: res.data.is_collect
        })
      }
    })
  },
  // 点击的时候判断商品是否收藏
  changeCollect() {
    let token = wx.getStorageSync('token')
    if (!token) {
      wx.showToast({
        title: "请先登录",
        icon: 'none',
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/ComLogin/index'
        })
      }, 1000)
    } else {
      let url = '';
      if (this.data.isCollect) {
        url = APP.api.detailCollectCancel
      } else {
        url = APP.api.detailCollectSave
      }
      APP.ajax({
        url: url,
        data: {
          goods_id: this.data.goodsId
        },
        success: (res) => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
          })
          let isCollect = res.data.id ? 1 : 0
          this.setData({
            isCollect: isCollect
          })
        }
      })
    }
  },
  // 点击购物车按钮
  goCarts() {
    wx.switchTab({
      url: '/pages/BarCarts/index'
    })
  },
  goIndex() {
    wx.switchTab({
      url: '/pages/BarHome/index'
    })
  },  
  // 点击立即开通
  goMember() {
    wx.navigateTo({
      url: '/pages/ComBuyMember/index',
    })
  },
  // 切换详情和评价
  changeTab() {
    let id = this.selectComponent("#tab").data.selectedId
    this.setData({
      showTab: id
    })
  },
  // 点击确定按钮关闭的时候
  confirm(e) {
    this.setData({
      selectedSku: e.detail.selectedSku,
    });
    if (this.data.afterSelectSku == 'buy') {
      setTimeout(() => {
        this.sendBuyNow();
        this.setData({
          afterSelectSku: '',
        });
      }, 500)
    } else if (this.data.afterSelectSku == 'cart') {
      setTimeout(() => {
        this.addCarts();
        this.setData({
          afterSelectSku: '',
        });
      }, 500)
    }
  },


  // 点击加入购物车
  addCarts() {
    if (!this.checkBeforeDo()) {
      return;
    }
    // 商品有规格
    if (this.data.goodsInfo.spec_info.length) {
      if (this.data.selectedSku.id) {
        // 选了规格
        APP.ajax({
          url: APP.api.detailCartsSave,
          data: {
            goods_id: this.data.goodsInfo.id,
            spec_group_id_str: this.data.selectedSku.id_str,
            status: 1,
            num: 1
          },
          success: (res) => {
            wx.showToast({
              title: res.msg,
              icon: 'none',
            })
          }
        })
      } else {
        // 有规格但没选规格
        this.setData({
          afterSelectSku: 'cart'
        });
        this.openSkuPopup();
      }
    } else {
      // 商品无规格
      APP.ajax({
        url: APP.api.detailCartsSave,
        data: {
          goods_id: this.data.goodsInfo.id,
          spec_group_id_str: 0,
          status: this.data.goodsInfo.status,
          num: 1
        },
        success: (res) => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
          })
        }
      })
    }
  },
  // 操作前检验
  checkBeforeDo() {
    let token = wx.getStorageSync('token')
    if (!token) {
      wx.showToast({
        title: "请先登录",
        icon: 'none',
      });
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/ComLogin/index'
        })
      }, 1000);
      return false;
    }
    //  非金卡会员操作限制
    if (this.data.goodsInfo.is_member_good && !this.data.isMember) {
      wx.showToast({
        title: "你还不是金卡会员",
        icon: 'none',
      });
      return false;
    }

    if (this.data.goodsInfo.is_member_good && !this.data.memberParams.shop.is_open) {
      wx.showToast({
        title: "金卡专区未开放",
        icon: 'none',
      });
      return false;
    }

    return true;
  },
  // 点击立即购买
  buyNow(e) {
    if (!this.checkBeforeDo()) {
      return;
    }
    if (this.data.goodsInfo.spec_info.length) {
      if (this.data.selectedSku.id) {
        this.sendBuyNow();
      } else {
        this.setData({
          afterSelectSku: 'buy'
        });
        this.openSkuPopup();
      }
    } else {
      this.sendBuyNow();
    }
  },
  // 跳转到订单详情页
  sendBuyNow() {
    wx.setStorageSync('orderConfirmGoodsList', [{
      goods_info: this.data.goodsInfo,
      select_spec_group_info: this.data.selectedSku,
      num: 1
    }])
    // 处理限时折扣
    wx.navigateTo({
      url: this.data.isDiscountGoods ? `/pages/ComCreateOrder/index?isDiscountGoods=1` : `/pages/ComCreateOrder/index`,
    })
  },
  // 打开弹出层sku选择器
  openSkuPopup() {
    // 触发子组件方法
    this.selectComponent('#selectsku').beforeOpen();
    this.setData({
      showSkuPopup: true
    });
  },
  // 子组件的关闭按钮点击时候也同时关闭
  closeSkuPopup() {
    this.setData({
      afterSelectSku: '',
      showSkuPopup: false
    });
  },
  // 打开弹出层sku选择器
  openAttrPopup() {
    this.setData({
      showAttrPopup: true
    });
  },
  // 子组件的关闭按钮点击时候也同时关闭
  closeAttrPopup() {
    this.setData({
      showAttrPopup: false
    })
  },
  onShareAppMessage() {
    let path = `${this.route}?id=${this.data.goodsId}`;
    if (this.data.user) {
      path += '&parent_mobile=' + this.data.user.mobile;
    }
    console.log(path);
    return {
      title: this.data.goodsInfo.name,
      path: path
    }
  },
})