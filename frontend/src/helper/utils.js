export const convertISODate = (date) => {
  const dateObj = new Date(date)
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const yyyy = dateObj.getFullYear()
  let mm = dateObj.getMonth()
  let dd = dateObj.getDate()

  return `${dd} ${month[mm]} ${yyyy}`
}

export const rupiahFormat = (numb) => {
  const format = numb.toString().split('').reverse().join('')
  const convert = format.match(/\d{1,3}/g)

  return 'Rp ' + convert.join('.').split('').reverse().join('')
}
