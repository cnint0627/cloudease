const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        "touser": event.openid,
        "page": 'index',
        "lang": 'zh_CN',
        "data": {
          "thing1": {
            "value": event.plane
          },
          "thing2": {
            "value": event.comment
          },
        },
        "templateId": 'ZpBj0Snd4p7-PU2YblbLLLxKOwymBsS8FKLKGCjk-WA',
        "miniprogramState": 'developer'
      })
    return {
      success:true
    }
  } catch (err) {
    return err
  }
}