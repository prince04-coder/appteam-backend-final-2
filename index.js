


require('dotenv').config();  // Make sure this is at the top

const express = require("express");
const http = require('http'); // Required to create the server
const socketIo = require('socket.io');
const connectDb = require('./db.js');
const cors = require('cors'); // Import cors
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { sendMessage, joinRoomAndFetchMessages } = require('./controllers/chat/chatController');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDb();

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API Documentation with WebSocket',
      version: '1.0.0',
      description: 'API documentation for Express app with WebSocket integration',
    },
    servers: [
      {
        url: `https://hillffair-backend-2k24.onrender.com`,
      },
    ],
  },
  apis: ['./routes/*.js'], // Paths to route files for Swagger to generate docs
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// Middleware for parsing JSON data
app.use(express.json());

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Serve Swagger documentation at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Create the server with http.createServer to handle both HTTP and WebSocket
const server = http.createServer(app);

// Initialize Socket.IO on the server
const io = socketIo(server, {
  cors: {
    origin: "*",  // Allow any origin for simplicity
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());

// Import and use various routes
// const authRoutes = require("./routes/authRoute.js");
// app.use('/auth', authRoutes);

const otpRoutes = require("./routes/otpRoute.js");
app.use('/verify-otp', otpRoutes);

const votingRoutes = require("./routes/votingRoute.js");
app.use('/voting', votingRoutes);

const memberRoutes = require("./routes/memberRoute.js");
app.use('/members', memberRoutes);

const submitFormAnswersRoutes = require("./routes/submitFormAnswersRoute.js");
app.use('/submitFormAnswers', submitFormAnswersRoutes);

const matchRoutes = require("./routes/matchRoute.js");
app.use('/match', matchRoutes);

const highlightRoutes = require('./routes/highlightRoute');
app.use('/highlight', highlightRoutes);

const eventRoutes = require('./routes/eventRoute');
app.use('/event', eventRoutes);


const questionRoutes = require('./routes/questionRoute');
app.use('/questions', questionRoutes);

//Route fro user information filled during firebase authentication
const userRoutes = require('./routes/userRoute');
app.use('/user', userRoutes);

// Chat routes
const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

// Socket.IO integration for chat functionality
// io.on('connection', (socket) => {
//   console.log('New client connected');

//   socket.on('joinRoomAndSendMessage', (userId1, userId2, messageContent) => {
//     const chatController = require('./controllers/chat/chatController');
//     chatController.sendMessage(socket, userId1, userId2, messageContent);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', (userId1, userId2) => {
      joinRoomAndFetchMessages(socket, userId1, userId2);
  });

  socket.on('joinRoomAndSendMessage', (userId1, userId2, messageContent) => {
    console.log(messageContent)
      sendMessage(socket, userId1, userId2, messageContent);
    // joinRoomAndFetchMessages(socket, userId1, userId2); // Fetch previous messages after sending
  });

  

  // Disconnect and leave room
  socket.on('disconnect', () => {
      console.log('Client disconnected');
      
      // const roomId = generateRoomId(userId1, userId2);  // Assuming you have user IDs available
      // socket.leave(roomId);  // Leave the specific room
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
});

// Start the server (use `server.listen` instead of `app.listen`)
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger docs available at https://hillffair-backend-2k24.onrender.com/api-docs`);
});
