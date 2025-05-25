import { Server } from 'socket.io';

let io;

export default function handler(req, res) {
  if (!io) {
    io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('✅ Client connected:', socket.id);
    });
  }
  res.end();
}