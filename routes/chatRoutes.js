const express = require('express');
const router = express.Router(); // Make sure this line is included
const { sendMessage, getPreviousMessages } = require('../controllers/chat/chatController');


/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         roomId:
 *           type: string
 *           description: The room ID generated from user IDs.
 *           example: "user1-user2"
 *         sender:
 *           type: string
 *           description: The ID of the user who sent the message.
 *           example: "user1"
 *         content:
 *           type: string
 *           description: The encrypted message content.
 *           example: "e1a2f..."
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the message was sent.
 *           example: "2024-10-20T12:34:56.789Z"
 */

/**
 * @swagger
 * /send:
 *   post:
 *     summary: Send a private message between two users
 *     description: Sends a private message between two users by emitting the message to the room.
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
 *                 example: "user1"
 *               userId2:
 *                 type: string
 *                 description: The ID of the recipient.
 *                 example: "user2"
 *               messageContent:
 *                 type: string
 *                 description: The content of the message being sent.
 *                 example: "Hello, how are you?"
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
 *                   example: "Message sent"
 *       500:
 *         description: Error sending the message.
 */
router.post('/send', sendMessage);

/**
 * @swagger
 * /messages/{userId1}/{userId2}:
 *   get:
 *     summary: Get previous messages between two users
 *     description: Fetches private messages exchanged between two users within the last 24 hours.
 *     parameters:
 *       - name: userId1
 *         in: path
 *         required: true
 *         description: The ID of the first user.
 *         schema:
 *           type: string
 *           example: "user1"
 *       - name: userId2
 *         in: path
 *         required: true
 *         description: The ID of the second user.
 *         schema:
 *           type: string
 *           example: "user2"
 *     responses:
 *       200:
 *         description: Messages retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   roomId:
 *                     type: string
 *                     description: The room ID for the conversation.
 *                     example: "user1-user2"
 *                   sender:
 *                     type: string
 *                     description: The user who sent the message.
 *                     example: "user1"
 *                   content:
 *                     type: string
 *                     description: The message content (decrypted).
 *                     example: "Hello, how are you?"
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp of when the message was sent.
 *       404:
 *         description: No messages found between the users.
 *       500:
 *         description: Error retrieving messages.
 */
router.get('/messages/:userId1/:userId2', getPreviousMessages);

module.exports = router;