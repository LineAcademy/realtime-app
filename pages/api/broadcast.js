export default function handler(req, res) {
  const io = res.socket.server.io;
  const { message } = req.body;

  if (!io) {
    return res.status(500).json({ error: 'Socket.IO not initialized' });
  }

  io.emit('broadcast-message', { message });

  res.status(200).json({ success: true });
}
