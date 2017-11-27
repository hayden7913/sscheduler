import moment from 'moment';

export function getMoment(inputTime) {
  const isPM = /pm/.test(inputTime)
  const strippedTime = inputTime.replace(/(am)|(pm)/, "");
  const splitTime = strippedTime.split(":");
  let [hours, minutes] = splitTime;

  if (isPM && (hours < 12)) {
    hours = (parseInt(hours) + 12).toString();
  }

  const dateToday = moment().format().split("T")[0];

  const fTime = hours < 12
    ? dateToday + "T" + "0" + hours + ":" + minutes
    : dateToday + "T" + hours + ":" + minutes;
    return moment(fTime)
}

const now = getMoment("3:30am");
const later = "4:00am";
// console.log(moment())
const res = now.isBefore(getMoment(later));
console.log(res);

export function getCummTimeStamp(startTime, cummTime) {
  return startTime.add(cummTime, 'minutes').format('h:mm a');
}
