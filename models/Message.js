// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define schema for messages
// const messageSchema = new Schema({
//   roomId: {
//     type: String,  // Room ID for the chat
//     required: true
//   },
//   sender: {
//     type: String,  // The user who sent the message
//     required: true
//   },
//   content: {
//     type: String,  // Message content
//     required: true
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now  // Automatically store the time when the message was created
//   }
// });

// // Create and export the Message model
// const Message = mongoose.model('Message', messageSchema);
// module.exports = Message;




// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const messageSchema = new Schema({
//   roomId: { type: String, required: true },
//   sender: { type: String, required: true },
//   content: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now }
// });

// const Message = mongoose.model('Message', messageSchema);
// module.exports = Message;





// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define schema for messages
// const messageSchema = new Schema({
//   roomId: {
//     type: String,  // Room ID for the chat
//     required: true
//   },
//   sender: {
//     type: String,  // The user who sent the message
//     required: true
//   },
//   content: {
//     type: String,  // Message content
//     required: true
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now  // Automatically store the time when the message was created
//   }
// });

// // Create and export the Message model
// const Message = mongoose.model('Message', messageSchema);
// module.exports = Message;


const moment = require('moment-timezone');

const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const dotenv = require('dotenv').config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 32 characters for AES-256
const IV_LENGTH = 16; // For AES, this is always 16

// Encryption function
function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

// Decryption function
function decrypt(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = textParts.join(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const messageSchema = new Schema({
  roomId: { type: String, required: true },
  sender: { type: String, required: true },
  content: { type: String, required: true },
  reciever:{type:String, required: true},
  timestamp: {
    type: Date,
    default: () => moment().tz("Asia/Kolkata").toDate()
  },
  read: { type: Boolean, default: false } // Track read status

});

// Middleware to encrypt message before saving
messageSchema.pre('save', function (next) {
  if (this.isModified('content')) {
    this.content = encrypt(this.content);
  }
  next();
});

// Middleware to decrypt message after finding
messageSchema.post('find', function (docs) {
  docs.forEach(doc => {
    if (doc.content) {
      doc.content = decrypt(doc.content);
    }
  });
});

messageSchema.post('findOne', function (doc) {
  if (doc && doc.content) {
    doc.content = decrypt(doc.content);
  }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
