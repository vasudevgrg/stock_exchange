import { WebSocket } from "ws";
import { SubscriptionManager } from "./subscription-manager";
import { UserManager } from "./user-manager";

export class User {
  id: string;
  ws: WebSocket;

  constructor(id: string, ws: WebSocket) {
    this.id = id;
    this.ws = ws;
    this.startListening();
  }

  emit(message: any) {
    this.ws.send(JSON.stringify(message));
  }

  startListening() {
    this.ws.on('message', (data) => {
        console.log('datavasudev: ', JSON.parse(data));
        
      try {
        const message = JSON.parse(data.toString());
        const { action, market } = message;

        if (action === 'subscribe') {
          SubscriptionManager.getInstance().subscribe(market, this.id);
        } else if (action === 'unsubscribe') {
          SubscriptionManager.getInstance().unsubscribe(market, this.id);
        }
      } catch (err) {
        console.error('Invalid WebSocket message:', data);
      }
    });
  }
}