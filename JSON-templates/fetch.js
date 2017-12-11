const fetch = require('node-fetch');

const cards = {
  "cards": [
    {
       "text": "start laundry", "duration": 15
    },
    {"duration": "10", "text": "fetch bucket, coir, verm, scale, gallon jug"},
    {"duration": "10", "text": "open/break up/weigh coir"},
    {"duration": "5", "text": "add water"},
    {"duration": "10", "text": "prep pressure cookers/  timers"},
    {"duration": "30", "text": "mix/adjust substrate "},
    {"duration": "10", "text": "load bags"},
    {"duration": "10", "text": "insert timers/ tie bags"},
    {"duration": "10", "text": "start PC / set timer"},
    {"duration": "10", "text": "cleanup"},
    {
       "text": "set up PC", "duration": 5
    },
    {
       "text": "collect agar supplies", "duration": 10
    },
    {
       "text": "clear surface and layout plates", "duration": 5
    },
    {
       "text": "clear and rinse old plates", "duration": 5
    },
    {
       "text": "replace mp tape on lids", "duration": 10
    },
    {
       "text": "weigh agar", "duration": "5"
    },
    {
       "text": "weigh water", "duration": 5
    },
    {
       "text": "cook and pour agar", "duration": 10
    },
    {
       "text": "paper towel/foil lids", "duration": 10
    },
    {
       "text": "load and start PC", "duration": 5
    },
    {
       "text": "clean up", "duration": 5
    },
    {
       "text": "shake stuff", "duration": 30
    },
    {
       "text": "fetch laundry", "duration": 10
    }
  ]
}
const listId = '5a2ebf7167c4a234f1e023be';

fetch('http://localhost:3001/cards/' + listId, {
	method: 'PUT',
	headers: {
		'Content-Type': 'application/json'
	},
  body: JSON.stringify(cards)
})
  .then((res) => {
    if (res) {
      // console.log(res.json())
    }
    console.log('posted')
  })
