const User = require('../../models/User');


// submition of answers of forms
exports.submitFormAnswer= async (req, res) => {
    try{
        const { gender, quizAnswers } = req.body;  
        const  userId = req.params.userId;
        let User = await User.findOne({ _id: userId });
        
    
        if (User) {
            // If User exists, update gender and append new quiz answers
            User.gender = gender;  // Update gender
            User.quizAnswers = [...User.quizAnswers, ...quizAnswers];  // Append new answers to the existing array
          } else {
            // If User doesn't exist, return an error response
            return res.status(404).json({ message: 'User not found' });
          }
      
          // Save the updated User document
          await User.save();
      
          res.json({ message: 'Quiz answers and gender updated!', User });
       
    }catch(error){   console.error(error.message);
        res.status(500).json({ message: "Server Error" });}

   
  }