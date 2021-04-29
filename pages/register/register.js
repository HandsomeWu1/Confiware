// pages/add/add.js
const cfg = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCamera: false,
    src: '',
    username: '',
    password: ''
  },

  // 用户名输入
  bindInputUser(e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 密码输入
  bindInputPwd(e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 保存用户
  addUser(e) {
    var that = this;
    // if (that.data.username == '') {
    //   wx.showToast({
    //     title: '请输入用户名',
    //     icon: 'none',
    //     duration: 2000
    //   });
    //   return;
    // } else {
    // console.log(wx.getFileSystemManager().readFileSync(this.data.src, "base64"))
    if (that.data.src === "") {
      wx.showToast({
        title: '还未拍照！',
        icon: 'none'
      })
    } else {
      console.log(getApp().globalData.uid)
      wx.request({
        url: 'http://47.103.218.55:8077/fss/auth/addFace',
        method: 'POST',
        header: {
          'content-type': 'application/json',
          Authorization: 'Bearar ' + getApp().globalData.token,
        },
        data: {
          uid: getApp().globalData.uid,
          file: wx.getFileSystemManager().readFileSync(that.data.src, "base64")
        },
        success(res) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      })
    }
  },

  // 重拍
  reTakePhoto() {
    this.setData({
      isCamera: false
    });
  },

  // 拍照
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath,
          isCamera: true
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '拍照错误',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  error(e) {
    wx.showToast({
      title: '请允许小程序使用摄像头',
      icon: 'none',
      duration: 2000
    });
  }

})