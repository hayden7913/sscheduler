const cards1 = [
  {
    id: 'SJ1JWHhbG',
    _id: '5a2ec0a9711587371d7c2faf',
    text: 'start laundry',
    duration: 15,
    isSelected: true
  },
  {
    id: 'ByHxJkbS3bf',
    _id: '5a2ec0a9711587371d7c2f99',
    text: 'fetch laundry',
    duration: 10
  },
  {
    duration: 10,
    text: 'account for recent purchases',
    id: 'rJIJUrnWz',
    _id: '5a2ec8ff46a066379be21199'
  },
  {
    duration: 15,
    text: 'drive to gym',
    id: 'H1eHUrh-M',
    _id: '5a2ec8ff46a066379be2119b'
  },
  {
    text: 'workout',
    id: 'H1cvISnZz',
    duration: 40,
    _id: '5a2ec8ff46a066379be2119a'
  },
  {
    duration: 25,
    text: 'drive to walmart',
    id: 'rJSiUB3-G',
    _id: '5a2ec8ff46a066379be2119e'
  },
  {
    duration: 15,
    text: 'pick up stuff',
    id: 'SJ82UB3WG',
    _id: '5a2ec8ff46a066379be2119f'
  },
  {
    text: 'walk to home depot',
    id: 'rkCowShbf',
    duration: 5,
    _id: '5a2ec8ff46a066379be2119d'
  },
  {
    text: 'pick up verm',
    id: 'Bk1ZuHnbG',
    duration: 15,
    _id: '5a2ec8ff46a066379be2119c'
  },
  {
    duration: 25,
    text: 'drive home',
    id: 'B1TnIHnWG',
    _id: '5a2ec8ff46a066379be211a0'
  }
]

const cards2  = [
  {"duration": "15", "text": "clear sink"},
  {"duration": "10", "text": "set up living room"},
  {"duration": "10", "text": "fetch buckets"},
  {"duration": "0", "text": "substrate"},
  {"duration": "0", "text": "bags"},
  {"duration": "0", "text": "strainers"},
  {"duration": "0", "text": "tubs"},
  {"duration": "0", "text": "plastic"},
  {"duration": "0", "text": "tape"},
  {"duration": "0", "text": "scissors"},
  {"duration": "10", "text": "break up grains"},
  {"duration": "10", "text": "soak grains"},
  {"duration": "5", "text": "set up tubs"},
  {"duration": "10", "text": "wipe tubs down"},
  {"duration": "15", "text": "label tubs/ buckets"},
  {"duration": "0", "text": "cut liners"},
  {"duration": "5", "text": "drain grains 1"},
  {"duration": "15", "text": "line tubs"},
  {"duration": "5", "text": "wipe liners down"},
  {"duration": "5", "text": "distribute grains 1"},
  {"duration": "5", "text": "drain grains 2"},
  {"duration": "15", "text": "hydrate substrate 1"},
  {"duration": "5", "text": "distribute substrate 1"},
  {"duration": "15", "text": "hydrate substrate 2"},
  {"duration": "5", "text": "distribute grains 2"},
  {"duration": "5", "text": "distribute substrate 2"},
  {"duration": "15", "text": "mix tubs"},
  {"duration": "15", "text": "trim liners"},
  {"duration": "10", "text": "case tubs"},
  {"duration": "15", "text": "level tubs"},
  {"duration": "10", "text": "tape holes"},
  {"duration": "10", "text": "stack tubs"},
  {"duration": "20", "text": "clean up"}
]


let cards =  [...cards1, ...cards2];
module.exports = cards;
