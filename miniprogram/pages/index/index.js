// pages/index/index.js
import { timestampToTime } from '../../utils/common/time.js'
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isInit:false,
      backgroundImage:null, //背景图
      sentence:null,        //正能量语句
      year:null,             //当前日期
      month:null,
      day:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:"initIndex",
      complete:res=>{
        var date=timestampToTime(res.result.date)
        this.setData({
          year:date.year,
          month:date.month,
          day:date.day,
          isInit:app.globalData.openid?true:false
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