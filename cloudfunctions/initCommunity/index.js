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
  var userComment=user.data.comment
  var postIndex=community.data.postIndex

  //直接获取指定序号的纸飞机
  if(event.option==1){
    // 清空该条帖子提醒
    if(user.data.notification[event.index]){
      delete user.data.notification[event.index]
      delete user.data._id
      await db.collection("userData").doc(event.openid).set({
        data:
        user.data
      })
    }
    return{
      post:post[event.index]
    }
  }

  //防止捡到自己的飞机
  for(let i=0;i<userPost.length;i++){
    postIndex.splice(postIndex.indexOf(userPost[i]),1)
  }
  if(postIndex.length==0){
    return{
      post:null
    }
  }
  var randomIndex=Math.floor(Math.random()*postIndex.length)

  //判断自己是否评论过
  var showComment=false
  try{
    showComment=userComment[postIndex[randomIndex].toString()].length?true:false
  }
  catch{
    
  }


  return {
    post:post[postIndex[randomIndex]],
    postIndex:postIndex[randomIndex],
    showComment:showComment
  }
}