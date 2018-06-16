import moment from 'moment';

export function getCummDurationMap(cards) {
  const durationMap = [0];

  if (cards.length === 0) {
    return [];
  }

  durationMap.push(cards[0].duration)

  cards.map(card => parseInt(card.duration))
  .reduce((a, b) => {
    durationMap.push(a+b);
    return a + b;
  });

  return durationMap;
};

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

export const isTimeBetweenInteveral = (now, startTime, currDuration, nextDuration) => {
  const startTimeMoment = getMoment(startTime);
  const taskStart = startTimeMoment.clone().add(currDuration, 'minutes');
  const taskEnd = startTimeMoment.clone().add(nextDuration,  'minutes');

  return now.isAfter(taskStart) && now.isBefore(taskEnd);
}

export function roundMinutes(hmm_aString, roundVal) {
  let [time, a] = hmm_aString.split(' ');
  let [hours, minutes] = time.split(':');

  hours = minutes >= 60 - roundVal ? (parseInt(hours) + 1).toString() : hours;
  minutes = minutes[0] === '0' ? minutes[1] : minutes;
  minutes = minutes >= 60 - roundVal ? '0' : parseInt(minutes).toString();
  minutes = minutes < 60 - roundVal ? Math.ceil(minutes / roundVal) * roundVal : minutes;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  a = (a === 'am') && (hours === '12') && (minutes === '00') ? 'pm' : a;


 return hours + ':'+ minutes + a
}

export const getTimeInMinutes = timeString => getMoment(timeString).unix() / 60;

export const getMinutesPastCurrentTask = (pastCummSum, nowInMinutes, startInMinutes) =>  (
  Math.round(nowInMinutes - startInMinutes - pastCummSum)
);
