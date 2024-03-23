// pages/index/index.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isInit:app.globalData.openid?true:false,
      bgPath:app.globalData.indexBgPath,
      sentence:app.globalData.sentence,          //正能量语句
      date:app.globalData.date,//当前日期
      navHeight:app.globalData.navHeight,
      weather:app.globalData.weather
  },

  bindRequestSubscribe(){
    wx.requestSubscribeMessage({
      tmplIds: ['ZpBj0Snd4p7-PU2YblbLLLxKOwymBsS8FKLKGCjk-WA'],
      complete:res=>{
        console.log(res)
      }
    })
  },

  bindSend(){
    wx.cloud.callFunction({
      name:'sendSubscribeMsg',
      data:{
        openid:app.globalData.openid
      },
      complete:res=>{
        console.log(res)
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