export function insertAfterIndex(arr, index, newVal) {
  const firstHalfArr = arr.slice(0, index + 1);
  const secondHalfArr = arr.slice(index + 2, arr.length);

  return [
    ...firstHalfArr,
    newVal,
    ...secondHalfArr
  ]
}
