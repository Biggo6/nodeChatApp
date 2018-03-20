var socket = io();
socket.on('connect', () => {
    console.log('Connected to server');
    socket.emit('createMessage', {from: '@biggo6', text: 'Hello!'});
});
socket.on('disconnect', () => {
    console.log('Disconnected to server');
});

socket.on('newMessage', function(message){
    console.log(message)
});


