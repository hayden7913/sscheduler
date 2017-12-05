const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const { PORT, DATABASE_URL } = require('./config');
const { Cards } = require('./models');
const cardRouter = require('./cardRouter');
mongoose.Promise = global.Promise;

//app.set('port', (process.env.PORT || 3001));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/cards', cardRouter);

app.get('/deleteServer', (req, res) => {
  tearDownDb();
  res.send({deleting: 'server'});
  Cards
    .create({
      cards: []
    })
  .then(testObj => res.status(201).json(testObj))
  .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, { useMongoClient: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
