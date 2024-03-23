// pages/setting/setting.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: app.globalData.navHeight,
    openid: app.globalData.openid,
    userInfo: app.globalData.userInfo,
    tweetList:[],
    switchChecked:app.globalData.userInfo.dangerWarning,
    avatar:app.globalData.avatar
  },

  bindNav(){
    console.log(111)
    wx.navigateTo({
      url: 'pages/myPlane/myPlane',
    })
  },

  switchChange(e){
    wx.cloud.callFunction({
      name:"setDangerWarning",
      data:{
        value:e.detail.value,
        openid:app.globalData.openid
      },
      complete:res=>{
        console.log(res)
      }
    })
  },


  // 推文设置
  bindSetTweet(){
    console.log(1)
  },

  bindChangeNickname() {
    wx.showModal({
      title: '修改昵称',
      content: '',
      editable: true,
      placeholderText: '输入新的昵称（长度3-10个字符）',
      complete: (res) => {
        if (res.confirm) {
          var content = res.content
          if (content.length < 3 || content.length > 10) {
            wx.showToast({
              title: '长度3-10个字符',
              icon: "error",
              duration: 2000
            })
            return
          }
          wx.showLoading({
            title: '加载中',
          })
          wx.cloud.callFunction({
            name: "changeUserInfo",
            data: {
              openid: app.globalData.openid,
              userInfo: {
                "avatar": app.globalData.userInfo.avatar,
                "nickname": content
              },
            },
            complete: res => {
              wx.hideLoading()
              app.globalData.userInfo.nickname = content
              this.setData({
                userInfo: {
                  "avatar": app.globalData.userInfo.avatar,
                  "nickname": content
                },
              })
              wx.showToast({
                title: '修改成功',
                icon: "success",
                duration: 2000
              })
            }

          })
        }
      }
    })
  },

  bindChangeAvatar() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      success: chooseResult => {
        wx.showLoading({
          title: '上传中',
        })
        if(chooseResult.tempFiles[0].size>1024*1024){
        wx.compressImage({
          src: chooseResult.tempFilePaths[0],
          quality: 1
        }).then(res => {
          that.uploadAvatar(res.tempFilePath)
        })
      }else{
        that.uploadAvatar(chooseResult.tempFilePaths[0])
      }

      },
    });

  },

  uploadAvatar(filePath){
    let that=this
    wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: 'avatars/' + app.globalData.openid +'/'+ Date.now() + '.png',
      filePath: filePath
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '上传成功',
        icon: "success",
        duration: 2000
      })
      app.globalData.userInfo.avatar = res.fileID
      app.globalData.avatar=filePath
      console.log(app.globalData.avatar)
      that.setData({
        avatar:filePath,
        userInfo: {
          nickname: that.data.userInfo.nickname,
          avatar: res.fileID
        }
      })
      wx.cloud.callFunction({
        name: "changeUserInfo",
        data: {
          openid: app.globalData.openid,
          userInfo: that.data.userInfo
        },
        success: res => {
          console.log("头像修改成功")
        }
      })
    }).catch((e) => {
      console.log(e);
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that=this
    wx.cloud.callFunction({
      name:"getTweet",
      success:res=>{
        that.setData({
          tweetList:res.result.tweet
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().setData({
      showRedDot:app.globalData.showRedDot
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})