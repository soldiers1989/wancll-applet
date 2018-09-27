const APP = getApp();
Component({
  properties: {
    goods: {
      type: Object,
      description: '传递过来的商品详情数据',
    },
    selectSku: {
      type: Object,
      description: '传递过来的sku',
    },
    isCart: {
      type: Boolean,
      description: '是否是购物车',
    },
    isDiscountGoods: {
      type: Boolean,
      description: '是否是限时折扣商品',
    },
    discountPrice: {
      type: Number,
      description: '限时折扣的价格',
    }
  },
  data: {},
  // 组装规格
  attached() {
    if (!this.data.isCart) {
      this.refresh()
    }
  },
  methods: {
    refresh() {
      let specOptionGroupArr = ''
      if (this.data.selectSku.id) {
        specOptionGroupArr = this.data.selectSku.spec_option_group.split(',')
      }
      this.data.goods.spec_info = this.data.goods.spec_info.map(spec => {
        spec.options = spec.options.map(option => {
          return {
            option: option,
            isSelected: specOptionGroupArr.indexOf(option) != -1,
          }
        })
        return spec
      })
      this.setData({
        goods: this.data.goods
      })
    },
    // 点击确定按钮关闭
    confirm() {
      for (let i = 0; i < this.data.goods.spec_info.length; i++) {
        let spec = this.data.goods.spec_info[i]
        if (spec.options.every(item => {
            return !item.isSelected
          })) {
          APP.util.toast(`请选择【${spec.name}】规格项`)
          return
        }
      }
      this.triggerEvent('confirm', {
        goods: this.data.goods,
        selectSku: this.data.selectSku,
      })
    },
    // 点击关闭按钮关闭
    close() {
      this.triggerEvent('close')
    },
    // 选择规格
    selectOption(e) {
      let sOption = APP.util.getDataSet(e, 'option')
      this.data.goods.spec_info.forEach(item => {
        item.options.forEach(option => {
          option.isSelected = option.option == sOption
        })
      })
      this.setData({
        goods: this.data.goods
      })
      let options = []
      this.data.goods.spec_info.forEach(item => {
        item.options.forEach(option => {
          if (option.isSelected) {
            options.push(option.option)
          }
        })
      })
      options = options.sort().toString()
      this.data.goods.spec_group_info.forEach(item => {
        if (item.spec_option_group == options) {
          this.setData({
            selectSku: item
          })
        }
      })
    },
  },
})