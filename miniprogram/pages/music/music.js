// pages/music/music.js
const manager=wx.getBackgroundAudioManager()
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight:app.globalData.navHeight,
    tweetList:[]
  },

    //返回上一层级
    bindBack(){
      wx.navigateBack()
    },

  bindStartPlay(){
    manager.src="cloud://cloud1-9g1sdvdke7c6e645.636c-cloud1-9g1sdvdke7c6e645-1322592749/music/1.mp3"
    manager.title="123"
    // 解决暂停后重新播放问题
    manager.onPause()
    manager.play()
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