export class User {
    id: string;
    ws: WebSocket;

    constructor(id: string, ws: WebSocket) {
        this.id = id;
        this.ws = ws;
    }

    
}