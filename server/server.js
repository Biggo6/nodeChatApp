const path     = require('path');
const http     = require('http');
const express  = require('express');
const socketIO = require('socket.io'); 
const app      = express();
var server     = http.createServer(app);
var io         = socketIO(server);

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const {generateMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome To The Chap App'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined!'))

    socket.on('createMessage', (message, callback) => {
        console.log('creatMessage', message);
        callback();
        io.emit('newMessage', generateMessage(message.from, message.text));
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('typing', () => {
        socket.broadcast.emit('TypingSMS');
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});



server.listen(port, () => {
    console.log(`Server is up on ${port}`);
})


