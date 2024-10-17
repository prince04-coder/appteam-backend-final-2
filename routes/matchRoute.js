const express = require('express');
const router = express.Router();
const { startMatchmaking } = require('../controllers/match/matchController');
const User = require('../models/User');

// Route to manually trigger the matchmaking process
router.post('/matchmaking', async (req, res) => {
  try {
    await startMatchmaking();
    res.status(200).json({ message: 'Matchmaking process started successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error starting matchmaking process' });
  }
});

// Route to get the matches for a particular user
router.get('/matches-found/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('matches', 'name gender quizAnswers');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'Matches retrieved successfully',
      matches: user.matches
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user matches' });
  }
});

module.exports = router;