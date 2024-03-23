const app=getApp()
Page({
  data:{
    messages:[],  //messages:[{userMsg:"",AIMsg:""},...]
    dataMessages:[
      {"role":"user","content":"请扮演一名心理咨询师，直接给出建议"},
      {"role":"assistant","content":"请问你有什么困惑或者烦恼呢？"}
    ],  //dataMessages:[{role:"",content:""},...]
    valueMsg:'',
    isSend:false,  //用来判断是否发送消息，以便禁用按钮
    navHeight:app.globalData.navHeight,
    byPass:app.globalData.byPass
  },

    //返回上一层级
    bindBack(){
      wx.navigateBack()
    },
  formSubmit(e){
    if(e.detail.value.textMsg==''){
      wx.showToast({
        icon:"error",
        title: '不能发送空内容',
        duration:2000
      })
      return
    }
    if(this.data.messages.length>0){
     this.setData({
       messages:[]
     }) 
    }
    var messages=this.data.messages
    var userMsg=e.detail.value.textMsg
    var dataMessages=JSON.parse(JSON.stringify(this.data.dataMessages))
    messages.push({"userMsg":userMsg})
    dataMessages.push({"role":"user","content":userMsg})
    this.setData({
      isSend:true,
      messages:messages,
      valueMsg:''
    })
    wx.request({
      url: "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=bxZYGpguMnIT2KVOAyYVOczZ&client_secret=2qo1FtYyeUoL1GMRXGiHYhudFznKSP3a",
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data:{},
      success:res=>{
        console.log(dataMessages)
        let accessToken=res.data.access_token
        wx.cloud.callFunction({
          name:"AIChatController",
          data:{
            openid:app.globalData.openid,
            dataMessages:dataMessages,
            accessToken:accessToken
          },
          complete:res=>{
            console.log(res)
            messages[messages.length-1]["AIMsg"]=res.result.AIMsg
            this.setData({
              messages:messages,
              isSend:false
            })
            // const box = document.querySelector('.chat-container');
            // box.scrollTo(0, box.scrollHeight - box.clientHeight);  //最底部   
          }
        })
      },
    });
    
    // var messages=this.data.messages
    // messages.push({
    //   userMsg:e.detail.value.textMsg,
    // })
    // this.setData({
    //   messages:messages,
    //   valueMsg:'',
    //   isSend:true
    // })
    // this.sendMsg(e.detail.value.textMsg)
    // //this.sendMsg("你是谁")
    // //this.sendMsg("你好")
  },

  onLoad: function () {

  },
 
  //向AI提问并获取回复
  sendMsg(userMsg){ 
    console.log("发起请求")
    wx.request({
      url: "https://luckycola.com.cn/ai/openwxyy",
      method: "POST",
      data:{
          // 用户提问消息
          "ques": userMsg,
          // 官网-个人中心-Appkey获取
          "appKey": "656079ec6b75986f600e40e2",
          // 官网-个人中心-用户ID
          "uid": "SqJRqj17008214668592xrimDbJ6v",
          // 是否支持上下文 值1表示支持,0表示不支持
          "isLongChat": 1
      },
      success:res=>{
          console.log(res)
          var messages=this.data.messages
          messages[messages.length-1]["AIMsg"]=res.data.data.result

          this.setData({
            messages:messages,
            isSend:false
          })
      },
    });
  }
});