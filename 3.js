const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust path as necessary

// Function to ensure mutual matches for male users
async function ensureMutualMatchesForMales() {
  try {
    // Connect to MongoDB (update connection string accordingly)
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');

    // Find all male users
    const maleUsers = await User.find({ gender: 'male' });

    for (let user of maleUsers) {
      let needsUpdate = false; // Flag to indicate if the user's matches array needs updating

      for (let matchId of user.matches) {
        const matchedUser = await User.findById(matchId);

        if (matchedUser) {
          // Check if the current user's ID is present in the matched user's matches array
          if (!matchedUser.matches.includes(user._id.toString())) {
            // If not mutual, remove the match ID from the current user's matches array
            user.matches = user.matches.filter(id => id.toString() !== matchId.toString());
            console.log(`Removed non-reciprocal match ${matchId} from user ${user._id}`);
            needsUpdate = true;
          }
        } else {
          // If the matched user does not exist (e.g., deleted user), remove the ID
          user.matches = user.matches.filter(id => id.toString() !== matchId.toString());
          console.log(`Removed non-existent match ${matchId} from user ${user._id}`);
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        await user.save(); // Save the updated user document
        console.log(`Updated user ${user._id} matches array`);
      }
    }

    console.log('Mutual match verification complete for males');

    // Close the connection after the operation
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error while ensuring mutual matches for males:', error);
    // Ensure the connection is closed in case of an error
    await mongoose.disconnect();
  }
}

// Execute the function
ensureMutualMatchesForMales();