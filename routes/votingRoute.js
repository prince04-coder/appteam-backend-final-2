const express = require("express");
const votingController = require('.././controllers/voting/votingController.js')
const authMiddleware = require('./../middlewares/authMiddleware');
const router = express.Router();

router.post('/vote/:clubId',authMiddleware.auth, votingController.voteClub);
router.post('/vote-count', votingController.voteCount);
router.post('/register-club', votingController.addClub);

module.exports = router;