var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('newMessage', function (msg) {
    console.log('newMessage:', msg);
    var li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (msg) {
    console.log('newLocationMessage:', msg);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${msg.from}:`);
    a.attr('href', msg.url);
    li.append(a);
    jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var msg = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: msg.val()
    }, function (ack) {
        msg.val('');
    });
});

var sendLocation = jQuery('#sendLocation');
sendLocation.on('click', function () {
    if(!navigator.geolocation){
        return alert('Your Browser does not support GeoLocation');
    }

    sendLocation.attr('disabled', 'disabled').text('Sending location');

    navigator.geolocation.getCurrentPosition(function(position){
        sendLocation.removeAttr('disabled').text('Send location');
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        socket.emit('createLocation', {
           latitude,
           longitude
        });
    },function () {
        sendLocation.removeAttr('disabled').text('Send location');
        alert('Could not fetch GeoLocation.');
    });
})