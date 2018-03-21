var socket = io();
socket.on('connect', () => {
    console.log('Connected to server');
});
socket.on('disconnect', () => {
    console.log('Disconnected to server');
});

socket.on('newMessage', function(message){
    console.log(message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {
       
    });
    $('#p').html('');
    jQuery('[name=message]').val('');
});

jQuery('#mes').on('keyup', function() {
    socket.emit('typing');
});

socket.on('TypingSMS', function() {
    $('#p').html('<i>Someone is typing ... </i>');
});


