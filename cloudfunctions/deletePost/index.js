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
  
  //将社区post列表中该帖子值置为null
  delete post[event.index]

  //删除用户post列表中该帖子索引
  userPost.splice(userPost.indexOf(event.index),1)

  //更新数据库
  await db.collection("communityData").doc("community").update({
    data:{
      post:post
    }
  })

  await db.collection("userData").doc(event.openid).update({
    data:{
      post:userPost
    }
  })


  return {
    success:true
  }
}