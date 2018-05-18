const express = require('express');
const path = require('path');
const http = require('http');
const socketID = require('socket.io');
const app = express();
var server = http.createServer(app);
var io = socketID(server);

var publicFolder = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;

app.use(express.static(publicFolder));

io.on('connection', (socket)=>{
    console.log('New user is connected');

    socket.emit('newMessage', {
       from: 'Admin',
       text: 'Welcome to New User'
    });

    socket.broadcast.emit('newMessage', {
       from: 'Admin',
       text: 'New user has joined'
    });

    socket.on('createMessage', (msg) =>{
        console.log('createMessage:', msg);
        socket.broadcast.emit('newMessage', {
            from: msg.from,
            text: msg.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('User is disconnected');
    });
});

server.listen(port, ()=>{
    console.log(`Server is up on ${port} port`);
});