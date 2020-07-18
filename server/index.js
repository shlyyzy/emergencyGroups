const path = require('path');
const cluster = require('cluster');
const cors = require('cors');
const express = require('express');
const numCPUs = require('os').cpus().length;
const socketio = require('socket.io');
const http = require('http');
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
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
    /*const {
      handleRegister,
      handleJoin,
      handleLeave,
      handleMessage,
      handleGetChatrooms,
      handleGetAvailableUsers,
      handleDisconnect
    } = makeHandleEvent(client, clientManager, chatroomManager);
    
    socket.on('register', handleRegister);

    socket.on('join', handleJoin);

    socket.on('leave', handleLeave);

    socket.on('message', handleMessage);

    socket.on('chatrooms', handleGetChatrooms);

    socket.on('availableUsers', handleGetAvailableUsers);

    socket.on('disconnect', function () {
      console.log('socket disconnect...', socket.id);
      handleDisconnect();
    })*/

    socket.on('error', function (err) {
      console.log('received error from socket:', socket.id);
      console.log(err);
    })
    socket.on('join', ({ name, room }, callback) => {
      id = socket.id;
      const { error, user } = addUser({ id, name, room });
  
      if(error) return callback(error);
  
      socket.join(user.room);
  
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
      callback();
    });
  
    socket.on('sendMessage', (message, callback) => { // listens for sendMessage event
      id = socket.id;
      const user = getUser(id);
  
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      callback();
    });
  /*io.on('connection', (socket) => { // socket-side socket
    console.log('connected!');
    
    socket.on('join', ({name, room}) => {
      console.log(name,room);
      const { error, user } = addUser({ id: socket.id, name, room });
      if (error) {
        return {error: error};
      }

      socket.emit('message', {user: 'admin', text: `${user.name} was added to the room`}); // to specific user
      socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} was added to the room`}); // to all users
      socket.join(user.room); // room is the unique hash
    });

    socket.on('sendMessage', (msg, callback) => { // run after event
      const user = getUser(socket.id);
      io.to(user.room).emit('message', {user: user.name, text: msg});

      callback();
    });

    socket.on('disconnect', () => {
      
    });*/
  });

  server.listen(process.env.PORT || PORT, () => {
    console.log(`listening on port ${PORT}`);
  });



  //app.use(express.static(path.resolve(__dirname, '../react-ui/public/')));
  
/*  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/public/')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });


  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/public', 'index.html'));
    //response.send('<h1>Chatbox</h1>');

  });

  /*app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
*/
}
