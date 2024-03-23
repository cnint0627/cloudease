// pages/changeDate/changeDate.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight:app.globalData.navHeight,
    date:app.globalData.date,
    weekArray:["周日","周一","周二","周三","周四","周五","周六"],
    value:[null,null],
    years:Array.from(new Array(2030 + 1).keys()).slice(2020),
    months:Array.from(new Array(12 + 1).keys()).slice(1),
    days:[31,28,31,30,31,30,31,31,30,31,30,31],
    currentDate:{
      year:null,
      month:null
    },
    dateStartEndArray:[],
    calendarRecord:null
  },

  //返回上一层级
  bindBack(){
    wx.navigateBack()
  },

  bindSelectDate(e){
    console.log(this.data.dateStartEndArray[e.currentTarget.dataset.index])
    var pages=getCurrentPages()
    var prevPage=pages[pages.length-2]
    var currentDate=this.data.currentDate
    console.log(currentDate)
    prevPage.setData({
      currentDate:currentDate,
      dateStartEnd:this.data.dateStartEndArray[e.currentTarget.dataset.index]
    })
    prevPage.initRadar()
    console.log(prevPage.data.currentDate)
    wx.navigateBack()
  },

  bindChangeDate(e){

    var val=e.detail.value
    var currentDate=this.data.currentDate
    currentDate.year=this.data.years[val[0]]
    currentDate.month=this.data.months[val[1]]

    var days=this.data.days
    var date=new Date((currentDate.year+'-'+currentDate.month+'-01').replace(/-/g, "/"))
    var weekFirst=date.getDay()
    console.log(weekFirst)
    var dateStartEndArray=[]
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
  console.log(dateStartEndArray)
    this.setData({
      currentDate:currentDate,
      value:[val[0],val[1]],
      dateStartEndArray:dateStartEndArray
    })
    
    console.log(dateStartEndArray)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var pages=getCurrentPages()
    var prevPage=pages[pages.length-2]
    var currentDate=prevPage.data.currentDate
    var days=this.data.days
    var date=new Date((currentDate.year+'-'+currentDate.month+'-01').replace(/-/g, "/"))
    var weekFirst=date.getDay()
    var dateStartEndArray=[]
    console.log(currentDate)
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
    console.log(dateStartEndArray)
    var calendarRecord=prevPage.data.calendarRecord
    this.setData({
      value:[this.data.years.indexOf(currentDate.year),this.data.months.indexOf(currentDate.month)],
      dateStartEndArray:dateStartEndArray,
      calendarRecord:calendarRecord,
      currentDate:currentDate
    })
    console.log(dateStartEndArray)
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