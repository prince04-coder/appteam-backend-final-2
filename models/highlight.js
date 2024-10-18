const mongoose =require('mongoose');
const imageSchema = new mongoose.Schema({
   url:{
    type: String,
    required: true
   },
   title:{
    type: String,
    required: true
   }
    // Add other fields as needed
  });
  
//   const Image = mongoose.model('Image', imageSchema);

const HighlightImage = mongoose.model('HighlightImage', imageSchema);
module.exports = HighlightImage;