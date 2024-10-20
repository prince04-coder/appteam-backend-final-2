






// const User = require('../../models/User');


// exports.registerUser = async (req, res) => {
//     const { username, email, dob, gender } = req.body;

//     // Validate required fields
//     if (!username || !email || !dob || !gender) {
//         return res.status(400).json({ message: "All fields are required." });
//     }

//     try {
//         const newUser = new User({
//             username,
//             email,
//             dob,
//             gender
//             // Missing a comma here
//         });

//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully", user: newUser });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: "Server Error" });
//     }
// }; // Ensure this is closed correctly

// // Update quiz answers
// exports.updateQuizAnswers = async (req, res) => {
//     const { userId } = req.params;
//     const { quizAnswers } = req.body;

//     // Validate quizAnswers
//     if (!Array.isArray(quizAnswers) || quizAnswers.length !== 20 || !quizAnswers.every(answer => [1, 2, 3, 4].includes(answer))) {
//         return res.status(400).json({ message: "quizAnswers must contain exactly 15 elements, each being 1, 2, 3, or 4." });
//     }

//     try {
//         const user = await User.findByIdAndUpdate(
//             userId,
//             { quizAnswers },
//             { new: true } // Return the updated user
//         );

//         if (!user) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         res.status(200).json({ message: "Quiz answers updated successfully", user });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: "Server Error" });
//     }
// };









// controllers/userController.js
const User = require('../../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
  const { firebaseUID, username, email, dob, gender } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ firebaseUID });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    user = new User({
      firebaseUID,
      username,
      email,
      dob,
      gender,
    });

    // Save the user to MongoDB
    await user.save();
    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id,  // Send back MongoDB ObjectId
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login user and return MongoDB ObjectId based on Firebase UID
exports.loginUser = async (req, res) => {
  const { firebaseUID } = req.body;

  try {
    // Find the user by Firebase UID
    const user = await User.findOne({ firebaseUID });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send back the MongoDB ObjectId and user details
    res.json({
      mongoDbUserId: user._id,  // MongoDB ObjectId
      username: user.username,
      email: user.email,
      dob: user.dob,
      gender: user.gender
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Fetch user by Firebase UID (as you requested earlier)
exports.getUserByUID = async (req, res) => {
  const firebaseUID = req.params.uid;

  try {
    // Fetch the user from MongoDB by Firebase UID
    const user = await User.findOne({ firebaseUID });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the MongoDB ObjectId and other user data
    res.json({
      mongoDbUserId: user._id,
      username: user.username,
      email: user.email,
      dob: user.dob,
      gender: user.gender
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};



// Update quiz answers
exports.updateQuizAnswers = async (req, res) => {
    const { userId } = req.params;
    const { quizAnswers } = req.body;

    // Validate quizAnswers
    if (!Array.isArray(quizAnswers) || quizAnswers.length !== 20 || !quizAnswers.every(answer => [1, 2, 3, 4].includes(answer))) {
        return res.status(400).json({ message: "quizAnswers must contain exactly 15 elements, each being 1, 2, 3, or 4." });
    }

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { quizAnswers },
            { new: true } // Return the updated user
        );

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "Quiz answers updated successfully", user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
};
