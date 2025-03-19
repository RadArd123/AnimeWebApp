const mongoose = require('../configuration/dbConfig.js');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime', required: true },
  text: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);