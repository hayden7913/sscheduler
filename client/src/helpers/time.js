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
  const formattedTime = hours < 10
    ? dateToday + "T" + "0" + hours + ":" + minutes
    : dateToday + "T" + hours + ":" + minutes;

  return moment(formattedTime);
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

export function roundMinutes(hmm_aString, roundVal) {
  let [time, a] = hmm_aString.split(' ');
  let [hours, minutes] = time.split(':');

  hours = minutes >= 60 - roundVal ? (parseInt(hours) + 1).toString() : hours;
  minutes = minutes[0] === '0' ? 0 : minutes;
  minutes = minutes >= 60 - roundVal ? '0' : parseInt(minutes).toString();
  minutes = minutes < 60 - roundVal ? Math.ceil(minutes / roundVal) * roundVal : minutes;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  a = (a === 'am') && (hours === '12') && (minutes === '00') ? 'pm' : a;


 return hours + ':'+ minutes + a
}
