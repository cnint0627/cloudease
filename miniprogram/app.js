// app.js
App({
  globalData:{
    openid:null,
    date:null,
    navHeight:null,
    navTop:null,
    navObj:null,
    navObjWid:null,
    sentence:null,
    indexBgPath:null,
    communityBgPath:null,
    selected:0,
    windowHeight:null,
    userInfo:null,
    weather:null,
    notification:null,
    showRedDot:0,
    avatar:-1,
    byPass:"hust"
  },
  onInit(){
    var that=this
    wx.cloud.callFunction({
      name:"initApp",
      complete:res=>{
        wx.request({
          url: 'https://restapi.amap.com/v3/ip?key=002c00495bab3431994a9fe4fcee7882',
          success:res=>{
            console.log(res.data.adcode)
            if(Array.isArray(res.data.adcode)){
              res.data.adcode=res.data.adcode[0]
            }
            wx.request({
              url: 'https://restapi.amap.com/v3/weather/weatherInfo?key=002c00495bab3431994a9fe4fcee7882&city='+res.data.adcode,
              success:res=>{
                console.log(res)
                that.globalData.weather=res.data.lives[0]
                if(!that.globalData.weather){
                  that.globalData.weather=1
                }
              },
              fail:res=>{
                that.globalData.weather=1
              }
            })
          },
          fail:res=>{
            that.globalData.weather=1
          }
        })
      
        that.globalData.userInfo=res.result.userInfo
        that.globalData.openid=res.result.openid
        that.globalData.date=res.result.date
        that.globalData.sentence=res.result.sentence
        that.globalData.notification=res.result.notification
        console.log(res)
        console.log("OPENID:",res.result.openid)
        //用户头像预加载
        if(that.globalData.userInfo.avatar){
          console.log("预加载头像")

          wx.getImageInfo({
            src: that.globalData.userInfo.avatar,
            success: res=> {
              that.globalData.avatar=res.path
            }
          })
          
        }else{
          that.globalData.avatar=null
        }
        if(JSON.stringify(that.globalData.notification)!=JSON.stringify({'p':0})){
          // 有新评论提醒
          let count=0
          for(let i in that.globalData.notification){
            count+=that.globalData.notification[i]
          }
          console.log("有新提醒，数量为",count)
          that.globalData.showRedDot=count
        }
        //初始化成功则调用回调函数，指示launch页跳转到首页
        if(that.globalData.openid && that.globalData.date){
          
        }
        //初始化失败则再次初始化
        else{
          that.onInit()
        }
      }
    })
  },
  onLaunch: function () {
    var that=this
    //#if ANDROID
    wx.weixinMiniProgramLogin({
      redirectPath: '/pages/launch/launch',
      success (res) {
        if (res.code) {
          console.log("登陆成功")
          that.login()
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    //#elif IOS
    wx.weixinMiniProgramLogin({
      redirectPath: 'pages/launch/launch',
      success (res) {
        if (res.code) {
          console.log("登陆成功")
          that.login()
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    //#else
    this.login()
    //#endif
  },

  login(){
    var that=this
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      let menuButtonObject = wx.getMenuButtonBoundingClientRect();
      wx.getSystemInfo({
         success: res => {
           //导航高度
           let statusBarHeight = res.statusBarHeight,
             navTop = menuButtonObject.top,
             navObjWid = res.windowWidth - menuButtonObject.right + menuButtonObject.width, // 胶囊按钮与右侧的距离 = windowWidth - right+胶囊宽度
             navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
             that.globalData.navHeight = navHeight; //导航栏总体高度
             that.globalData.navTop = navTop; //胶囊距离顶部距离
             that.globalData.navObj = menuButtonObject.height; //胶囊高度
             that.globalData.navObjWid = navObjWid; //胶囊宽度(包括右边距离)
           // console.log(navHeight,navTop,menuButtonObject.height,navObjWid)
           that.globalData.windowHeight=res.windowHeight
         },
         fail(err) {
           console.log(err);
         }
       })

      
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）

        appid: 'wx1b6f8c5a8fbdf642',
        env: 'cloud1-9g1sdvdke7c6e645',
        traceUser: true,
      });
      console.log("初始化云函数")
      
      //首页图片预加载
      wx.getImageInfo({
        src: 'cloud://cloud1-9g1sdvdke7c6e645.636c-cloud1-9g1sdvdke7c6e645-1322592749/indexBackgroundImages/ ('+(Math.floor(Math.random()*25)+1).toString()+').jpg',
        success: res=> {
          that.globalData.indexBgPath=res.path
          console.log(res)
        }
       }) 

      //社区背景图预加载
      // wx.getImageInfo({
      //   src: 'cloud://cloud1-9g1sdvdke7c6e645.636c-cloud1-9g1sdvdke7c6e645-1322592749/communityBackgroundImages/bg-plane.png',
      //   success: res=> {
      //     that.globalData.communityBgPath=res.path
          
      //   }
      //  })


       
      

       that.onInit()
      var t=setInterval(function(){
        if(that.globalData.openid && that.globalData.date && that.globalData.indexBgPath && that.globalData.userInfo && that.globalData.weather && that.globalData.avatar!=-1){
          clearInterval(t)
          that.checkLoginReadyCallback()
        }
      },100)
    }
  }

    
    

  }
);
