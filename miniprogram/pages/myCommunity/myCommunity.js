// pages/myCommunity/myCommunity.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight:app.globalData.navHeight,
    myPost:null,
    notification:app.globalData.notification
  },

  bindClearNotification(e){
    let index=e.currentTarget.dataset.index
    if(app.globalData.notification[index]){
      app.globalData.showRedDot-=app.globalData.notification[index]
      delete app.globalData.notification[index]
    }
    let notification=app.globalData.notification
    this.setData({
      notification:notification
    })
  },

  //返回上一层级
  bindBack(){
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:"initMyCommunity",
      data:{
        openid:app.globalData.openid
      },
      complete:res=>{
        this.setData({
          myPost:res.result.myPost
        })
        wx.hideLoading()
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