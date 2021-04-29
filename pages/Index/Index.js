// const app = getApp();
// Page({
//   data: {
//     isfirst: '',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserProfile')
//   },
//   onLoad() {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse) {
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserProfile({
//         success: res => {
//           console.log(res)
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//     var that = this;
//     wx.login({
//       success(res) {
//         console.log(res)
//         // if (res.code) {
//         //   //发起网络请求
//         //   wx.request({
//         //     // url: 'http://47.103.218.55:8077/fss/auth/login',
//         //     // method: 'POST',
//         //     url: 'http://192.168.1.111:8080/user/index',
//         //     method: 'GET',
//         //     header: {
//         //       'content-type': 'application/json'
//         //     },
//         //     data: {
//         //       code: res.code
//         //     },
//         //     success(res) {
//         //       console.log(res)
//         //       that.setData({
//         //         isfirst: res.data.data.isFirstLogin
//         //       })
//         //       getApp().globalData.uid = res.data.data.uid;
//         //       getApp().globalData.token = res.data.data.token;
//         //     }
//         //   })
//         // } else {
//         //   console.log('登录失败！' + res.errMsg)
//         // }
//       }
//     })
//   },
//   getUserInfo(e) {
//     wx.getUserProfile({
//       success:res=>{
//         console.log(res)
//       }
//     })
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   },
//   Login() {
//     console.log(this.data.isfirst)
//     if (this.data.isfirst === false) {
//       wx.navigateTo({
//         url: '../Login/Login'
//       })
//     } else {
//       wx.navigateTo({
//         url: '../register/register'
//       })
//     }
//   }
// })

// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '点击头像进入小程序',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        console.log('获取到了！！！！！！！！')
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  Login() {
    console.log(this.data.isfirst)
    if (this.data.isfirst === false) {
      wx.navigateTo({
        url: '../Login/Login'
      })
    } else {
      wx.navigateTo({
        url: '../register/register'
      })
    }
  }
})
