





const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); // Import faker from @faker-js/faker
const User = require('./models/User'); // Update with the correct path to your User model
require('dotenv').config();
// Connect to MongoDB
const mongoURI = process.env.MONGO_URI; // Replace with your MongoDB connection string





mongoose.connect(mongoURI, { useUnifiedTopology: true }) // Removed useNewUrlParser
  .then(() => {
    console.log('MongoDB connected successfully.');
    generateFakeUsers(100); // Generate 300 fake users
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Function to generate fake users
async function generateFakeUsers(numUsers) {
  try {
    const users = [];
    
    for (let i = 0; i < numUsers; i++) {
      const user = {
        username: faker.internet.userName(),
        quizAnswers: Array.from({ length: 15 }, () => faker.helpers.arrayElement([1, 2, 3, 4])), // Generate 15 answers, each 1, 2, 3, or 4
        gender: faker.helpers.arrayElement(['male', 'female']), // Randomly select gender
      };
      users.push(user);
    }
    
    // Insert fake users into the database
    await User.insertMany(users);
    console.log(`${numUsers} fake users generated successfully.`);
  } catch (error) {
    console.error('Error generating fake users:', error);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
}