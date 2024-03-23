// 云函数入口文件
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var community=await db.collection("communityData").doc("community").get()
  var user=await db.collection("userData").doc(event.openid).get()
  var post=community.data.post
  var userPost=user.data.post
  var myPost=[]
  for(let i=0;i<userPost.length;i++){
    myPost.push({
      content:post[userPost[i]].content.length<20?post[userPost[i]].content:(post[userPost[i]].content.substring(0,21)+'...'),
      date:post[userPost[i]].date,
      index:userPost[i],
    })
  }

  return {
    myPost:myPost
  }
}