// models/pollModel.js
const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  language: { type: String, required: true },
  question: { type: String, required: true },
  options: [{ text: String, votes: { type: Number, default: 0 } }],
  totalVotes: { type: Number, default: 0 },
  votePermission: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Poll', pollSchema);
