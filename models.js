const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
  cards: [{
    text: String,
    id: String,
    duration: Number,
  }],
});


const Cards = mongoose.model('cards', testSchema);
//const Projects = mongoose.model('Projects', projectSchema);

module.exports = {Cards /*, Projects*/};
