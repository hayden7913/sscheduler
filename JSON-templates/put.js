const axios = require('axios');
const filePath = process.argv[2];
const cards = require('./' + filePath);

const baseUrl = 'https://sscheduler-199817.appspot.com/';
const putCardsUrl = baseUrl + 'cards';
const getCardUrl = baseUrl + 'getRaw';

(function updateCards() {
  if (!Array.isArray(cards)) {
    return console.error('cards must be an array');
  }

  if (cards == null) {
    return console.error('cards in undefined');
  }

  let listId;

  axios(getCardUrl)
    .then(function(response) {
      return response.data;
    })
    .then(function(data) {
      listId = data[0]._id;

    axios({
      method: 'put',
      url: putCardsUrl + '/' + listId,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
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
