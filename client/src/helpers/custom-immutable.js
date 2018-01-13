export function modifyListItem(array, finder, modifier) {
  return array.map((item, i) => {
    if (finder(item, i)) {
      return modifier(item)
    }

    return item;
  });
}

export function insertAfterIndex(arr, index, newVal) {
  const firstHalfArr = arr.slice(0, index + 1);
  const secondHalfArr = arr.slice(index + 1, arr.length);

  return [
    ...firstHalfArr,
    newVal,
    ...secondHalfArr
  ]
}

export function shiftElementsUp(arr, startIndex, endIndex) {
  const shiftElements = arr.slice(startIndex, endIndex +1);
  const displacedElement = arr[startIndex -1];
  const beginArray = arr.slice(0, startIndex-1,);
  const endArray = arr.slice(endIndex + 1, arr.length);

  if (startIndex === 0) {
    return arr;
  }

  return([
    ...beginArray,
    ...shiftElements,
    displacedElement,
    ...endArray
    ])
}

export function shiftElementsDown(arr, startElement, endElement) {
  const shiftElements = arr.slice(startElement, endElement +1);
  const displacedElement = arr[endElement + 1];
  const beginArray = arr.slice(0, startElement);
  const endArray = arr.slice(endElement + 2, arr.length);

  if (endElement === arr.length - 1) {
    return arr;
  }

  return([
    ...beginArray,
     displacedElement,
    ...shiftElements,
    ...endArray
    ])
}

export function findIndices(arr, callback) {
  const resultArray = [];

  arr.forEach((element, i) => {

  if(callback(element)) {
    resultArray.push(i)
  }
  });

  return resultArray;
}

export const filterConsec = (arr) => {
  let hasMatchStarted = false;
  let hasMatchStopped = false;

  return arr.filter((currElement, index, array) => {
    if(hasMatchStopped){
      return false;
    }

    if(index === 0) {
      hasMatchStarted = true;
      return currElement + 1 === array[1];
    }

    if(index < array.length) {
      if (hasMatchStarted && (currElement + 1 !== array[index + 1])) {
        hasMatchStopped = true;
      }

      if (currElement - 1 === array[index - 1] || currElement + 1 === array[index + 1]) {
        hasMatchStarted = true;
        return true;
      }
    }
  })
}
