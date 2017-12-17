const cards = [
  {
    duration: 10,
    text: 'eat breakfast',
    id: 'HJJqIQeGz',
    _id: '5a32a6ddbb9992130abbd0fc'
  },
  {
    duration: 5,
    text: 'brush teeth',
    id: 'HJxnUmgzM',
    _id: '5a32a6ddbb9992130abbd0fd'
  },
  {
    duration: 10,
    text: 'clean',
    id: 'SkYaIQgfM',
    _id: '5a32a6ddbb9992130abbd0fb'
  },
  {
    duration: 15,
    text: 'wash dishes',
    id: 'r1SqRLeGf',
    _id: '5a32f1695a4f6519c3240490'
  },
  {
    id: 'ByD0EQxff',
    _id: '5a32a4cbbb9992130abbd0e9',
    text: 'break jars',
    duration: 30
  },
  {
    id: 'Bkew0V7eGM',
    _id: '5a32a4cbbb9992130abbd0e8',
    text: 'gather supplies',
    duration: 15
  },
  {
    id: 'ryzPRVXeGz',
    _id: '5a32a4cbbb9992130abbd0e6',
    text: 'hang plastic',
    duration: 5
  },
  {
    duration: 5,
    text: 'refill chemicals',
    id: 'rJrlx8lGf',
    _id: '5a32f1695a4f6519c324048f'
  },
  {
    id: 'rJZPAVQezz',
    _id: '5a32a4cbbb9992130abbd0e7',
    text: 'shower / soak towel',
    duration: 35
  },
  {
    duration: 0,
    text: 'get dressed',
    id: 'SkmURHxfG',
    _id: '5a32f1695a4f6519c324048e'
  },
  {
    duration: 5,
    text: 'copy schedule',
    id: 'H1SC2SlzG',
    _id: '5a32f1695a4f6519c324048d'
  },
  {
    duration: 155,
    text: 'break',
    id: 'HJYTHwxMf',
    _id: '5a32f1695a4f6519c324048c'
  },
  {
    id: 'HkXwCNXezz',
    _id: '5a32a4cbbb9992130abbd0e5',
    text: 'agar away/ cleanup',
    duration: 30
  },
  {
    duration: 0,
    text: 'put agar away',
    id: 'BJkGkUxMM',
    _id: '5a32f1695a4f6519c324048b'
  },
  {
    duration: 0,
    text: 'set up stool',
    id: 'SJE-hBefM',
    _id: '5a32f1695a4f6519c324048a'
  },
  {
    duration: 0,
    text: 'remove sab',
    id: 'H1iD2refz',
    _id: '5a32f1695a4f6519c3240489'
  },
  {
    duration: 0,
    text: 'put on gloves and mask',
    id: 'Hyi1FPefG',
    _id: '5a32f1695a4f6519c3240488'
  },
  {
    duration: 0,
    text: 'prep paper towels',
    id: 'r1bBlIgfz',
    _id: '5a32f1695a4f6519c3240487'
  },
  {
    duration: 0,
    text: 'wipe down mid level surfaces',
    id: 'HJBu3SxGM',
    _id: '5a32f1695a4f6519c3240486'
  },
  {
    duration: 0,
    text: 'wipe down bottles/ supplies and move down',
    id: 'H1qqhHeGz',
    _id: '5a32f1695a4f6519c3240485'
  },
  {
    duration: 0,
    text: 'wipe down upper shelf / lamp / upper walls',
    id: 'HyctcwefG',
    _id: '5a32f1695a4f6519c3240484'
  },
  {
    duration: 0,
    text: 'replace shelf stuff',
    id: 'ryq5nvgfz',
    _id: '5a32f1695a4f6519c3240483'
  },
  {
    duration: 0,
    text: 'set up watch',
    id: 'S1ymJLxfG',
    _id: '5a32f1695a4f6519c3240482'
  },
  {
    duration: 0,
    text: 'pull out lighter',
    id: 'r1rKovgfM',
    _id: '5a32f1695a4f6519c3240481'
  },
  {
    duration: 0,
    text: 'pull out sharpie',
    id: 'HJstjPefM',
    _id: '5a32f1695a4f6519c3240480'
  },
  {
    duration: 0,
    text: 'wipe down walls /plastic',
    id: 'B10yTBxGM',
    _id: '5a32f1695a4f6519c324047f'
  },
  {
    duration: 0,
    text: 'wipe down door handles',
    id: 'BJpgTSgGG',
    _id: '5a32f1695a4f6519c324047e'
  },
  {
    duration: 0,
    text: 'set up sab bottom',
    id: 'H1KOOvgGf',
    _id: '5a32f1695a4f6519c324047d'
  },
  {
    duration: 0,
    text: 'set up towel',
    id: 'BkqBarefG',
    _id: '5a32f1695a4f6519c324047c'
  },
  {
    duration: 0,
    text: 'wipe down back of sab',
    id: 'HyZ_THlzM',
    _id: '5a32f1695a4f6519c324047b'
  },
  {
    duration: 0,
    text: 'move sab to closet',
    id: 'Hko_6SgGM',
    _id: '5a32f1695a4f6519c324047a'
  },
  {
    duration: 0,
    text: 'wipe down inside of sab',
    id: 'HkXtTBgff',
    _id: '5a32f1695a4f6519c3240479'
  },
  {
    duration: 0,
    text: 'spray inside of sab',
    id: 'Hyk56HxMM',
    _id: '5a32f1695a4f6519c3240478'
  },
  {
    duration: 0,
    text: 'wipe down top of sab',
    id: 'SyS-RHlMf',
    _id: '5a32f1695a4f6519c3240477'
  },
  {
    duration: 0,
    text: 'wipe down/ stock masters',
    id: 'SyQTAHlGf',
    _id: '5a32f1695a4f6519c3240476'
  },
  {
    duration: 0,
    text: 'cut wrist tape',
    id: 'S1W1kIlMf',
    _id: '5a32f1695a4f6519c3240475'
  },
  {
    duration: 0,
    text: 'put on clean gloves',
    id: 'BJHP18xGM',
    _id: '5a32f1695a4f6519c3240474'
  },
  {
    duration: 0,
    text: 'put on tyvek sleeves',
    id: 'HJdFkIxGM',
    _id: '5a32f1695a4f6519c3240473'
  },
  {
    duration: 0,
    text: 'start inocculation',
    id: 'HkIckLeMG',
    _id: '5a32f1695a4f6519c3240472'
  },
  {
    id: 'rkBvCVXeGf',
    _id: '5a32a4cbbb9992130abbd0e3',
    text: 'g2g jars',
    duration: 120
  },
  {
    id: 'SJEw0VQgMG',
    _id: '5a32a4cbbb9992130abbd0e4',
    text: 'a2g jars',
    duration: 30
  },
  {
    id: 'ryUPCV7eGM',
    _id: '5a32a4cbbb9992130abbd0e2',
    text: 'break',
    duration: 15
  },
  {
    id: 'HkOD0VQgzz',
    _id: '5a32a4cbbb9992130abbd0e0',
    text: 'agar',
    duration: 45
  },
  {
    id: 'HJvP04XxGz',
    _id: '5a32a4cbbb9992130abbd0e1',
    text: 'shake and label',
    duration: 30
  },
  {
    id: 'HktPANQeMG',
    _id: '5a32a4cbbb9992130abbd0df',
    text: 'cleanup',
    duration: 45
  },
  {
    _id: '5a32ad445a4f6519c323ff8b',
    id: 'S1hramgGG',
    text: 'done',
    duration: 0
  }
]
