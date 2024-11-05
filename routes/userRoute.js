


// const express = require('express');
// const userController = require('../controllers/user/userController');
// const router = express.Router();

// // User registration route
// router.post('/registerUser', userController.registerUser);

// // Update quiz answers route
// router.put('/updateQuizAnswers/:userId', userController.updateQuizAnswers);

// module.exports = router;]



// // routes/userRoutes.js
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/user/userController');

// // Route for user registration
// router.post('/register', userController.registerUser);

// // Route for user login (Firebase UID based)
// router.post('/login', userController.loginUser);

// // Route to fetch a user by Firebase UID
// router.get('/getByUID/:uid', userController.getUserByUID);

// // Update quiz answers route
// router.put('/updateQuizAnswers/:userId', userController.updateQuizAnswers);

// module.exports = router;

// routes/userRoute.js

const express = require('express');
const router = express.Router();  // This is the missing line causing the error
const userController = require('../controllers/user/userController');

// Route for user registration
router.post('/register', userController.registerUser);

// Route for user login (Firebase UID based)
router.post('/login', userController.loginUser);

// Route to fetch a user by Firebase UID
router.get('/getByUID/:uid', userController.getUserByUID);

// Update quiz answers route
router.put('/updateQuizAnswers/:userId', userController.updateQuizAnswers);

router.get('/getById/:id', userController.getUserById);

module.exports = router;


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firebaseUID:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         gender:
 *           type: string
 *           enum: [male, female]
 *         quizAnswers:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of 20 answers, each being 1, 2, 3, or 4
 *       required:
 *         - firebaseUID
 *         - username
 *         - email
 *         - dob
 *         - gender
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *                   description: MongoDB ObjectId of the new user
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user by Firebase UID
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firebaseUID:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mongoDbUserId:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 dob:
 *                   type: string
 *                 gender:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /user/getByUID/{uid}:
 *   get:
 *     summary: Fetch a user by Firebase UID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: Firebase UID of the user
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mongoDbUserId:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 dob:
 *                   type: string
 *                 gender:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /user/updateQuizAnswers/{userId}:
 *   put:
 *     summary: Update a user's quiz answers
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ObjectId of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quizAnswers:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of 20 answers, each being 1, 2, 3, or 4
 *     responses:
 *       200:
 *         description: Quiz answers updated successfully
 *       400:
 *         description: Validation error for quiz answers
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

module.exports = router;