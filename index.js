const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Para servir archivos estáticos (como tu HTML)

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  // Enviar la oferta de WebRTC a otro usuario
  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer);
  });

  // Enviar la respuesta de WebRTC
  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
  });

  // Enviar los candidatos ICE
  socket.on('ice-candidate', (candidate) => {
    socket.broadcast.emit('ice-candidate', candidate);
  });

  // Enviar mensaje de chat
  socket.on('chat-message', (message) => {
    console.log('Mensaje recibido:', message);
    socket.broadcast.emit('chat-message', message); // Enviar el mensaje al otro usuario
  });

  // Cuando un usuario se desconecta
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
