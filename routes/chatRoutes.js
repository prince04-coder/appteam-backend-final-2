const express = require('express');
const router = express.Router();
const { sendMessage, joinRoomAndFetchMessages } = require('../controllers/chat/chatController');

/**
 * Route for joining a room and fetching previous messages
 */
router.post('/join-room', (req, res) => {
    //const { userId1, userId2 } = req.body;
    //req.socket.emit('joinRoom', userId1, userId2);
    //res.status(200).json({ message: 'Joined room and fetched previous messages' });
    joinRoomAndFetchMessages
});
// POST route to send a message
router.post('/send', (req, res) => {
  const { userId1, userId2, messageContent } = req.body;
  req.socket.emit('sendMessage', userId1, userId2, messageContent);
  res.status(200).json({ message: 'Message sent' });
});

module.exports = router;
