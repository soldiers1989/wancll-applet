// 获取base64格式的图片
export function getBase64Image(callback) {
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success(res) {
      console.log(res.tempFilePaths[0])

      let canvas = wx.createCanvasContext('canvas1');
      // 1. 绘制图片至canvas
      canvas.drawImage(res.tempFilePaths[0], 0, 0, 100, 100)
      console.log(canvas)
      // 绘制完成后执行回调，API 1.7.0
      canvas.draw(false, () => {
        console.log(123)
        // 2. 获取图像数据， API 1.9.0
        wx.canvasGetImageData({
          canvasId: 'canvas1',
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          success(res) {
            console.log(res)
            // 3. png编码
            let pngData = upng.encode([res.data.buffer], res.width, res.height)
            // 4. base64编码
            let base64 = wx.arrayBufferToBase64(pngData)
            console.log(base64)
          }
        })
      })
      // wx.saveFile({
      //   tempFilePath: res.tempFilePaths[0],
      //   success(res) {
      //     console.log(res.savedFilePath)
      //     wx.request({
      //       url: res.savedFilePath,
      //       method: 'get',
      //       responseType: 'arraybuffer',
      //       success(data) {
      //         console.log(data)
      //         let base64 = wx.arrayBufferToBase64(data.data);
      //         callback && callback(base64);
      //         wx.getSavedFileList({
      //           success: function (res) {
      //             res.fileList.forEach((i, index) => {
      //               wx.removeSavedFile({
      //                 filePath: i.filePath,
      //               })
      //             })
      //           }
      //         })
      //       }
      //     })
      //   }
      // })
    }
  })
}