// pages/throw/throw.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight:app.globalData.navHeight,
    isThrow:false,
    isAvailable:false,
  },

  //返回上一层级
  bindBack(){
    wx.navigateBack()
  },

  refreshValueContent:function(e){
    var len=e.detail.value.length
    if(len>=1 && !this.data.isAvailable){
      this.setData({
        isAvailable:true
      })
    }
    if(len<1 && this.data.isAvailable){
      this.setData({
        isAvailable:false
      })
    }
  },

  bindRequestSubscribeMsg(){
    console.log(1)
    wx.requestSubscribeMessage({
      tmplIds: ['ZpBj0Snd4p7-PU2YblbLLLxKOwymBsS8FKLKGCjk-WA'],
      complete:res=>{
        console.log(res)
        wx.navigateBack()
      }
    })
  },

  throwPlane(e){
    var content=e.detail.value.content
    var title=e.detail.value.title
    this.setData({
      isThrow:true
    })
    wx.cloud.callFunction({
      name:"uploadPost",
      data:{
        openid:app.globalData.openid,
        content:content,
        title:title
      },
      complete:res=>{
        wx.showToast({
          title: '投送成功~',
          icon:"success",
          duration:2000
        })
      }
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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