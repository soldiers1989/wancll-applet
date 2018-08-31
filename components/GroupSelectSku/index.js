const APP = getApp();
Component({
  properties: {
    goods: {
      type: Object,
      description: '传递过来的商品详情数据'
    },
    // goodsinfo: {
    //   type: Object,
    //   description: '传递过来的商品详情数据'
    // },
    sendSelectedSku: {
      type: Object,
      description: '传递过来的选择的sku'
    },
  },
  data: {
    goodsInfo:{},
    skuData: [], // 重新组装的sku数据
    selectedSku: {}, // 点击后筛选出的sku
  },
  // 组件生成到页面获取的参数
  attached() {
    this.setData({
      goodsInfo:this.data.goods.goods_info
    });

    // 添加是否选中属性
    this.setData({
      skuData: this.data.goodsInfo.spec_info.map(spec => {
        spec.options = spec.options.map(option => {
          return {
            isSelected: false,
            option: option
          };
        });
        return spec;
      })
    });
  },
  // 组件的方法列表
  methods: {
    // 初始化skuData和selectedSku
    beforeOpen() {
      this.setData({
        selectedSku: this.data.sendSelectedSku
      });
      // 组合已选中规格
      if (this.data.sendSelectedSku.spec_option_group) {
        let sendSelectedSkuStr = this.data.sendSelectedSku.spec_option_group;
        this.setData({
          skuData: this.data.skuData.map(spec => {
            spec.options = spec.options.map(option => {
              return {
                isSelected: sendSelectedSkuStr.split(',').indexOf(option.option) != -1,
                option: option.option
              };
            });
            return spec;
          })
        });
      } else {
        // 没点击确定选择规格，应清空所选
        this.setData({
          skuData: this.data.skuData.map(spec => {
            spec.options = spec.options.map(option => {
              return {
                isSelected: false,
                option: option.option
              };
            });
            return spec;
          })
        });
      }
    },
    // 改变选择
    changeSelect(e) {
      let spec = APP.utils.getDataSet(e, 'spec');
      let option = APP.utils.getDataSet(e, 'option');
      let speckey = APP.utils.getDataSet(e, 'speckey');
      let optionkey = APP.utils.getDataSet(e, 'optionkey');

      // 选中添加颜色，没选中的去掉颜色
      spec.options.forEach((option, key) => {
        if (key == optionkey) {
          option.isSelected = true;
        } else {
          option.isSelected = false;
        }
      });

      this.data.skuData[speckey] = spec;

      // 组装选中的规格项
      let selectOptions = [];
      let selectedSku = '';
      this.data.skuData.forEach(spec => {
        spec.options.forEach(option => {
          if (option.isSelected) {
            selectOptions.push(option.option);
          }
        });
      });
      selectOptions = selectOptions.sort().toString();
      this.data.goods.spec_group_info.forEach(item => {
        if (selectOptions == item.spec_option_group) {
          selectedSku = item;
        }
      });
      this.setData({
        skuData: this.data.skuData,
        selectedSku: selectedSku
      });
    },
    // 点击确定按钮关闭
    confirm() {
      // 判断规格是否都选了
      for (let i = 0; i < this.data.skuData.length; i++) {
        let spec = this.data.skuData[i];
        if (spec.options.every(option => {
            return !option.isSelected;
          })) {
          wx.showToast({
            title: "请选择商品属性",
            icon: 'none',
            duration: 500,
          })
          return;
        }
      }

      let data = {
        selectedSku: this.data.selectedSku,
      }
      this.triggerEvent('confirm', data);
      this.close();
    },
    // 点击关闭按钮关闭
    close() {
      this.triggerEvent('close')
    }
  }
})