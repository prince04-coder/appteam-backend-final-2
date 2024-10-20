// // userController.js
// const User = require('../../models/User'); // Ensure this path is correct

// // Registration of user
// exports.registerUser = async (req, res) => {
//     const { username, email, dob, gender } = req.body;

//     try {
//         const newUser = new User({
//             username,
//             email,
//             dob,
//             gender
//         });

//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully", user: newUser });
//     } catch (error) {
//         console.error(error.message);
//         if (error.code === 11000) { // Duplicate key error
//             return res.status(400).json({ message: "Email already exists." });
//         }
//         res.status(500).json({ message: "Server Error" });
//     }
// };







const User = require('../../models/User');

// Register a new user
// exports.registerUser = async (req, res) => {
//     const { username, email, dob, gender } = req.body;

    // // Validate required fields
    // if (!username || !email || !dob || !gender) {
    //     return res.status(400).json({ message: "All fields are required." });
    // }

    // // Email format validation
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //     return res.status(400).json({ message: "Invalid email format." });
    // }

//     try {
//         const newUser = new User({
//             username,
//             email,
//             dob,
//             gender
//         });

//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully", user: newUser });
//     } catch (error) {
//         console.error(error.message);
//         if (error.code === 11000) { // Duplicate email error
//             return res.status(400).json({ message: "Email already exists." });
//         }
//         res.status(500).json({ message: "Server Error" });
//     }
// };

// exports.registerUser = async (req, res) => {
//     const { username, email, dob, gender } = req.body;

//     // Validate required fields
//     if (!username || !email || !dob || !gender) {
//         return res.status(400).json({ message: "All fields are required." });
//     }

//     // Email format validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         return res.status(400).json({ message: "Invalid email format." });
//     }

//     try {
//         const newUser = new User({
//             username,
//             email,
//             dob,
//             gender
//             // Do not include quizAnswers here
//         });

//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully", user: newUser });
//     } catch (error) {
//         console.error(error.message);
//         if (error.code === 11000) { // Duplicate email error
//             return res.status(400).json({ message: "Email already exists." });
//         }
//         res.status(500).json({ message: "Server Error" });
//     }
// };


exports.registerUser = async (req, res) => {
    const { username, email, dob, gender } = req.body;

    // Validate required fields
    if (!username || !email || !dob || !gender) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newUser = new User({
            username,
            email,
            dob,
            gender
            // Missing a comma here
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
}; // Ensure this is closed correctly

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