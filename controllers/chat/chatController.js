const Message = require('../../models/Message');

// Send message and join room
exports.sendMessage = async (socket, userId1, userId2, messageContent) => {
  const roomId = generateRoomId(userId1, userId2);
  socket.join(roomId);

  const message = new Message({ roomId, sender: userId1, content: messageContent });
  await message.save();

  socket.to(roomId).emit('privateMessage', message);
};

//Get previous messages
exports.getPreviousMessages = async (req, res) => {
    const { userId1, userId2 } = req.params;
    const roomId = generateRoomId(userId1, userId2);
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    try {
        const messages = await Message.find({
            roomId: roomId,
            timestamp: { $gte: twentyFourHoursAgo } // Only get messages from the last 24 hours
        }).sort({ timestamp: 1 }); // Sort messages by timestamp in ascending order

        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching messages' });
    }
};

// Generate room id

function generateRoomId(userId1, userId2) {
  return [userId1, userId2].sort().join('-');
}