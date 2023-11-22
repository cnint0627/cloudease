// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  //若是新用户，则在用户记录中创建该用户的文档
  db.collection("userData").add({
    data:{
      _id:wxContext.OPENID,   //用户openid
      post:[],                //用户帖子索引列表
      comment:{},             //用户评论索引json
    }
  })
  
  return {
    openid: wxContext.OPENID,   //返回用户OPENID
  }
}