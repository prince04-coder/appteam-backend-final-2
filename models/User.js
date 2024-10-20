


const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({

  firebaseUID: {
    type: String
  },

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    // quizAnswers: {
    //     type: [Number],
    //     validate: {
    //         validator: function(array) {
    //             return array.length === 15 && array.every(answer => [1, 2, 3, 4].includes(answer));
    //         },
    //         message: 'quizAnswers must contain exactly 15 elements, each being 1, 2, 3, or 4.'
    //     }
    // }
    quizAnswers: {
      type: [Number],
      validate: {
          validator: function(array) {
              // Validate only if quizAnswers is provided
              return !array || (array.length === 20 && array.every(answer => [1, 2, 3, 4].includes(answer)));
          },
          message: 'quizAnswers must contain exactly 15 elements, each being 1, 2, 3, or 4.'
      },
      default: undefined // Ensure it defaults to undefined if not provided
  }
});



// Add index to the gender field
UserSchema.index({ gender: 1 });

// Optionally, index quizAnswers for more complex queries (multikey index)
UserSchema.index({ quizAnswers: 1 });



//defining model
const User = mongoose.model('User', UserSchema);

module.exports = User;