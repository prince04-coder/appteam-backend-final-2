const express = require('express');
const router = express.Router();
const { sendMessage, getPreviousMessages } = require('../controllers/chat/chatController');

router.post('/send',
//    (req, res) => {
//   const { userId1, userId2, messageContent } = req.body;
//   req.socket.emit('sendMessage', userId1, userId2, messageContent);
//   res.status(200).json({ message: 'Message sent' });
// }
sendMessage); // Send message and join room



router.get('/messages/:userId1/:userId2', getPreviousMessages); // Get previous messages

module.exports = router;