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
  password: {
    type: String,
    required: true,   
  },
  otp: String,
  verified: {
    type: Boolean,
    default: false
  },
  isVoted: {
    type: Boolean, default: false
    },

  created: {
    type: Date,
    default: Date.now,
  },
  clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club'}],
});

//defining model
const User = mongoose.model('User', UserSchema);

module.exports = User;