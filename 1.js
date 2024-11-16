const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust path as necessary

// Function to remove matches for female users beyond the 8th match
async function trimMatchesForFemales() {
  try {
    // Connect to MongoDB (update connection string accordingly)
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');

    // Find all female users
    const femaleUsers = await User.find({ gender: 'female' });

    for (let user of femaleUsers) {
      if (user.matches.length > 8) {
        // Get matches beyond the 8th position
        const excessMatches = user.matches.slice(8);

        // Trim matches to the first 8 entries
        user.matches = user.matches.slice(0, 8);
        await user.save();
        console.log(`Updated user ${user._id}, matches trimmed to 8`);

        // Remove the current user's ID from the matches array of each user in the excess matches
        for (let matchId of excessMatches) {
          // Log match details before trying to remove
          console.log(`Attempting to remove ${user._id} from matches of user ${matchId}`);
          
          // Find the user before updating to verify matches
          const matchedUser = await User.findById(matchId);
          if (matchedUser && matchedUser.matches.includes(user._id.toString())) {
            console.log(`User ${user._id} found in matches of user ${matchId} before update`);

            const result = await User.findByIdAndUpdate(matchId, { $pull: { matches: user._id } });

            if (result) {
              console.log(`Removed user ${user._id} from matches of user ${matchId}`);
            } else {
              console.warn(`Failed to remove user ${user._id} from matches of user ${matchId}`);
            }
          } else {
            console.warn(`User ${user._id} not found in matches of user ${matchId}`);
          }
        }
      }
    }

    console.log('Trimming matches for females complete');

    // Close the connection after the operation
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error while trimming matches for females:', error);
    // Ensure the connection is closed in case of an error
    await mongoose.disconnect();
  }
}

// Execute the function
trimMatchesForFemales();