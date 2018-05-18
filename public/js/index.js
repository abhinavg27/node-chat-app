var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('newMessage', function (msg) {
    console.log('newMessage:', msg);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});