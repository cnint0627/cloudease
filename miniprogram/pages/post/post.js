// pages/post/post.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:null,
    post:null,
    isPostOwner:false,   //该帖子所有人是否是自己
    isDelete:false,  //是否点击删除按钮
    isComment:false, //是否点击发表评论按钮
    isCommentOwner:[], //该评论所有人是否是自己
    valueContent:'',
    navHeight:app.globalData.navHeight,
    topBarData:{
      canBack:true
    }

  },


  bindDeletePost:function(e){
    console.log("删除中")
    this.setData({
      isDelete:true
    })
    wx.cloud.callFunction({
      name:"deletePost",
      data:{
        openid:app.globalData.openid,
        index:this.data.index
      },
      complete:res=>{
        console.log("删除成功")
        //删除成功后跳转到社区页面
        wx.switchTab({
          url: '/pages/community/community',
        })
        wx.showToast({
          title: '删除成功',
          icon:"success",
          duration:2000,
        })
      }
    })
  },

  bindCommentPost:function(e){
    console.log("发表评论")
    this.setData({
      isComment:true
    })
    wx.cloud.callFunction({
      name:"commentPost",
      data:{
        openid:app.globalData.openid,
        index:this.data.index,
        content:e.detail.value.content
      },
      complete:res=>{
        console.log("发表评论成功！")

        wx.showToast({
          title: '发表成功',
          icon:"success",
          duration:2000,
        })

        //刷新页面
        var isCommentOwner=[]
        //判断评论是否是自己的，若是自己的则显示删除按钮
        for(let i=0;i<res.result.post[this.data.index].comment.length;i++){
          isCommentOwner.push(res.result.userComment[this.data.index].indexOf(i)!=-1)
        }
        this.setData({
          valueContent:'',
          isComment:false,
          isCommentOwner:isCommentOwner,
          post:res.result.post[this.data.index]
        })
      }
    })
  },

  bindDeleteComment:function(e){
    console.log("删除评论")
    wx.cloud.callFunction({
      name:"deleteComment",
      data:{
        openid:app.globalData.openid,
        postIndex:this.data.index,
        commentIndex:e.currentTarget.dataset.index
      },
      complete:res=>{
        console.log("删除成功！")
        wx.showToast({
          title: '删除成功',
          icon:"success",
          duration:2000,
        })

        //刷新页面
        var isCommentOwner=[]
        //判断评论是否是自己的，若是自己的则显示删除按钮
        for(let i=0;i<res.result.post[this.data.index].comment.length;i++){
          isCommentOwner.push(res.result.userComment[this.data.index].indexOf(i)!=-1)
        }
        this.setData({
          valueContent:'',
          isComment:false,
          isCommentOwner:isCommentOwner,
          post:res.result.post[this.data.index]
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //初始化从community页面data中获取post内容
    var pages=getCurrentPages()
    var prevPage=pages[pages.length-2]
    var isCommentOwner=[]
    //判断评论是否是自己的，若是自己的则显示删除按钮
    for(let i=0;i<prevPage.data.post[options.index].comment.length;i++){
      try{
      isCommentOwner.push(prevPage.data.userComment[options.index].indexOf(i)!=-1)
      }catch{
        isCommentOwner.push(false)
      }
    }
    this.setData({
      index:options.index,
      post:prevPage.data.post[options.index],
      isPostOwner:prevPage.data.userPost.indexOf(parseInt(options.index))!=-1,
      isCommentOwner:isCommentOwner
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