


// const express = require('express');
// const userController = require('../controllers/user/userController');
// const router = express.Router();

// // User registration route
// router.post('/registerUser', userController.registerUser);

// // Update quiz answers route
// router.put('/updateQuizAnswers/:userId', userController.updateQuizAnswers);

// module.exports = router;]



// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user/userController');

// Route for user registration
router.post('/register', userController.registerUser);

// Route for user login (Firebase UID based)
router.post('/login', userController.loginUser);

// Route to fetch a user by Firebase UID
router.get('/getByUID/:uid', userController.getUserByUID);

// Update quiz answers route
router.put('/updateQuizAnswers/:userId', userController.updateQuizAnswers);

module.exports = router;

