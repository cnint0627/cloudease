// pages/myPlane/myPlane.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:app.globalData.userInfo,
    navHeight:app.globalData.navHeight,
    myPost:null,
    index:null,
    isThrow:false,
    isAvailable:false,
    valueContent:'',
    avatar:app.globalData.avatar,
    byPass:app.globalData.byPass
  },

  //返回上一层级
  bindBack(){
    wx.navigateBack()
  },
  refreshValueContent:function(e){
    var len=e.detail.value.length
    console.log(len)
    if(len>=15 && !this.data.isAvailable){
      this.setData({
        isAvailable:true
      })
    }
    if(len<15 && this.data.isAvailable){
      this.setData({
        isAvailable:false
      })
    }
  },

  throwComment(e){
    var content=e.detail.value.content
    this.setData({
      isThrow:true
    })
    wx.cloud.callFunction({
      name:"commentPost",
      data:{
        openid:app.globalData.openid,
        content:content,
        index:this.data.index,
        userInfo:app.globalData.userInfo,
      },
      complete:res=>{
        wx.showToast({
          title: '回复成功~',
          icon:"success",
          duration:2000
        })
        this.setData({
          myPost:res.result.post,
          isThrow:false,
          valueContent:'',
          isAvailable:false
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      avatar:app.globalData.avatar
    })
    wx.cloud.callFunction({
      name:"initCommunity",
      data:{
        openid:app.globalData.openid,
        index:options.index,
        option:1
      },
      complete:res=>{
        this.setData({
          myPost:res.result.post,
          index:options.index
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