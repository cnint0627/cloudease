// 后面优化：可以把这个初始化放到initApp里面，作为全局变量传给calendar页面，增加程序的流畅性
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var user=await db.collection("userData").doc(event.openid).get()
  userCalendar=user.data.calendar

  return {
    success:true,
    calendarRecord:userCalendar
  }
}