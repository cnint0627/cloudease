// pages/community/community.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post:null,
    userPost:null,
    sortArray:["请选择","学习","情感","家庭"]
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
    wx.showLoading({
      title: '加载中',
    })
    //初始化，获取社区post列表
    wx.cloud.callFunction({
      name:"initCommunity",
      data:{
        openid:app.globalData.openid
      },
      complete:res=>{
        this.setData({
          post:res.result.post,
          userPost:res.result.userPost,
          userComment:res.result.userComment
        })
        wx.hideLoading()
      }
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