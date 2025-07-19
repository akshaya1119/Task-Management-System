const http = require('http');
const socketio = require('socket.io');
const app = require('./app');

// Create HTTP server using the Express app
const server = http.createServer(app);

// Attach socket.io to the same server
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('🔌 New client connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId); // Join personal room based on userId
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// Export the server and io instance
module.exports = { server, io };
