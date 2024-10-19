
/**
 * @swagger
 * components:
 *   schemas:
 *     HighlightImage:
 *       type: object
 *       required:
 *         - url
 *         - title
 *       properties:
 *         url:
 *           type: string
 *           description: URL of the highlight image
 *         title:
 *           type: string
 *           description: Title of the highlight image
 *       example:
 *         url: "https://example.com/image.jpg"
 *         title: "Beautiful Landscape"
 */

const express = require('express');
const router = express.Router();
const highlightController = require('../controllers/highlightController');
/**
 * @swagger
 * /highlights:
 *   get:
 *     summary: Get all highlight images
 *     tags: [Highlight Images]
 *     responses:
 *       200:
 *         description: A list of all highlight images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HighlightImage'
 *       500:
 *         description: Server error
 */
router.get('/highlights', highlightController.highlighter);

/**
 * @swagger
 * /highlights-post:
 *   post:
 *     summary: Add a new highlight image
 *     tags: [Highlight Images]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HighlightImage'
 *     responses:
 *       201:
 *         description: The highlight image was successfully added
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/highlights-post', highlightController.highlighterPost);

module.exports = router;