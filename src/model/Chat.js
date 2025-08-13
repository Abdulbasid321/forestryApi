const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  senderName: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
