export const timestampToTime = function (time) {
  const date=new Date(time)
  var year=date.getFullYear()
  var month=date.getMonth()+1
  var day=date.getDate()
  var hour=date.getHours()
  var minute=date.getMinutes()
  return {
    year:year,
    month:month,
    day:day,
    hour:hour,
    minute:minute
  }
}
