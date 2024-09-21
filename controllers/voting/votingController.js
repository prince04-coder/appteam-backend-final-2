const exp = require('constants');
const Club = require('../../models/Club');
const User = require('../../models/User');

// to vote clubs
exports.voteClub = async (req, res) => {
    const clubId = req.params.clubId;
    const userId = req.user.id;

    try {
        // find the club
        const club = await Club.findById(clubId);
        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVoted) {
            return res.status(400).json({ message: 'User already voted' });
        }

        // update the club document
        club.votes.push({ user: req.user.id });
        club.voteCount += 1;

        await club.save();

        // update user document
        user.isVoted = true;
        //user.clubs.push({cbId})
        await user.save();

        res.status(200).json({ message: 'Vote added successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
};
// vote count
exports.voteCount= async (req, res)=>{
try{
    // find all club and sort them in descending order
    const clubs = await Club.find().sort({ voteCount: -1 });
    //map the club according to their naeme and vote count
    const clubVotes = clubs.map((club) => {
        return { name: club.name, voteCount: club.voteCount };
    }); 
    return res.status(200).json(clubVotes);
}catch(error){ console.error(error.message);
    res.status(500).json({ message: "Server Error" });}
}
// add clubs
exports.addClub = async (req, res) => {
      const { name } = req.body;
    try {
      
        const newClub = new Club({ name, voteCount: 0, votes: [] });
        await newClub.save();
        res.status(201).json({ message: 'Club added successfully', club: newClub });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
}