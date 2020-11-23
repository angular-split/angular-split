export function formatDate(date) {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const millisecond = date.getMilliseconds()
  const hourFormatted = hour % 12 || 12 // hour returned in 24 hour format
  const minuteFormatted = minute < 10 ? '0' + minute : minute
  const secondFormatted = second < 10 ? '0' + second : second
  const millisecondFormatted = millisecond < 100 ? '0' + millisecond : millisecond

  return `${hourFormatted}:${minuteFormatted}:${secondFormatted}.${millisecondFormatted}`
}
