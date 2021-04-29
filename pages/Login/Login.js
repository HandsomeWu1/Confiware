// pages/home/home.js
const cfg = require('../../utils/config.js');
const moment = require('../../utils/moment.min.js');

Page({
    data: {
        isCamera: false,
        isSuccess: true,
        src: '',
        userinfo: null,
        response: "123",
        left: '90',
        right: '90',
        isSuccess: ''
    },

    onLoad: function () {},
    onShow: function () {
        this.setData({
            isCamera: false,
            userinfo: null,
        });
    },
    onHide: function () {
        this.setData({
            isCamera: true
        });
    },
    // 登录
    login(e) {
        // wx.showLoading({
        //     title: '正在登录',
        //     duration: 2000
        // })
        this.takePhoto();
    },

    //请求登录
    requestLogin() {
        let that = this;
        wx.request({
            url: 'http://47.103.218.55:8077/fss/auth/compareFace',
            method: 'POST',
            header: {
                'content-type': 'application/json',
                Authorization: 'Bearar ' + getApp().globalData.token,
            },
            data: {
                uid: getApp().globalData.uid,
                file: wx.getFileSystemManager().readFileSync(this.data.src, "base64")
            },
            success(res) {
                console.log(res)
                that.setData({
                    response: res.data.message
                })
                if (res.data.message != '对比成功'){
                    wx.showToast({
                        title: res.data.message,
                        icon: 'none'
                    })
                }else if(res.data.data<0.9){
                    wx.showToast({
                        title: '相似度过低',
                        icon: 'none'
                    })
                }
                if (res.data.message === '对比成功' && res.data.data>=0.9) {
                    that.setData({
                        isSuccess: true,
                        left: parseInt(Math.random() * 10) + 85,
                        right: parseInt(Math.random() * 12) + 83
                    })
                    var context = wx.createCanvasContext('firstCanvas')
                    context.drawImage(that.data.src, 50, 90, 50, 25, 0, 0, 80, 40)
                    context.draw()
                    var context2 = wx.createCanvasContext('secondCanvas')
                    context2.drawImage(that.data.src, 120, 90, 50, 25, 0, 0, 80, 40)
                    context2.draw()
                } else {
                    that.setData({
                        isSuccess: false
                    })
                }
            },
            fail(res) {
                that.setData({
                    response: res.data.message
                })
                wx.showToast({
                    title: res.data.message,
                    icon: 'none'
                })
            }
        })
    },
    //临时版
    // requestLogin() {
    //         that.setData({
    //             isSuccess: true,
    //             left: parseInt(Math.random() * 10) + 85,
    //             right: parseInt(Math.random() * 12) + 83
    //         })
    //         var context = wx.createCanvasContext('firstCanvas')
    //         context.drawImage(that.data.src, 50, 90, 50, 25, 0, 0, 80, 40)
    //         context.draw()
    //         var context2 = wx.createCanvasContext('secondCanvas')
    //         context2.drawImage(that.data.src, 120, 90, 50, 25, 0, 0, 80, 40)
    //         context2.draw()
    //         that.setData({
    //             isSuccess: false
    //         })
    // },
    // 重新登录
    relogin() {
        this.setData({
            isCamera: false
        })

    },
    LoginSuccess(e) {
        wx.navigateTo({
            url: '../User/User',
        })
    },
    // 拍照
    takePhoto() {
        let that = this;
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
            quality: 'high',
            success: (res) => {
                that.setData({
                    src: res.tempImagePath,
                    isCamera: true
                })
                that.requestLogin();
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
    },

    ImgToBase64(img) {
        wx.chooseImage({
            success: function (res) {
                console.log(wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64"))
            },
        })
    },

    canvasIdErrorCallback: function (e) {
        console.error(e.detail.errMsg)
    },
    onReady: function (e) {
        // 使用 wx.createContext 获取绘图上下文 context

    },
    register() {
        wx.navigateTo({
            url: '../register/register',
        })
    }


})