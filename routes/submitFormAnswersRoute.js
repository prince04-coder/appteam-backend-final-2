const express = require("express");
const submitFormAnswersController = require('.././controllers/submitFormAnswers/submitFormAnswersController.js');
const router = express.Router();

// router.post('/registerMember', matchController.registerMember);
// router.get('/get-members/:clubName', matchController.getAllMembers);

// Endpoint to submit quiz answers
router.post('/submit-quiz/:userId', submitFormAnswersController.submitFormAnswer);

module.exports = router;