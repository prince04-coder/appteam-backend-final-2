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




const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  roomId: { type: String, required: true },
  sender: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;