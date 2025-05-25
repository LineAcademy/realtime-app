const express = require('express');
const next = require('next');
const http = require('http');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

let io;

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);

  io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);
  });

  server.use(express.json());

  server.post('/api/broadcast', (req, res) => {
    const { message } = req.body;
    if (io) {
      io.emit('broadcast-message', { message });
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: 'Socket.IO not ready' });
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  httpServer.listen(port, () => {
    console.log(`🚀 Server ready on http://localhost:${port}`);
  });
});
