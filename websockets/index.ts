import express from 'express';
import { WebSocketServer } from 'ws';
import { WebsocketManager } from './websocker-manager';

const app= express();
const s = app.listen(9000, ()=> console.log('listening to 9000'));

app.post('websocket-connection', (req, res) => {
    const {room, user_id} = req.body;
    s.on('upgrade', (req, socket, head) => {
    socket.on('error', ()=> console.log("error while attempting to connect to server."));
    const wss = new WebsocketManager().getInstance();

    if (!!req.headers['BadAuth']) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
    });

    wss.clients.forEach(element => {
        
    });
});
})

