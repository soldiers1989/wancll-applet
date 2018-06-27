const APP = getApp();
export default class Request {
  constructor() {}
  // 初始化数据
  init(options){
    this.that = options.that;
    this.url = options.url;
    this.type = options.type || 1;
    this.getStr = options.getStr || ''
    this.pushData = options.pushData || ''
    this.callback = options.callback 
    this.selectTable= options.selectTable || 'tabSelectedId'
  }
  // 数据请求主方法 
  getPagesData(options) {
    this.postData = options ? options.postData : {}
    // 数据请求完了
    if (!this.that.data.FPage.hasData) {
      return;
    }
    APP.ajax({
      url: APP.api[this.url],
      data: this.postData,
      header: {
        'page-limit': 10,
        'page-num': this.that.data.FPage.pageNum,
      },
      success: (res) => {
        wx.stopPullDownRefresh();
        if (this.type == 1) {
          // 子参数中取到
          this._setdata1(res)
        } else if (this.type == 2) {
          // 直接 data 中取到
          this._setdata2(res)
        }
      }
    })
  }
  // private 类型 子参数中取到
  _setdata1(res) {
    if (res.data[this.getStr].length) {
      this.that.setData({
        [this.pushData]: this.that.data[this.pushData].concat(res.data[this.getStr]),
        ['FPage.pageNum']: ++(this.that.data.FPage.pageNum),
        ['FPage.noContent']: false,
      })
    } else {
      // 如果是第一页就没有数据
      if (this.that.data.FPage.pageNum == 1) {
        this.that.setData({
          ['FPage.noContent']: true,
          ['FPage.hasData']: false
        })
      } else {
        this.that.setData({
          ['FPage.hasData']: false
        })
      }
    }
  }
  // private 类型 直接data中取到
  _setdata2(res) {
    if (res.data.length) {
      this.that.setData({
        [this.pushData]: this.that.data[this.pushData].concat(res.data),
        ['FPage.pageNum']: ++(this.that.data.FPage.pageNum),
        ['FPage.noContent']: false,
      })
    } else {
      // 如果是第一页就位空
      if (this.that.data.FPage.pageNum == 1) {
        this.that.setData({
          ['FPage.noContent']: true,
          ['FPage.hasData']: false
        })
      } else {
        this.that.setData({
          ['FPage.hasData']: false
        })
      }
    }
  }
  // public 类型 刷新内容
  refresh() {
    this.that.setData({
      ['FPage.pageNum']: 1,
      ['FPage.hasData']: true,
      [this.pushData]: []
    }, () => {
      // 始终传递一个当前的选择id过去。给table选项
      this.callback(this.that.data[this.selectTable])
    })
  }
  // public 类型 点击 tab 切换数据
  tabChange() {
    let id = this.that.selectComponent("#tab").data.selectedId
    // 禁止重复点击
    if (id == this.that.data[this.selectTable]) {
      return;
    }
    this.that.setData({
      [this.selectTable]: id,
      [this.pushData]: [],
      ['FPage.hasData']: true,
      ['FPage.pageNum']: 1,
    }, () => {
      this.callback(id)
    })
  }
}