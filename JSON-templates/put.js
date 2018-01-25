const fetch = require('node-fetch');
const filePath = process.argv[2];
const cards = require('./' + filePath);

const herokuCardsURL = 'https://sscheduler.herokuapp.com/cards';
const herokuGetCardsURL = 'https://sscheduler.herokuapp.com/getRaw';

(function updateCards() {
  if (!Array.isArray(cards)) {
    return console.error('cards must be an array');
  }

  if (cards == null) {
    return console.error('cards in undefined');
  }

  let listId;

  fetch(herokuGetCardsURL)
    .then(function(response) {
  	// Convert to JSON
    	return response.json();
    })
    .then(function(data) {
      listId = data[0]._id;

    fetch(herokuCardsURL + '/' + listId, {
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
    });
  });
})()
