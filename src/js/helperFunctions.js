//convert degree in decimals to compass direction
export function degToCompass(angle) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(angle / 45) % 8];
}
// convert unix time stamp to date
export function timeConverter(UNIX_timestamp) {
  var dateVal = new Date(UNIX_timestamp * 1000);
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var month = months[dateVal.getMonth()];
  var date = dateVal.getDate();
  var day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ][dateVal.getDay()];
  var time = { day: day, date: `${date} ${month}` };
  return time;
}

// set multiple attributes of a dom element
export function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
