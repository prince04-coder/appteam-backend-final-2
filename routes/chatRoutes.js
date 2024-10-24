const express = require('express');
const router = express.Router();
const { sendMessage, fetchMessages } = require('../controllers/chat/chatController');

/**
 * Route for joining a room and fetching previous messages
 */
router.get('/join-room/:userId1/:userId2', 
  fetchMessages
);

// POST route to send a message
// router.post('/send', (req, res) => {
//   const { userId1, userId2, messageContent } = req.body;
//   req.socket.emit('sendMessage', userId1, userId2, messageContent);
//   res.status(200).json({ message: 'Message sent' });
// });

module.exports = router;
