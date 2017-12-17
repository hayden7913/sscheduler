const fetch = require('node-fetch');


// cards should be an array of objects
const cards = require('./inoculation.js');
const listId = '5a3154e5be60da38a7ab17cc';

if (!Array.isArray(cards)) {
  console.error('cards must be an array');
}

fetch('http://localhost:3001/cards/' + listId, {
	method: 'PUT',
	headers: {
		'Content-Type': 'application/json'
	},
  body: JSON.stringify({ cards }),
})
  .then((res) => {
    if (res) {
      // console.log(res.json())
    }
    console.log('posted')
  })
