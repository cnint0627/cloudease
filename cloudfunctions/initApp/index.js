// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var isNewUser=false
  try{
  var user=await db.collection("userData").doc(wxContext.OPENID).get()
  }catch{
    isNewUser=true
  //若是新用户，则在用户记录中创建该用户的文档
  await db.collection("userData").add({
    data:{
      _id:wxContext.OPENID,   //用户openid
      post:[],                //用户帖子索引列表
      comment:{},             //用户评论索引json
      calendar:{},            //用户心情日历json
      notification:{'p':0},         //用户帖子被评论提醒json
      userInfo:{"avatar":null,"nickname":"云舒用户",dangerWarning:true},
    }
  })
}

    //获取服务器当前时间
    var date=new Date()
    var year=date.getFullYear()
    var month=date.getMonth()+1
    var day=date.getDate()
    var week=date.getDay()+1
    var dateStr=year.toString()+(month<10?'0':'')+month.toString()+(day<10?'0':'')+day.toString()
    date={
      year:year,
      month:month,
      day:day,
      week:week,
      date:dateStr
    }

    var sentences=await db.collection("staticData").doc("sentence").get()
    var sentence=sentences.data.sentence[Math.floor(Math.random()*sentences.data.sentence.length)]
    
  
  return {
    openid: wxContext.OPENID,   //返回用户OPENID
    date:date,
    sentence:sentence,
    notification:isNewUser?{'p':0}:user.data.notification,
    userInfo:isNewUser?{"avatar":null,"nickname":"云舒用户",dangerWarning:true}:user.data.userInfo,
    ip:wxContext.CLIENTIP,
    wxContext:wxContext
  }
}