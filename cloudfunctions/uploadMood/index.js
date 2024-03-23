// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var user=await db.collection("userData").doc(event.openid).get()
  userCalendar=user.data.calendar
  try{
    if(userCalendar[event.date]){
      return
    }
  }catch{}

  userCalendar[event.date]={}
  userCalendar[event.date]["mood"]=event.mood
  userCalendar[event.date]["diary"]=''

  await db.collection("userData").doc(event.openid).update({
    data:{
      calendar:userCalendar
    }
  })



  return {
    success:true,
    calendarRecord:userCalendar
  }
}