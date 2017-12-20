const fetch = require('node-fetch');

const cards  = require('./Tuesday');
const listId = '5a3852dc88f09628ae02d3d3';

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
    body: JSON.stringify({ cards })
  })
  .then((res) => {
    if (res) {
      // console.log(res.json())
    }
    console.log('posted')
  })
})()
