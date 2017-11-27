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
    return moment(fTime);
}


export function getCummTimeStamp(startTime, cummTime) {
  return startTime.clone().add(cummTime, 'minutes').format('h:mm a');
}


export const isTimeBetweenInteveral = (startTime, currDuration, nextDuration) => {
  const taskStart = startTime.clone().add(currDuration, 'minutes');
  const taskEnd = startTime.clone().add(nextDuration,  'minutes');
  const now = moment();
  console.log(now.format('h:mma'));
  console.log(taskStart.format('h:mma'), taskEnd.format('h:mma'))
  // console.log(taskStart.isBefore(taskEnd))
  return now.isAfter(taskStart) && now.isBefore(taskEnd);
}

// const timeOne = getMoment("4:50am").add(30, 'm');
// const startTime = getMoment("4:20am");
// const res = isTimeBetweenInteveral(startTime, 0, 25);
// console.log(res)
// const res = startTime.add(10, 'minutes');
// const res = moment().add(10, 'm')
// const res = getCummTimeStamp(startTime, 10);
// console.log(timeOne.isBefore(moment()))
// console.log(res.isBefore(moment()))
