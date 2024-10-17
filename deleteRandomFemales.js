const mongoose = require('mongoose');
const User = require('./models/User'); // Update with correct path to your User model

// Connect to MongoDB
const mongoURI = 'mongodb+srv://khandelwalprince04:appteam@cluster0.hsu22.mongodb.net/hillfair'; // Replace with your MongoDB connection string

mongoose.connect(mongoURI, { useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully.');
    deleteRandomFemaleUsers(54); // Delete 54 random female users
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Function to delete random female users
async function deleteRandomFemaleUsers(numToDelete) {
  try {
    // Find random female users
    const females = await User.find({ gender: 'female' }).limit(numToDelete).lean();
    
    // Check if we have enough users to delete
    if (females.length < numToDelete) {
      console.log(`Only found ${females.length} female users to delete.`);
    } else {
      // Delete the found female users
      await User.deleteMany({ _id: { $in: females.map(user => user._id) } });
      console.log(`Successfully deleted ${numToDelete} random female users.`);
    }
  } catch (error) {
    console.error('Error deleting female users:', error);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
}