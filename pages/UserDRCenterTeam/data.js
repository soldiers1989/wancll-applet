const APP = getApp()

// 获得分销级数
function getLevel(that){
  APP.ajax({
    url: APP.api.drpRules,
  }).then(res => {
    let data = [];
    if (res.data.level >= 1) {
      data.push({
        id: 1,
        name: '一级',
      })
    }
    if (res.data.level >= 2) {
      data.push({
        id: 2,
        name: '二级',
      })
    }
    if (res.data.level >= 3) {
      data.push({
        id: 3,
        name: '三级',
      })
    }
    that.setData({
      tabList: data
    })
  }).catch(err => {
    console.warn(err)
  })
}
// 获得列表
function getList(that){
  APP.ajax({
    url: APP.api.drpTeamUser,
    data: {
      team_type: that.data.tabSelectedId,
    },
    header: {
      'page-num': that.data.page,
      'page-limit': 10,
    }
  }).then(res => {
    let list = APP.util.arrayToUnique(that.data.list.concat(res.data.team_users))
    that.setData({
      list: list,
      haveNoData: !Boolean(list.length),
      page: that.data.page + 1,
      team_info: res.data.team_info,
    })
  }).catch(err => {
    console.warn(err)
  })
}

export {
  getLevel,
  getList,
}