const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
  cards: [{
    text: String,
    id: String,
    duration: Number,
    isCompleted: Boolean,
  }],
});

featureRequestSchema = mongoose.Schema({
  featureRequests: {
    type: String, required: true,
  }
});

const Cards = mongoose.model('cards', testSchema);
const FeatureRequests = mongoose.model('featureRequests', featureRequestSchema);

module.exports = { Cards, FeatureRequests };
