const path = require('path');
const cluster = require('cluster');
const cors = require('cors');
const express = require('express');
const numCPUs = require('os').cpus().length;
const socketio = require('socket.io');
const http = require('http');
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
const { addUser, removeUser, getUser, getUsersInRoom, getMessages, addMessage } = require('./users');
const makeHandleEvent = require('./handler');
const router = require('./router'); //middleware

const app = express();
app.use(router);
app.use(cors());

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });
} else {
  
  const server = http.createServer(app);
  const io = socketio(server); // socket.io instance

  io.on('connect', (socket) => {

    socket.on('error', function (err) {
      console.log('received error from socket:', socket.id);
      console.log(err);
    })
    socket.on('join', ({ name, room }, callback) => {
      id = socket.id;
      const { error, user } = addUser({ id, name, room });
  
      if(error) return callback(error);
  
      socket.join(user.room);
      console.log(getMessages(user.room));
      const messages = getMessages(user.room);
      if (messages) {
        socket.emit('render', messages);
      }
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
      callback();
    });
  
    socket.on('sendMessage', (message, room, callback) => { // listens for sendMessage event
      id = socket.id;
      const user = getUser(id);
      addMessage(user, room, message);
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      callback();
    });
  
  });

  server.listen(process.env.PORT || PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}
