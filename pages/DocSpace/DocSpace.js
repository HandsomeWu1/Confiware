Page({
  data: {
    File: '',
    FileName: '',
    ResFiles: []
  },
  onShow() {
    this.getrequest();
  },
  getrequest(){
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
        fileType: 'docx'
      },
      success(res) {
        console.log(res)
        that.setData({
          ResFiles: res.data.data
        })
      }
    })
  },
  GoToDoc(e) {
    console.log(e)
    var that = this;
    var FileIndex = e.currentTarget.dataset.index;
    wx.downloadFile({
      url: that.data.ResFiles[FileIndex].fileUrl,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log(res)
            console.log('打开文档成功')
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }
    })
  },
  AddNewFile() {
    var that = this;
    wx.chooseMessageFile({
      count: 10,
      type: 'all',
      success(res) {
        console.log(res)
        that.setData({
          File: res.tempFiles[0]
        })
      }
    })
  },
  upload() {
    console.log("上传事件");
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success(res) {
        console.log(res.tempFiles[0].name)
        that.setData({
          FileName: res.tempFiles[0].name
        })

        wx.uploadFile({
          url: 'http://47.103.218.55:8077/fss/files/upload',
          filePath: res.tempFiles[0].path,
          name: 'file',
          header: {
            Authorization: 'Bearar ' + getApp().globalData.token,
          },
          formData: {
            fileName: that.data.FileName,
            uid: getApp().globalData.uid,
            // file: res.tempFiles[0].path 
          },
          success: function (res) {
            that.getrequest();
            console.log(res)
          },
          fail: function () {
            console.log("fail");
          }
        });
      }
    });
  },
  delete(e) {
    var that = this;
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
              filePath: that.data.ResFiles[e.currentTarget.dataset.index].filePath
            },
            success(res) {
              that.getrequest();
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})