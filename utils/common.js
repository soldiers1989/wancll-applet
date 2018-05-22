// 获取base64格式的图片
export function getBase64Image(callback) {
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success(res) {
      wx.saveFile({
        tempFilePath: res.tempFilePaths[0],
        success(res) {
          wx.request({
            url: res.savedFilePath,
            method: 'get',
            responseType: 'arraybuffer',
            success(data) {
              let base64 = wx.arrayBufferToBase64(data.data);
              callback && callback(base64);
              wx.getSavedFileList({
                success: function (res) {
                  res.fileList.forEach((i, index) => {
                    wx.removeSavedFile({
                      filePath: i.filePath,
                    })
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}