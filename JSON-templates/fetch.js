const fetch = require('node-fetch');

const cards  = require('./misc');

const listId = '5a53b185f674756479d4bc1c';

(function updateCards() {
  if (!Array.isArray(cards)) {
    return console.error('cards must be an array');
  }

  if (cards == null) {
    return console.error('cards in undefined');
  }

  fetch('http://localhost:3001/cards/' + listId, {
  	method: 'PUT',
  	headers: {
  		'Content-Type': 'application/json'
  	},
    body: JSON.stringify({
      cards,
      fromFetch: true
    })
  })
  .then((res) => {
    if (res) {
      // console.log(res.json())
    }
    console.log('posted')
  })
})()
