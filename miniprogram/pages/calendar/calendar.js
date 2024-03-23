

// pages/calendar/calendar.js
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight:app.globalData.navHeight,
    date:app.globalData.date,
    dateStartEnd:[],
    currentDate:{
      year:app.globalData.date.year,
      month:app.globalData.date.month
    },
    dateStart:parseInt((parseInt(app.globalData.date.date)+1-app.globalData.date.week).toString().substr(-2)),
    weekArray:["周日","周一","周二","周三","周四","周五","周六"],
    emojiArray:Array.from({length: 7}, (v, i) => ++i),
    emojiDetail:['愉悦','生气','惊恐','害羞','委屈','平静','难过'],
    calendarRecord:{},
    showMoodModal:false,
    showReportInfoModal:false,
    animationBgData:null,
    animationData:null,
    days:[31,28,31,30,31,30,31,31,30,31,30,31],
    chosenDate:null,
    radarData: [0,0,0,0,0,0]

  },

  bindChangeDate(){
    wx.navigateTo({
      url: '/pages/changeDate/changeDate'
    })
  },

  bindDecreaseCurrentMonth(){
    var that=this
    var currentDate=that.data.currentDate
    if(currentDate.month==1){
      currentDate.month=12
      currentDate.year-=1
    }else{
      currentDate.month-=1
    }
    var date=new Date(currentDate.year.toString()+'-'+(currentDate.month<10?'0':'')+currentDate.month.toString()+'-01')
    currentDate.week=date.getDay()+1
    that.setData({
      currentDate:currentDate,
      days:Array.from({length:that.data.dayArray[currentDate.month-1]},(v,i)=>(i+1)),
    })
  },

  bindIncreaseCurrentMonth(){
    var that=this
    var currentDate=that.data.currentDate
    if(currentDate.month==12){
      currentDate.month=1
      currentDate.year+=1
    }else{
      currentDate.month+=1
    }
    var date=new Date(currentDate.year.toString()+'-'+(currentDate.month<10?'0':'')+currentDate.month.toString()+'-01')
    currentDate.week=date.getDay()+1
    that.setData({
      currentDate:currentDate,
      days:Array.from({length:that.data.dayArray[currentDate.month-1]},(v,i)=>(i+1)),
    })
  },

  fadeOutDlg:function(){
    var animation = wx.createAnimation({
      duration:200,
      timingFunction:'ease',
    })
    animation.opacity(0).scale(0.8, 0.8).step();
    this.setData({
      animationData:animation.export()
    })

    var animationBg = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease',
    })
    animationBg.opacity(0).step()
    this.setData({
      animationBgData: animationBg.export()
    })

    setTimeout(function(){
      this.setData({
        showMoodModal: false,
        showReportInfoModal:false
      })
    }.bind(this),200)
  },

  preventTouchMove: function() {
    //阻止触摸
  },

  uploadMood(e){
    wx.showLoading({
      title: '加载中',
    })
    var mood=e.currentTarget.dataset.index
    wx.cloud.callFunction({
      name:"uploadMood",
      data:{
        openid:app.globalData.openid,
        mood:mood,
        date:this.data.chosenDate
      },
      complete:res=>{
        this.fadeOutDlg()
        this.setData({
          calendarRecord:res.result.calendarRecord,
        })
        wx.showToast({
          title: '记录成功！',
          duration:2000
        })
        wx.hideLoading()
        this.initRadar()
      }
    })
  },

  bindShowReportInfo(e){
    this.setData({
      showReportInfoModal:true
    })
    //模态弹窗动画
    var animation = wx.createAnimation({
      duration:0,
      timingFunction:'step-start',
    })
    animation.opacity(0).scale(0.8,0.8).step();
    this.setData({
      animationData: animation.export()
    })
    animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease',
    })
    animation.opacity(1).scale(1,1).step()
    this.setData({
      animationData:animation.export()
    })

    var animationBg = wx.createAnimation({
      duration: 200,
      timingFunction: 'step-start',
    })
    animationBg.opacity(0).step()
    animationBg = wx.createAnimation({
      duration:500,
      timingFunction:'ease',
    })
    animationBg.opacity(0.5).step()
    this.setData({
      animationBgData:animationBg.export()
    })
  },

  bindRecordMood(e){
    var date=this.data.dateStartEnd[e.currentTarget.dataset.week]
    console.log(date)
    if(date<=parseInt(this.data.date.date)){
      this.setData({
        chosenDate:date
      })
      if(!this.data.calendarRecord[date]){
        this.setData({
          showMoodModal:true
        })

        //模态弹窗动画
        var animation = wx.createAnimation({
          duration:0,
          timingFunction:'step-start',
        })
        animation.opacity(0).scale(0.8,0.8).step();
        this.setData({
          animationData: animation.export()
        })
        animation = wx.createAnimation({
          duration: 200,
          timingFunction: 'ease',
        })
        animation.opacity(1).scale(1,1).step()
        this.setData({
          animationData:animation.export()
        })
    
        var animationBg = wx.createAnimation({
          duration: 200,
          timingFunction: 'step-start',
        })
        animationBg.opacity(0).step()
        animationBg = wx.createAnimation({
          duration:500,
          timingFunction:'ease',
        })
        animationBg.opacity(0.5).step()
        this.setData({
          animationBgData:animationBg.export()
        })
        // wx.showModal({
        //   title: '记录今日心情',
        //   content: '',
        //   editable:true,
        //   placeholderText:"今天心情如何？(^o^)/",
        //   complete: (res) => {  
        //     if (res.confirm) {
        //       if(!res.content){
        //         wx.showToast({
        //           title: '心情不能为空哦',
        //           icon:"error",
        //           duration:2000
        //         })
        //         return
        //       }
        //       wx.cloud.callFunction({
        //         name:"uploadMood",
        //         data:{
        //           openid:app.globalData.openid,
        //           mood:res.content,
        //           date:app.globalData.date.date
        //         },
        //         complete:res=>{
        //           this.setData({
        //             calendarRecord:res.result.calendarRecord,
        //             currentDate:date
        //           })
        //           wx.showToast({
        //             title: '记录成功！',
        //             duration:2000
        //           })
        //         }
        //       })
        //     }
        //   }
        // })
      }else{
        //若该日已经发表了心情，则进入详情页
        wx.navigateTo({
          url: '/pages/mood/mood?date='+date
        })
      }
  }else{
    wx.showToast({
      title: '这天还没到哦~',
      icon:"error",
      duration:2000
    })
  }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var days=this.data.days
    // ios兼容问题new Date()
    // 这个bug很隐蔽
    var date=new Date((app.globalData.date.year+'-'+app.globalData.date.month+'-01').replace(/-/g, "/"))
    var weekFirst=date.getDay()
    var dateStartEndArray=[]
    var currentDate=this.data.currentDate
    console.log(date,weekFirst)
    //先构造第一组日期区间
      if(weekFirst!=0){
        if(currentDate.month==1){
          var dateArray=[]
          for(let i=1;i<=7;i++){
            dateArray.push(parseInt(31-weekFirst+i>31?(currentDate.year+'010'+(-weekFirst+i)):((currentDate.year-1)+'12'+(31-weekFirst+i))))
          }
          dateStartEndArray.push(dateArray)
        }else{
          var dateArray=[]
          for(let i=1;i<=7;i++){
            dateArray.push(parseInt(days[currentDate.month-2]-weekFirst+i>days[currentDate.month-2]?(currentDate.year+(currentDate.month<10?'0':'')+currentDate.month+'0'+(i-weekFirst)):(currentDate.year+(currentDate.month-1<10?'0':'')+(currentDate.month-1)+(days[currentDate.month-2]-weekFirst+i))))
          }
          dateStartEndArray.push(dateArray)
        }
      }else{
        var dateArray=[]
        for(let i=1;i<=7;i++){
          dateArray.push(parseInt((currentDate.year+(currentDate.month<10?'0':'')+(currentDate.month)+'0'+i)))
        }
        dateStartEndArray.push(dateArray)
      }
      console.log(dateStartEndArray)
    //再构造余下的
      for(let i=0;;i++){
        var flag=false
        var base=dateArray[dateArray.length-1]
        dateArray=[]
        for(let j=1;j<=7;j++){
          if (parseInt((base+j).toString().substr(-2))>days[currentDate.month-1] && !flag){
            flag=true
            var k=1
          }
          if (flag){
            if(currentDate.month==12){
              dateArray.push(parseInt((currentDate.year+1)+'010'+(k++)))
            }else{
              dateArray.push(parseInt(currentDate.year+(currentDate+1<10?'0':'')+'0'+(currentDate.month+1)+'0'+(k++)))
            }
          }else{
            dateArray.push(base+j)
          }
        }
        dateStartEndArray.push(dateArray)
        if(flag || parseInt((dateArray[dateArray.length-1]).toString().substr(-2))==days[currentDate.month-1]){
          break
        }
      }
      for(let i=0;;i++){
        if(dateStartEndArray[i].indexOf(parseInt(app.globalData.date.date))!=-1){
          
          this.setData({
            dateStartEnd:dateStartEndArray[i]
          })
          break
        }
      }
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:"initCalendar",
      data:{
        openid:app.globalData.openid
      },
      complete:res=>{
        this.setData({
          calendarRecord:res.result.calendarRecord,
        })
        this.initRadar();
        wx.hideLoading()
      }
    })
  },

  // 初始化雷达图数据
  initRadar(){
    //radarData: 幸福 悲伤 恐惧 厌恶 愤怒 惊讶
    let data=[0,0,0,0,0,0];
    // 该周表情数量
    let cnt=0;
    for(let index in this.data.dateStartEnd){
      try{
        var mood=this.data.calendarRecord[this.data.dateStartEnd[index]].mood
        cnt++;
      }catch{
        continue
      }
      // 愉悦
      if(mood==0){
        data[0]+=20
      }
      // 生气
      if(mood==1){
        data[4]+=15
        data[3]+=5
      }
      // 惊恐
      if(mood==2){
        data[5]+=10
        data[2]+=10
      }
      // 害羞
      if(mood==3){
        data[2]+=5
        data[5]+=6
        data[0]+=9
      }
      // 委屈
      if(mood==4){
        data[1]+=10
        data[3]+=5
        data[4]+=5
      }
      // 平静
      if(mood==5){
        for(let i=0;i<6;i++){
          data[i]+=1
        }
      }
      // 难过
      if(mood==6){
        data[1]+=20
      }
    }
    let radarData=this.data.radarData
    let total=cnt*20
    for(let i in data){
      if(total){
      radarData[i]=Math.sqrt(16*data[i]/total)
      }else{
        radarData[i]=0
      }
    }
    this.setData({
      radarData:radarData
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