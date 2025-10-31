import { Server, WebSocketServer } from "ws";
import http from 'http';

export class WebsocketManager {

    private static instance : any;
    private rooms:Map<string, WebSocket[]>;

    constructor() {
        this.rooms= new Map<string, WebSocket[]>();
    }
    static getInstance() {
        if(!this.instance) {
            this.instance =  new WebSocketServer({noServer: true});;
        }
        return this.instance;

    }

    async createRoom(market_symbol: string, ws: WebSocket) {
        if(this.rooms.has(market_symbol) ) {
            this.rooms.set(market_symbol,[...this.rooms.get(market_symbol)!, ws])
        }else{
            this.rooms.set(market_symbol, [ws]);
        }
    }

    async publishMessage(market_symbol: string, message: any) {
        if(this.rooms.has(market_symbol)) {
            this.rooms.get(market_symbol)?.map(ws => {
                ws.send(message);
            })
        }
    }


    async updateServerConnection(s: http.Server) {
            s.on('upgrade', (req, socket, head) => {
            socket.on('error', ()=> console.log("error while attempting to connect to server."));
            const wss = WebsocketManager.getInstance();
        
            wss.handleUpgrade(req, socket, head, (ws: WebSocket) => {
                wss.emit('connection', ws, req);
            });
        });
    }

    async removeUserFromRoom(market_symbol: string, ws: WebSocket) {
        const existingUsers = this.rooms.get(market_symbol);

        if(existingUsers) {
            this.rooms.set(market_symbol, existingUsers.filter(user => user != ws));
        }
    }

}
