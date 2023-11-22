// pages/uploadPost.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortIndex:0,
    sortArray:["请选择","学习","情感","家庭"],
    valueTitle:'',
    valueContent:'',
    isUpload:false    //值为true时禁用上传按钮
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sortIndex: e.detail.value
    })
  },

  formSubmit:function(e){
    console.log("发布帖子")

    //检查帖子内容合法性
    if(!e.detail.value.sort){
      wx.showToast({
        title: '请选择帖子分类',
        icon:"error",
        duration:2000,
      })
      return
    }
    if(e.detail.value.title.length<3){
      wx.showToast({
        title: '标题不少于3字',
        icon:"error",
        duration:2000,
        
      })
      return
    }
    if(e.detail.value.content.length<15){
      wx.showToast({
        title: '内容不少于15字',
        icon:"error",
        duration:2000,
      })
      return
    }

    //禁用发布按钮，防止重复发布
    this.setData({
      isUpload:true
    })
    
    wx.cloud.callFunction({
      name:"uploadPost",
      data:{
        openid:app.globalData.openid,
        sort:e.detail.value.sort,
        title:e.detail.value.title,
        content:e.detail.value.content
      },
      complete:res=>{
        console.log(res)
        //发布成功后将表单清空
        this.setData({
          isUpload:false,
          sortIndex:0,
          valueTitle:'',
          valueContent:''
        })
        //发布成功后跳转到社区页面
        wx.switchTab({
          url: '/pages/community/community',
        })
        wx.showToast({
          title: '发布成功',
          icon:"success",
          duration:2000,
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