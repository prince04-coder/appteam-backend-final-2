// const Message = require('../../models/Message');

// // // Send message and join room
// // exports.sendMessage = async (socket, userId1, userId2, messageContent) => {
// //   const roomId = generateRoomId(userId1, userId2);
// //   socket.join(roomId);

// //   const message = new Message({ roomId, sender: userId1, content: messageContent });
// //   await message.save();

// //   socket.to(roomId).emit('privateMessage', message);
// // };



// exports.sendMessage = async (socket, userId1, userId2, messageContent) => {
//   const roomId = generateRoomId(userId1, userId2);
//   socket.join(roomId);

//   const message = new Message({ roomId, sender: userId1, content: messageContent });
//   try {
//       await message.save();
//       socket.to(roomId).emit('privateMessage', message);
//   } catch (error) {
//       console.error('Error saving message:', error);
//   }
// };

// //Get previous messages
// exports.getPreviousMessages = async (req, res) => {
//     const { userId1, userId2 } = req.params;
//     const roomId = generateRoomId(userId1, userId2);
//     const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

//     try {
//         const messages = await Message.find({
//             roomId: roomId,
//             timestamp: { $gte: twentyFourHoursAgo } // Only get messages from the last 24 hours
//         }).sort({ timestamp: 1 }); // Sort messages by timestamp in ascending order

//         return res.status(200).json(messages);
//     } catch (error) {
//         return res.status(500).json({ error: 'Error fetching messages' });
//     }
// };

// // Generate room id

// function generateRoomId(userId1, userId2) {
//   return [userId1, userId2].sort().join('-');
// }








const Message = require('../../models/Message');

// Send message and join room
exports.sendMessage = async (socket, userId1, userId2, messageContent) => {
    const roomId = generateRoomId(userId1, userId2);
   socket.join(roomId);

    const message = new Message({ roomId, sender: userId1,reciever:userId2, content: messageContent });
    console.log(message);
    try {
        await message.save();
        // Emit the message to the room (decrypted when fetched)
        socket.to(roomId).emit('privateMessage', message);
        socket.emit('privateMessage', message); // Send message back to the sender as well
    } catch (error) {
        console.error('Error saving message:', error);
    }
};

// Handle user joining room and automatically sending last 24-hour messages
exports.fetchMessages = async (req, res) => {
    
    const { userId1, userId2 } = req.params;
    const roomId = generateRoomId(userId1, userId2);
    console.log(roomId)
    //socket.join(roomId);

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
//     try {
      
//   // Send the messages as a JSON response
//   res.status(200).json(messages);
//         // Emit previous messages to the user
//       //  socket.emit('previousMessages', messages);
//     }

try {
      const messages = await Message.find({
            roomId: roomId,
            timestamp: { $gte: twentyFourHoursAgo }
        }).sort({ timestamp: 1 });

    // If no messages are found, return a 404 error
    if (!messages || messages.length === 0) {
        return res.status(404).json({ error: 'No messages found' });
    }

    // Send decrypted messages as response
    res.status(200).json(messages.map(message => ({
        content: message.content, // Decrypted content
        timestamp: message.timestamp
    })));
}
     catch (error) {
        console.error('Error fetching messages:', error);
    }
};

// Generate room id
function generateRoomId(userId1, userId2) {
    return [userId1, userId2].sort((a, b) => a.localeCompare(b)).join('-');
}