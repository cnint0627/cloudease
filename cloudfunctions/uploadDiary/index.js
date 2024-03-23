// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var user=await db.collection("userData").doc(event.openid).get()
  userCalendar=user.data.calendar

  userCalendar[event.date]["diary"]=event.diary
  // for(let index in event.images){
  //   await cloud.uploadFile({
  //     cloudPath: event.openid+'/diary/'+event.date+'/'+event.images[index], // 上传至云端的路径
  //     filePath: event.images[inedx], // 小程序临时文件路径
  //     success: res => {

  //     },
  //   })
  // }
  await db.collection("userData").doc(event.openid).update({
    data:{
      calendar:userCalendar
    }
  })

  return {
    success:true,
    currentCalendarRecord:userCalendar[event.date]
  }
}