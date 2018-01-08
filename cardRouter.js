const express = require('express');
const bodyParser = require('body-parser');
const { Cards } = require('./models');
const cardRouter = express.Router();

cardRouter.use(bodyParser.urlencoded({
  extended: true
}));
cardRouter.use(bodyParser.json());

cardRouter.get('/', (req, res) => {
  Cards
    .find()
    .exec()
    .then(data => res.json(data))
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
      });
});

cardRouter.get('/:projectId', (req, res) => {
  console.log('get project by id')
  Cards
    .findById(req.params.projectId)
    .exec()
    .then(project => res.json(project))
    .catch(err => {
        console.error(err);
        res.status(404).json({message: 'Project Not Found'});
      });
});

cardRouter.post('/', (req, res) => {
  console.log(req.body.cards)
  Cards
    .create({
      cards: req.body.cards
    })
  .then(testObj => res.status(201).json(testObj))
  .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

cardRouter.put('/:listId', (req, res) => {
  console.log('put endpoint hit')
  console.log(req.body.fromFetch)
  const toUpdate = {
    cards: req.body.cards,
  }

  Cards
    .findByIdAndUpdate(req.params.listId, toUpdate)
    .exec()
    .then(project => res.status(204).json(toUpdate))
    .catch(err =>
      res.status(500).json({message: 'Internal server error'})
    );
});

cardRouter.delete('/:projectId', (req, res) => {
  Cards
    .findByIdAndRemove(req.params.projectId)
    .exec()
    .then(project => res.status(204).json(project))
    .catch(err => res.status(404).json({message: 'Not Found'}));
});

module.exports = cardRouter;
