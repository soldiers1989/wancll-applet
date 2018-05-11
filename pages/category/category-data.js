const APP = getApp();

export function getGoodsTree(that){
  APP.ajax({
    url: APP.api.goodsTree,
    success: (res) => {
      let list = []
      res.data.forEach((item,index)=>{
        item.title = item.name;
        list.push(item);
      })
      list.unshift({
        id:'',
        title:'全部'
      })
      // console.log('tree', list)
      that.setData({
        tabList: list
      })
    }
  })
}