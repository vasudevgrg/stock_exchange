import express from 'express';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({port: 8083});

wss.on('connection', function(socket) {
    socket.on('message', function message(data) {
        socket.send(data.toString());
        console.log(data.toString());
    })

    socket.on('open', function open() {
        socket.send('socket open');
    })
})