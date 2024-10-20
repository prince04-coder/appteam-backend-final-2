// const express = require("express");
// const userController = require('.././controllers/user/userController.js');
// const router = express.Router();

// router.post('/registerUser', userController.registerUser); // Register a new user



// module.exports = router;



const express = require('express');
const userController = require('../controllers/user/userController');
const router = express.Router();

// User registration route
router.post('/registerUser', userController.registerUser);

// Update quiz answers route
router.put('/updateQuizAnswers/:userId', userController.updateQuizAnswers);

module.exports = router;