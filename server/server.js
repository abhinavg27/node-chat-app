const express = require('express');
const path = require('path');
const http = require('http');
const socketID = require('socket.io');
const app = express();
const {generateMessage,generateLocationMessage} = require('./utils/message');
var server = http.createServer(app);
var io = socketID(server);

var publicFolder = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;

app.use(express.static(publicFolder));

io.on('connection', (socket)=>{
    console.log('New user is connected');

    socket.emit('newMessage', generateMessage('Admin','Welcome to New User!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin','New User has Joined!'));

    socket.on('createMessage', (msg, callback) =>{
        console.log('createMessage:', msg);
        io.emit('newMessage', generateMessage(msg.from,msg.text));
        callback();
    });

    socket.on('createLocation', (cordinates) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin',cordinates.latitude,cordinates.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User is disconnected');
    });
});

server.listen(port, ()=>{
    console.log(`Server is up on ${port} port`);
});