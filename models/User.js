const mongoose = require('mongoose');

//userschema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  //gender dob  



  // password: {
  //   type: String,
  //   required: true,   
  // },
  // otp: String,
  // verified: {
  //   type: Boolean,
  //   default: false
  // },
  // isVoted: {
  //   type: Boolean, default: false
  //   },

  // created: {
  //   type: Date,
  //   default: Date.now,
  // },
  
  //clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club'}],

  quizAnswers: {
    type: [Number],
    validate: {
      validator: function(array) {
        // Ensure the array has exactly 15 elements
        if (array.length !== 15) {
          return false;
        }
        // Ensure each element is 1, 2, 3, or 4
        return array.every(answer => [1, 2, 3, 4].includes(answer));
      },
      message: 'quizAnswers must contain exactly 15 elements, each being 1, 2, 3, or 4.'
    }
  }, 
   matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  gender: { type: String, enum: ['male', 'female'] },
  

});

// Add index to the gender field
UserSchema.index({ gender: 1 });

// Optionally, index quizAnswers for more complex queries (multikey index)
UserSchema.index({ quizAnswers: 1 });



//defining model
const User = mongoose.model('User', UserSchema);

module.exports = User;