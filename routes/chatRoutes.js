const express = require('express');
const router = express.Router();
const { sendMessage, getPreviousMessages } = require('../controllers/chat/chatController');

// POST route to send a message
router.post('/send', (req, res) => {
  const { userId1, userId2, messageContent } = req.body;
  req.socket.emit('sendMessage', userId1, userId2, messageContent);
  res.status(200).json({ message: 'Message sent' });
});

// GET route to retrieve previous messages between two users
router.get('/messages/:userId1/:userId2', getPreviousMessages);

module.exports = router;
