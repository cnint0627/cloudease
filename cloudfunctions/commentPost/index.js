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
  var postOwner=await db.collection("userData").doc(post[event.index].openid).get()
  var postOwnerNotification=postOwner.data.notification

  //在数据库用户记录comment字典对应该帖子评论列表中添加该评论在帖子下的索引，
  //若没有在该帖子下评论过则新建帖子评论列表
  try{
    userComment[event.index].push(post[event.index].comment.length)
  }catch{
    userComment[event.index]=[post[event.index].comment.length]
  }


  //获取服务器当前时间
  var date=new Date()
  var year=date.getFullYear()
  var month=date.getMonth()+1
  var day=date.getDate()
  var hour=date.getHours()
  var minute=date.getMinutes()
  date={
    year:year,
    month:month,
    day:day,
    hour:hour,
    minute:minute
  }
  event.userInfo["openid"]=event.openid
  //在数据库社区帖子记录下该帖子评论列表中添加该评论
  post[event.index].comment.push({
    date:date,
    content:event.content,
    userInfo:event.userInfo
  })

  //为帖子发布者添加消息提醒
  if(post[event.index].openid!=event.openid){
    if(postOwnerNotification[event.index]){
      postOwnerNotification[event.index]+=1
    }else{
      postOwnerNotification[event.index]=1
    }
  }

  //更新数据库
  await db.collection("communityData").doc("community").update({
    data:{
      post:post,
    }
  })

  await db.collection("userData").doc(event.openid).update({
    data:{
      comment:userComment,
    }
  })

  await db.collection("userData").doc(post[event.index].openid).update({
    data:{
      notification:postOwnerNotification
    }
  })

  

  return {
    success:true,
    post:post[event.index]
  }
}