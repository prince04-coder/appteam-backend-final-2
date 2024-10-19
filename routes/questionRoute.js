const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question/questionController');

// Get request for questions
router.get('/question', questionController.Question); // Changed to '/' to match the base route
// Post request for adding a new question
router.post('/questions-post', questionController.QuestionPost);

module.exports = router; // Make sure to export the router