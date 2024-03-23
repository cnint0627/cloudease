// pages/mood/mood.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight:app.globalData.navHeight,
    date:app.globalData.date,
    currentDate:null,
    currentCalendarRecord:null,
    valueContent:'',
    showDiary:false,
    // 上传图片临时路径
    tempFiles:[]
  },

  // 选择图片上传
  chooseImage(){
    var that=this
    wx.chooseMedia({
      mediaType:["image"],
      sizeType:["compressed"],
      success(res){
        that.data.tempFiles=res.tempFiles
      }
    })
  },

  // 保存日记
  saveDiary(){
    wx.showLoading({
      title:"正在上传日记~"
    })
    wx.cloud.callFunction({
    name:"uploadDiary",
    data:{
      openid:app.globalData.openid,
      diary:this.data.valueContent,
      date:this.data.currentDate,
      images:this.data.tempFiles
    },
    complete:res=>{
      console.log(res)
      //更新当前页面mood.js数据
      this.setData({
        currentCalendarRecord:res.result.currentCalendarRecord,
      })
      var pages=getCurrentPages()
      var prevPage=pages[pages.length-2]
      var calendarRecord=prevPage.data.calendarRecord
      calendarRecord[this.data.currentDate]=this.data.currentCalendarRecord
      //更新上个界面（calendar.js)页面数据，避免出现数据不同步
      prevPage.setData({
        calendarRecord:calendarRecord
      })
      wx.hideLoading()
      wx.showToast({
        title: '上传成功',
        icon:"success",
        duration:2000
      })
    }
  })
  },

  

  //返回上一层级
  bindBack(){
    if(this.data.showDiary){
      if(this.data.valueContent==this.data.currentCalendarRecord.diary)
      {
        this.setData({
          showDiary:false
        })
      }else{
        var that=this
        wx.showModal({
          title: '温馨提示',
          content: '日记尚未保存，确定要退出吗？',
          success (res) {
            if (res.confirm) {
              that.setData({
                showDiary:false
              })
            } else if (res.cancel) {
              
            }
          }
        })
      }
    }else{
      wx.navigateBack()
    }
  },

  bindWriteDiary(){
    this.setData({
      valueContent:this.data.currentCalendarRecord.diary?this.data.currentCalendarRecord.diary:'',
      showDiary:true,
    })
    // wx.enableAlertBeforeUnload({
    //   message: "日记尚未保存，确定要退出吗？\n",
    //   success: function (res) {},
    //   fail: function (err) {console.log("失败：", err)},})
  },

  refreshValueContent(e){
    this.setData({
      valueContent:e.detail.value
    })
  },
  //   if(!e.detail.value.textDiary){
  //     wx.showToast({
  //       title: '日记不能为空哦',
  //       icon:"error",
  //       duration:2000
  //     })
  //     return
  //   }
  //   wx.cloud.callFunction({
  //     name:"uploadDiary",
  //     data:{
  //       openid:app.globalData.openid,
  //       diary:e.detail.value.textDiary,
  //       date:app.globalData.date.date
  //     },
  //     complete:res=>{
  //       //更新当前页面mood.js数据
  //       this.setData({
  //         currentCalendarRecord:res.result.currentCalendarRecord,
  //         valueDiary:''
  //       })
  //       var pages=getCurrentPages()
  //       var prevPage=pages[pages.length-2]
  //       var calendarRecord=prevPage.data.calendarRecord
  //       calendarRecord[this.data.currentDate.date]=this.data.currentCalendarRecord
  //       //更新上个界面（calendar.js)页面数据，避免出现数据不同步
  //       prevPage.setData({
  //         calendarRecord:calendarRecord
  //       })
  //     }
  //   })
  //   wx.showToast({
  //     title: '发表成功！',
  //     icon: "success",
  //     duration:2000
  //   })
   

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var pages=getCurrentPages()
    var prevPage=pages[pages.length-2]
    var currentCalendarRecord=prevPage.data.calendarRecord[options.date]
    this.setData({
      currentDate:options.date,
      currentCalendarRecord:currentCalendarRecord
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
    if(this.data.showDiary){
      wx.hideHomeButton()
    }
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