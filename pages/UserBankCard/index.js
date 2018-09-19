const cardNameMapping = {
  '中国农业银行': {
    color: '#018a6e',
    fontClass: 'icon-nongyeyinxing',
  },
  '中国建设银行': {
    color: '#0c4290',
    fontClass: 'icon-jiansheyinxing',
  },
  '中国工商银行': {
    color: '#b0091a',
    fontClass: 'icon-gongshangyinxing',
  },
  '中国银行': {
    color: '#d90000',
    fontClass: 'icon-zhongguoyinxing',
  },
  '招商银行': {
    color: '#cb0101',
    fontClass: 'icon-zhaoshangyinhangbank1193432easyiconnet',
  },
  '光大银行': {
    color: '#52047b',
    fontClass: 'icon-guangdayinxing',
  },
  '中国邮政储蓄银行': {
    color: '#0b6c37',
    fontClass: 'icon-youzhengyinxing',
  },
  '兴业银行': {
    color: '#143981',
    fontClass: 'icon-changyonglogo05',
  },
  '中信银行': {
    color: '#d50202',
    fontClass: 'icon-zhongxinyinxing',
  },
  '浦发银行': {
    color: '#062561',
    fontClass: 'icon-pufayinxing',
  },
  '广发银行': {
    color: '#a01d1d',
    fontClass: 'icon-yinhangqia',
  },
  '平安银行': {
    color: '#f15a21',
    fontClass: 'icon-yinhangqia',
  },
  '交通银行': {
    color: '#003267',
    fontClass: 'icon-jiaotongyinxing',
  },
  '华夏银行': {
    color: '#d50202',
    fontClass: 'icon-changyonglogo17',
  },
  '民生银行': {
    color: '#28a1a3',
    fontClass: 'icon-minshengyinxing',
  },
}
const APP = getApp()

Page({
  data: {
    list: [],
    page: 1,
    noContentImg: APP.imgs.noContentImg,
    haveNoData: false,
  },
  onLoad(options) {},
  onShow() {
    this.setData({
      page: 1,
      list: [],
    })
    this.getList()
  },
  getList() {
    APP.ajax({
      url: APP.api.bankCardList,
      header: {
        'page-num': this.data.page,
        'page-limit': 10,
      }
    }).then(res => {
      let list = APP.util.arrayToUnique(this.data.list.concat(res.data))
      list = list.map(item => {
        item.fontClass = cardNameMapping[item.bank_name].fontClass
        item.color = cardNameMapping[item.bank_name].color
        let format = ''
        for (let i = 0; i < item.card_number.length; i++) {
          if ((i + 1) % 4 == 0) {
            format += (item.card_number[i] + ' ')
          } else {
            format += item.card_number[i]
          }
        }
        item.card_number = format
        return item
      })
      this.setData({
        list: list,
        haveNoData: !Boolean(list.length),
        page: this.data.page + 1
      })
    }).catch(err => {
      console.warn(err)
    })
  },
  editBankCard(e) {
    let id = APP.util.getDataSet(e, 'id')
    wx.navigateTo({
      url: `/pages/UserBankCardEdit/index?id=${id}`,
    })
  },
  onPullDownRefresh() {
    this.setData({
      page: 1,
      list: [],
    })
    this.getList()
    wx.stopPullDownRefresh()
  },
  onReachBottom() {
    this.getList()
  }
})