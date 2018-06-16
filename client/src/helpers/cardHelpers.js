import moment from 'moment';
import { compose } from '../helpers/functional';
import { isTimeBetweenInteveral } from '../helpers/time';

export const getActiveTaskIndex = startTime => cummDurationMap => {
  return cummDurationMap.findIndex((cummDuration, index) => {
      return isTimeBetweenInteveral(moment(), startTime, cummDuration, cummDurationMap[index + 1]);
    });
}

const getChildren = (node, children = []) => {
  node.childNodes.forEach(child => {
    if (child) {
      children.push(child);
    }

    getChildren(child, children);
  });

  return children;
}

const getClassNames = nodeArray => nodeArray.map(node => node.className);
const hasEditingClass = classNames => classNames.includes('editing');
export const isEditingCard = (cardRef) => compose(hasEditingClass, getClassNames, getChildren)(cardRef);
