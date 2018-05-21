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
    socket.emit('createMessage', {
       from: 'User',
        text: jQuery('[name=message]').val()
    }, function (ack) {

    });
});

var sendLocation = jQuery('#sendLocation');
sendLocation.on('click', function () {
    if(!navigator.geolocation){
        return alert('Your Browser does not support GeoLocation');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        socket.emit('createLocation', {
           latitude,
           longitude
        });
    },function () {
        alert('Could not fetch GeoLocation.');
    });
})