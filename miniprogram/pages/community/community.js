// pages/community/community.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight:app.globalData.navHeight,
    communityBgPath:app.globalData.communityBgPath,
    pageHeight:app.globalData.windowHeight,
    showRedDot:app.globalData.showRedDot,
    byPass:app.globalData.byPass
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
    this.setData({
      showRedDot:app.globalData.showRedDot
    })
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