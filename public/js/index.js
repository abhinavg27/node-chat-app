var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        From: 'This msg is from client side',
        text: 'Hey, this is in response to your mail.'
    });

});

socket.on('newMessage', function (msg) {
    console.log('newMessage:', msg);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});