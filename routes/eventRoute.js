


/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - url
 *         - title
 *         - description
 *       properties:
 *         url:
 *           type: string
 *           description: URL of the event
 *         title:
 *           type: string
 *           description: Title of the event
 *         description:
 *           type: string
 *           description: Description of the event
 *       example:
 *         url: "https://example.com/event.jpg"
 *         title: "Tech Conference 2024"
 *         description: "An event about the latest in technology."
 */

const express = require('express');
const router = express.Router();

const eventController = require('../controllers/events/eventController');

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: A list of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Server error
 */
router.get('/events', eventController.Event);

/**
 * @swagger
 * /events-post:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: The event was successfully created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/events-post', eventController.EventPost);

module.exports = router;