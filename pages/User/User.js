// pages/User/User.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },
  onLoad(){
    this.setData({
      userInfo:app.globalData.userInfo
    })
  },
  modify(e) {
    wx.navigateTo({
      url: '../Modify/Modify',
    })
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  GoInSpace(e) {
    console.log(e)
    if (e.currentTarget.dataset.name == '图像') {
      wx.navigateTo({
        url: '../ImgSpace/ImgSpace?name=' + e.currentTarget.dataset.name,
      })
    } else {
      wx.navigateTo({
        url: '../DocSpace/DocSpace?name=' + e.currentTarget.dataset.name,
      })
    }

  }
})