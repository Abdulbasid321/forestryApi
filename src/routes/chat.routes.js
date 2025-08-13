const express = require('express');
const chatController = require('../controller/chat.controller');
// import { getAllMessages } from '../controller/chat.controller.js';

const router = express.Router();

router.get('/', chatController.getAllMessages);

module.exports = router;
