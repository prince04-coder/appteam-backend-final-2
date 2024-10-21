const Message = require('../../models/Message');

// Send message and join room
exports.sendMessage = async (socket, userId1, userId2, messageContent) => {
    const roomId = generateRoomId(userId1, userId2);
    socket.join(roomId);

    const message = new Message({ roomId, sender: userId1, content: messageContent });
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
exports.joinRoomAndFetchMessages = async (socket, userId1, userId2) => {
    const roomId = generateRoomId(userId1, userId2);
    socket.join(roomId);

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    try {
        const messages = await Message.find({
            roomId: roomId,
            timestamp: { $gte: twentyFourHoursAgo }
        }).sort({ timestamp: 1 });

        // Emit previous messages to the user
        socket.emit('previousMessages', messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

// Generate room id
function generateRoomId(userId1, userId2) {
    return [userId1, userId2].sort().join('-');
}
