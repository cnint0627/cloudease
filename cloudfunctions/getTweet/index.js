// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  // 返回最新的三条推文
  return {
    tweet:[
      {
        title:"早睡的好处",
        content:"早睡的好处有很多...",
        date:"2024-02-23"
      },
      {
        title:"晚睡的坏处",
        content:"晚睡的坏处有很多...",
        date:"2024-02-06"
      },
      {
        title:"云舒",
        content:"欢迎来到云舒哦~",
        date:"2024-01-15"
      }
    ]
  }
}