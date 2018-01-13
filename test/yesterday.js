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
  });
}


function toggleCompleted(cardId) {
  return (dispatch, getState) => {
    const matcher = (card, i) =>  cardId === card.id;
    const modifier = card => Object.assign({}, card, { completed: !card.completed} )

    dispatch({
      type: 'TOGGLE_COMPLETED',
      matcher,
      modifier,
    })
  }
}

describe('', function() {
  it('should add completed:true to the specified item', function() {
    cardId = '2'
    const matcher = (card, i) =>  cardId === card.id;
    const modifier = card => Object.assign({}, card, { completed: !card.completed} )

    const result = modifyListItem(data, matcher, modifier);
    console.log(result)
    // assert.equal(result, 'hola');
  });
});
