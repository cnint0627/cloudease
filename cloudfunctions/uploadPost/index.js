// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  //获取数据库内容到客户端
  var community=await db.collection("communityData").doc("community").get()
  var user=await db.collection("userData").doc(event.openid).get()
  var post=community.data.post
  var userPost=user.data.post
  var postIndex=community.data.postIndex

  //用户记录中post列表添加该帖子索引
  userPost.push(post.length)

  //已有帖子索引列表添加该帖子索引
  postIndex.push(post.length)


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

  //社区记录中post列表添加该帖子详细信息
  post.push({
    date:date,
    title:event.title,
    content:event.content,
    comment:[],
    openid:event.openid
  })

  

  //更新数据库内容到服务端
  await db.collection("communityData").doc("community").update({
    data:{
      post:post,
      postIndex:postIndex
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