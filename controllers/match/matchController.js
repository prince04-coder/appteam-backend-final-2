
const User = require('../../models/User');
const BATCH_SIZE = 2000;  // Number of users to process per batch
const PARALLEL_BATCHES = 5;  // Number of parallel batches to run
const MAX_MATCHES = 8;   // Maximum number of matches for each user

// Function to get user counts by gender
async function getUserCounts() {
  const maleCount = await User.countDocuments({ gender: 'male', quizAnswers: { $exists: true, $ne: [] } });
  const femaleCount = await User.countDocuments({ gender: 'female', quizAnswers: { $exists: true, $ne: [] } });
  return { maleCount, femaleCount };
}

// Function to process a batch of users
async function processBatch(skip, limit, femaleUsers) {
  // Find users who have non-empty quiz answers
  const users = await User.find({ quizAnswers: { $exists: true, $ne: [] } }).skip(skip).limit(limit);
  
  for (let user of users) {
    const genderOpposite = user.gender === 'male' ? 'female' : 'male';

    // If user is male, ensure at least 2 matches
    if (user.gender === 'male') {
      // If there are enough females
      if (femaleUsers.length >= 2) {
        // Aggregation pipeline to find top matches
        const matches = await User.aggregate([
          {
            $match: {
              gender: 'female',
              _id: { $ne: user._id },
              quizAnswers: { $exists: true, $ne: [] }  // Exclude users without quiz answers
            }
          },
          {
            $project: {
              name: 1,
              gender: 1,
              quizAnswers: 1,
              score: {
                $size: {
                  $filter: {
                    input: { $zip: { inputs: ["$quizAnswers", user.quizAnswers] } },
                    as: "pair",
                    cond: { $eq: ["$$pair.0", "$$pair.1"] }
                  }
                }
              }
            }
          },
          {
            $sort: { score: -1 }
          },
          {
            $limit: 2 // Ensure at least 2 matches
          }
        ]);

        // Update the user with the found matches
        await User.findByIdAndUpdate(user._id, { $set: { matches: matches.map(m => m._id) } });
      } else {
        // If not enough females, match with available females (even if it's less than 2)
        const matches = await User.aggregate([
          {
            $match: {
              gender: 'female',
              _id: { $ne: user._id },
              quizAnswers: { $exists: true, $ne: [] }  // Exclude users without quiz answers
            }
          },
          {
            $project: {
              name: 1,
              gender: 1,
              quizAnswers: 1,
              score: {
                $size: {
                  $filter: {
                    input: { $zip: { inputs: ["$quizAnswers", user.quizAnswers] } },
                    as: "pair",
                    cond: { $eq: ["$$pair.0", "$$pair.1"] }
                  }
                }
              }
            }
          },
          {
            $sort: { score: -1 }
          },
          {
            $limit: MAX_MATCHES
          }
        ]);

        // Update the user with the found matches
        await User.findByIdAndUpdate(user._id, { $set: { matches: matches.map(m => m._id) } });
      }
    } else {
      // Similar logic for female users can be applied if needed
      const matches = await User.aggregate([
        {
          $match: {
            gender: 'male',
            _id: { $ne: user._id },
            quizAnswers: { $exists: true, $ne: [] }  // Exclude users without quiz answers
          }
        },
        {
          $project: {
            name: 1,
            gender: 1,
            quizAnswers: 1,
            score: {
              $size: {
                $filter: {
                  input: { $zip: { inputs: ["$quizAnswers", user.quizAnswers] } },
                  as: "pair",
                  cond: { $eq: ["$$pair.0", "$$pair.1"] }
                }
              }
            }
          }
        },
        {
          $sort: { score: -1 }
        },
        {
          $limit: MAX_MATCHES
        }
      ]);

      // Update the user with the found matches
      await User.findByIdAndUpdate(user._id, { $set: { matches: matches.map(m => m._id) } });
    }
  }

  console.log(`Processed batch with skip ${skip}`);
}

// Function to process users in parallel batches
async function processAllBatches(totalUsers, femaleUsers) {
  for (let i = 0; i < totalUsers; i += BATCH_SIZE * PARALLEL_BATCHES) {
    const batchPromises = [];

    for (let j = 0; j < PARALLEL_BATCHES && (i + j * BATCH_SIZE) < totalUsers; j++) {
      const skip = i + j * BATCH_SIZE;
      batchPromises.push(processBatch(skip, BATCH_SIZE, femaleUsers));
    }

    await Promise.all(batchPromises);
  }

  console.log('All batches processed!');
}

// Start matchmaking process manually or via a cron job
async function startMatchmaking() {
  try {
    const { maleCount, femaleCount } = await getUserCounts();
    const femaleUsers = await User.find({ gender: 'female', quizAnswers: { $exists: true, $ne: [] } });

    await processAllBatches(maleCount, femaleUsers);
  } catch (error) {
    console.error("Error during matchmaking process:", error);  // Log the error
    throw error;  // Rethrow the error for the API response
  }
}

module.exports = {
  startMatchmaking,
  processBatch
};