import { Server } from "http";
import { WebSocket, WebSocketServer } from "ws";

function onSocketPreError(e: Error) {
  console.log("error", e);
}
const HEARTBEAT_VALUE = 1;
const HEARTBEAT_INTERVAL = 1000 * 5;

function ping(ws: WebSocket) {
  ws.send(HEARTBEAT_VALUE, { binary: true });
}

export default function configure(server: Server) {
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (req, socket, head) => {
    socket.on("error", onSocketPreError);

    //perform auth

    if (!!req.headers["badAuth"]) {
      socket.write("unauthorized");
      socket.destroy();
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
      socket.removeListener("error", onSocketPreError);
      wss.emit("connection", ws, req);
    });
  });

  wss.on("connection", (ws: WebSocket, req) => {
    ws.isAlive =true;
    ws.on("error", () => console.log("this is post error"));

    ws.on("message", (msg, isBinary) => {
      if(isBinary && (msg as any)[0]=== HEARTBEAT_VALUE) {
        ws.isAlive= true;
      }
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg, { binary: isBinary });
        }
      });
    });
    ws.on("close", () => {
      console.log("connection closed");
    });
  });

  const interval = setInterval(()=> {
    wss.clients.forEach((client: WebSocket)=> {
      if(client.isAlive== false) {
        client.terminate();
        return;
      }
      client.isAlive =false;
      ping(client);
    })
  }, HEARTBEAT_INTERVAL);

  wss.on('close', () => {
    clearInterval(interval);
  })
}
