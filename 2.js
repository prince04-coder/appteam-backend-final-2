const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path as necessary

// Function to ensure matches are mutual and remove non-reciprocal matches
async function ensureMutualMatches() {
  try {
    // Connect to MongoDB (update connection string as needed)
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');

    // Find all users
    const users = await User.find();

    for (let user of users) {
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

    console.log('Mutual match verification complete');

    // Close the connection after the operation
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error while ensuring mutual matches:', error);
    // Ensure the connection is closed in case of an error
    await mongoose.disconnect();
  }
}

// Execute the function
ensureMutualMatches();