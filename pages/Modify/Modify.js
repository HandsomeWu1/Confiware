// pages/add/add.js
const cfg = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCamera: false,
    src: '',
    userInfo:{}
  },
  onLoad(){
    this.setData({
      userInfo:getApp().globalData.userInfo
    })
  },
  // 保存用户
  addUser(e) {
    {
      wx.showToast({
        title: '目前暂不支持重新录入',
        icon: 'none'
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