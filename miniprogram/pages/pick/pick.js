// pages/pick/pick.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:app.globalData.userInfo,
    openid:app.globalData.openid,
    navHeight:app.globalData.navHeight,
    isThrow:false,
    isAvailable:false,
    post:null,
    postIndex:null,
    postList:[],
    postListIndex:0,
    slideStart:null,
    valueContent:'',
    avatar:app.globalData.avatar,
    byPass:app.globalData.byPass
  },

  //返回上一层级
  bindBack(){
    wx.navigateBack()
  },

  pickPrev(){
    if(this.data.postListIndex!=0){
      this.setData({
        postListIndex:this.data.postListIndex-1,
        post:this.data.postList[this.data.postListIndex-1].post,
        postIndex:this.data.postList[this.data.postListIndex-1].postIndex,
        valueContent:'',
        isAvailable:false
      })
    }
  },

  pickNext(){
    if(this.data.postListIndex==this.data.postList.length-1 || this.data.postList.length==0){
      console.log("refresh")
      this.setData({
        post:null,
        postIndex:null,
        valueContent:'',
        isAvailable:false
      })
      this.onLoad()
    }
    else{
      this.setData({
        postListIndex:this.data.postListIndex+1,
        post:this.data.postList[this.data.postListIndex+1].post,
        postIndex:this.data.postList[this.data.postListIndex+1].postIndex,
        valueContent:'',
      })
    }
  },

  bindSlideStart(e){
    this.setData({
      slideStart:e.changedTouches[0].pageX
    })
    
  },
  bindSlideEnd(e){
    //向右滑，查看前一个
    if(e.changedTouches[0].pageX-this.data.slideStart>=150){
      this.pickPrev()
    }
    //向左滑，查看下一个（若当前已是最后一个，则重新随机捡一个纸飞机）
    if(e.changedTouches[0].pageX-this.data.slideStart<=-150){
      this.pickNext()
    }
    
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

  throwComment(e){
    var content=e.detail.value.content
    this.setData({
      isThrow:true
    })
    wx.cloud.callFunction({
      name:'sendSubscribeMsg',
      data:{
        openid:this.data.post.openid,
        plane:this.data.post.content.length>20?this.data.post.content.substr(17)+'...':this.data.post.content,
        comment:content.length>20?content.substr(17)+'...':content,
      },
      complete:res=>{
        console.log(res)
      }
    })
    wx.cloud.callFunction({
      name:"commentPost",
      data:{
        openid:app.globalData.openid,
        content:content,
        index:this.data.postIndex,
        userInfo:app.globalData.userInfo,
      },
      complete:res=>{
        wx.showToast({
          title: '回复成功~',
          icon:"success",
          duration:2000
        })
        //回复成功后显示其他人评论
        var postList=this.data.postList
        for(let i=0;i<postList.length;i++){
          if(postList[i].postIndex==this.data.postIndex){
            postList[i].post=res.result.post
            postList[i].showComment=true
          }
        }
        this.setData({
          post:res.result.post,
          postList:postList,
          isThrow:false,
          valueContent:'',
          isAvailable:false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      avatar:app.globalData.avatar,
      userInfo:app.globalData.userInfo
    })
    //初始化，随机捡起一个纸飞机
    wx.cloud.callFunction({
      name:"initCommunity",
      data:{
        //为了避免捡到自己的飞机
        openid:app.globalData.openid,
      },
      complete:res=>{
        var postList=this.data.postList
        if(res.result.post!=null){
          postList.push({
            post:res.result.post,
            postIndex:res.result.postIndex,
            showComment:res.result.showComment
          })
        }
        this.setData({
          post:res.result.post,
          postIndex:res.result.post!=null?res.result.postIndex:-1,
          postList:postList,
          postListIndex:postList.length-1,
          valueContent:'',
          isAvailable:false
        })
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