// pages/Space/Space.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgList: []
  },
  onShow() {
    this.sendrequest();
  },
  sendrequest() {
    var that = this;
    wx.request({
      url: 'http://47.103.218.55:8077/fss/files/fileList',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        Authorization: 'Bearar ' + getApp().globalData.token,
      },
      data: {
        uid: getApp().globalData.uid,
        fileType: 'jpg'
      },
      success(res) {
        console.log(res)
        that.setData({
          ImgList: res.data.data
        })
      }
    })
  },
  preview(e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.src]
    });
  },
  upload(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        wx.uploadFile({
          url: 'http://47.103.218.55:8077/fss/files/upload',
          filePath: res.tempFiles[0].path,
          name: 'file',
          header: {
            Authorization: 'Bearar ' + getApp().globalData.token,
          },
          formData: {
            fileName: 'img.jpg',
            uid: getApp().globalData.uid,
          },
          success: function (res) {
            that.sendrequest();
            console.log(JSON.parse(res.data).message)
            if ("Maximum upload size exceeded; nested exception is java.lang.IllegalStateException: org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException: The field file exceeds its maximum permitted size of 1048576 bytes." === JSON.parse(res.data).message) {
              wx.showToast({
                title: '文件过大，上传失败！',
                icon: 'none'
              })
            } else if (JSON.parse(res.data).message === "上传成功") {
              wx.showToast({
                title: '上传成功',
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: JSON.parse(res.data).message + '，目前仅支持jpg、jpeg、png格式图片',
                icon: 'none'
              })
            }

          },
          fail: function () {
            console.log("fail");
          }
        });
      }
    })
  },
  delete(e) {
    var that = this;
    console.log(that.data.ImgList[e.currentTarget.dataset.index]);
    wx.showModal({
      title: '是否删除？',
      content: '请选择',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'http://47.103.218.55:8077/fss/files/deleteFile',
            method: 'GET',
            header: {
              'content-type': 'application/json',
              Authorization: 'Bearar ' + getApp().globalData.token,
            },
            data: {
              uid: getApp().globalData.uid,
              filePath: that.data.ImgList[e.currentTarget.dataset.index].filePath
            },
            success(res) {
              console.log(res)
              that.sendrequest();
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})