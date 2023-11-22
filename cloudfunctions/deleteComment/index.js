// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var community=await db.collection("communityData").doc("community").get()
  var user=await db.collection("userData").doc(event.openid).get()
  var post=community.data.post
  var userComment=user.data.comment
  
  delete post[event.postIndex].comment[event.commentIndex]

  userComment[event.postIndex].splice(userComment[event.postIndex].indexOf(event.commentIndex),1)

  await db.collection("communityData").doc("community").update({
    data:{
      post:post
    }
  })

  await db.collection("userData").doc(event.openid).update({
    data:{
      comment:userComment
    }
  })

  return {
    success:true,
    post:post,
    userComment:userComment
  }
}