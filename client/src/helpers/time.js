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

  return now.isAfter(taskStart) && now.isBefore(taskEnd);
}
