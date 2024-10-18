const mongoose =require('mongoose');
const EventSchema = new mongoose.Schema({
   url:{
    type: String,
    required: true
   },
   title:{
    type: String,
    required: true
   },
   description:{
    type: String,
    required: true
   }
    // Add other fields as needed
  });
  
  module.exports = mongoose.model('Event', EventSchema);
