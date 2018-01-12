var assert = require('assert');

data = [
  {
    name:'eat',
    id:'1',
  },
  {
    name:'sleep',
    id:'2',
  },
  {
    name:'rave',
    id:'3',
  },
]

function modifyListItem(array, finder, modifier) {
  return array.map((item, i) => {
    if (finder(item, i)) {
      return modifier(item)
    }

    return item;
  })
}

describe('', function() {
  it('should add completed:true to the specified item', function() {

    const cardIndex = 1;
    const finder = (card, i) => cardIndex === i;
    const modifier = card => Object.assign({}, card, { completed: true } )
    const result = modifyListItem(data, finder, modifier );
    console.log(result)
    // assert.equal(result, 'hola');
  });
});
