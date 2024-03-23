// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()






// 云函数入口函数  
exports.main =async  (event, context) => {
  var AIMsg=''
  // var error=false
  // var AIChat=await db.collection("AIChatData").doc("AIChat").get()
  // var flag=AIChat.data.flag
    //排队等待其他命令处理完
    // setTimeout(function(){
    //   AIMsg='抱歉，AI开小差了，请再试一次吧~'
    //   error=true
    // },3000)
  //   var t=setInterval(async function(){
  //     AIChat=await db.collection("AIChatData").doc("AIChat").get()
  //     flag=AIChat.data.flag
  //   },100)
  //   setTimeout(async function(){
  //     await db.collection("AIChatData").doc("AIChat").update({
  //       data:{
  //         flag:true
  //       }
  //     })
  //     flag=true
  //     error=true
  //   },2000)
  // while(!flag){

  // }
  // clearInterval(t)
  // if(error){
  //   return {"AIMsg":'抱歉，AI开小差了，请再试一次吧~'}
  // }
  // await db.collection("AIChatData").doc("AIChat").update({
  //   data:{
  //     flag:false
  //   }
  // })
 
    //调用API
    const res=await rp({
    url: "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie_speed?access_token="+event.accessToken,
    method: "POST",
    json:true,
    headers:{
      'Content-Type': 'application/json'
    },
    body:{
        // 用户提问消息
        "messages": event.dataMessages
    },
    })  
    .then(function (res) {   
    AIMsg=res.result
    })
    .catch(function (err) {
    AIMsg=err.error_msg
    });


  //  await  db.collection("AIChatData").doc("AIChat").update({
  //     data:{
  //       flag:true
  //     }
  //   })
  return {
    AIMsg:AIMsg
  }



 


}