export const convertISODate = (date) => {
  const dateObj = new Date(date)
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const yyyy = dateObj.getFullYear()
  let mm = dateObj.getMonth()
  let dd = dateObj.getDate()

  return `${dd} ${month[mm]} ${yyyy}`
}
