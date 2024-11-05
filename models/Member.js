const mongoose =require('mongoose');
const MemberSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  clubName:{
    type: String,
    required: true
  },
  image:{
    type: String
  
  },
   
  position: {
    type: Number,
    required: true,
//enum: [1,2,3,4,5] // Example positions
validate: {
    validator: function(value) {
        return [1, 2, 3, 4, 5].includes(value); // Ensure the value is in the array
    },
    message: props => `${props.value} is not a valid position!`
}
}
 


  });
  module.exports = mongoose.model('Member', MemberSchema);