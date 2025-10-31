import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";
import { IncomingMessage } from "http";

export class WebsocketManager {
  private static instance: WebsocketManager;
  private wss: WebSocketServer;
  private rooms: Map<string, Set<WebSocket>>;

  private constructor() {
    this.wss = new WebSocketServer({ noServer: true });
    this.rooms = new Map<string, Set<WebSocket>>();
    this.setupConnectionHandler();
  }

  public static getInstance(): WebsocketManager {
    if (!WebsocketManager.instance) {
      WebsocketManager.instance = new WebsocketManager();
    }
    return WebsocketManager.instance;
  }

  private setupConnectionHandler() {
    this.wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
      console.log("New WebSocket connection established");

      const url = new URL(req.url || "", `http://${req.headers.host}`);
      console.log('url: ', url);
      const market_symbol = url.searchParams.get("market_symbol");
      console.log('market_symbol: ', market_symbol);

      if (market_symbol) {
        this.addToRoom(market_symbol, ws);
      }

    //   ws.on("message", (data) => {
    //     console.log("Received:", data.toString());
    //   });

    //   ws.on("close", () => {
    //     console.log("Connection closed");
    //     if (market_symbol) {
    //       this.removeFromRoom(market_symbol, ws);
    //     }
    //   });

    //   ws.on("error", (error) => {
    //     console.error("WebSocket error:", error);
    //   });
    });
  }

  public addToRoom(market_symbol: string, ws: WebSocket): void {
    if (!this.rooms.has(market_symbol)) {
      this.rooms.set(market_symbol, new Set<WebSocket>());
    }
    this.rooms.get(market_symbol)!.add(ws);
    console.log(
      `Client added to room: ${market_symbol}. Total: ${
        this.rooms.get(market_symbol)!.size
      }`
    );
  }

  public removeFromRoom(market_symbol: string, ws: WebSocket): void {
    const room = this.rooms.get(market_symbol);
    if (room) {
      room.delete(ws);
      console.log(
        `Client removed from room: ${market_symbol}. Remaining: ${room.size}`
      );

      if (room.size === 0) {
        this.rooms.delete(market_symbol);
        console.log(`Room deleted: ${market_symbol}`);
      }
    }
  }

  public publishMessage(market_symbol: string, message: any): void {
    const room = this.rooms.get(market_symbol);
    if (room) {
      const messageStr =
        typeof message === "string" ? message : JSON.stringify(message);
      room.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(messageStr);
        }
      });
      console.log(
        `Message published to room ${market_symbol}: ${room.size} clients`
      );
    }
  }

  public attachToServer(server: Server): void {
    server.on("upgrade", (req, socket, head) => {
      socket.on("error", (err) => {
        console.error("Socket error during upgrade:", err);
      });

      // Optional: Authentication check
      // if (req.headers["authorization"] !== "your-token") {
      //   socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      //   socket.destroy();
      //   return;
      // }

      this.wss.handleUpgrade(req, socket, head, (ws) => {
        this.wss.emit("connection", ws, req);
      });
    });
  }

  public getRoomStats(): { [key: string]: number } {
    const stats: { [key: string]: number } = {};
    this.rooms.forEach((clients, market_symbol) => {
      stats[market_symbol] = clients.size;
    });
    return stats;
  }
}
