import moment from 'moment';

export default function getMoment(inputTime) {
  const isPM = /pm/.test(inputTime)
  const strippedTime = inputTime.replace(/(am)|(pm)/, "");
  const splitTime = strippedTime.split(":");
  let [hours, minutes] = splitTime;

  if (isPM && (hours < 12)) {
    hours = (parseInt(hours) + 12).toString();
  }

  const date = "2017-11-26T!";
  const fTime = hours < 12
    ? date + "0" + hours + ":" + minutes
    : date + hours + ":" + minutes;

    return moment(fTime)
}
