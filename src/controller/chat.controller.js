// import ChatMessage from '../model/Chat.js';
const ChatMessage = require('../model/Chat');

exports.getAllMessages = async (req, res) => {
  const messages = await ChatMessage.find().sort({ createdAt: 1 });
  res.json(messages);
};
