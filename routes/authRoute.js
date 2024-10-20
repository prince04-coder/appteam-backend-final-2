// const express = require("express");
// const router = express.Router();
// const authMiddleware = require('../middlewares/authMiddleware');

// const authController = require("../controllers/authController");

// //Registration Route
// router.post('/register', authController.registerUser);

// //loginUser route
// router.post('/login', authController.loginUser);

// //getallusers route
// router.get('/all', authController.getUsers);

// //remove users
// router.delete('/remove/:username',authController.removeUsers);

// //Profile route using authentication
// router.get('/profile', authMiddleware.auth, (req, res) => {
//   const user = req.user;
//   res.json({ message: `Welcome, ${user.username}!` });
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const { sendMessage, getPreviousMessages } = require('../controllers/chat/chatController');

/**
 * @swagger
 * /send:
 *   post:
 *     summary: Send a message and join a chat room
 *     tags: 
 *       - Chat
 *     description: Send a private message between two users and join their chat room.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId1:
 *                 type: string
 *                 description: The ID of the sender.
 *               userId2:
 *                 type: string
 *                 description: The ID of the recipient.
 *               messageContent:
 *                 type: string
 *                 description: The message content.
 *     responses:
 *       200:
 *         description: Message sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Message sent
 *       500:
 *         description: Error while sending the message.
 */
router.post('/send', sendMessage); // Send message and join room

/**
 * @swagger
 * /messages/{userId1}/{userId2}:
 *   get:
 *     summary: Get previous messages between two users
 *     tags:
 *       - Chat
 *     description: Fetch the previous messages exchanged between two users in the last 24 hours.
 *     parameters:
 *       - in: path
 *         name: userId1
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the first user (sender or recipient).
 *       - in: path
 *         name: userId2
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the second user (sender or recipient).
 *     responses:
 *       200:
 *         description: Successfully fetched previous messages.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   roomId:
 *                     type: string
 *                     description: The room ID where the chat took place.
 *                   sender:
 *                     type: string
 *                     description: The ID of the message sender.
 *                   content:
 *                     type: string
 *                     description: The content of the message.
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     description: The time the message was sent.
 *       500:
 *         description: Error while fetching messages.
 */
router.get('/messages/:userId1/:userId2', getPreviousMessages); // Get previous messages

module.exports = router;