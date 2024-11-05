const Member = require('../../models/Member');


//Registration of member
exports.registerMember = async(req, res)=>{
    const {name, clubName, position, image} = req.body;
 try{

    const newMember = new Member({
        name,
        clubName,
        position, image
      });
  
      //save
       await newMember.save();
      res
        .status(201)
        .json({ message: "Member registered successfully, OTP sent to email" });

 }catch(error){
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
 }
};


// get all members of a club in sorted ordder of  theri respective position in the club

exports.getAllMembers = async(req, res)=>{
    try{
        // // find all members and sort them in ascending order
        // const members = await Member.find().sort({ position: 1 });
        // //map the members according to their name, club name and position
        // const memberList = members.map((member) => {
        //     return { name: member.name, clubName: member.clubName, position: member.position };
        // }); 
        // return res.status(200).json(memberList);



        const clubName = req.params.clubName;

        // Fetch members by club name and sort by position in ascending order
        const members = await Member.find({ clubName })
        .select('name position')
            .sort({ position: 1 }) // Ascending order, assuming position is a string
            .exec();

        res.status(200).json(members);

    }
    catch (error){
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
}
