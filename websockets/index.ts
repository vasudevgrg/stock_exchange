import express from "express";
import { WebsocketManager } from "./websocker-manager";
import cors from 'cors';
import { connectRabbitMQ } from "./rabbitmq/rabbitmq";

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

const PORT = 9000;

const server = app.listen(PORT, async () => {
  await connectRabbitMQ();
  console.log(`Server listening on port ${PORT}`);
  console.log(
    `WebSocket endpoint: ws://localhost:${PORT}`
  );
});

const wsManager = WebsocketManager.getInstance();
wsManager.attachToServer(server);

app.post('/subscribe', (req, res) => {
    const {market_symbol, ws} = req.body;
    wsManager.addToRoom(market_symbol, ws);
  return {message: "user added to room"};
})

app.post("/publish", (req, res) => {
    console.log('req: ', req.body);
  const { market_symbol, message } = req.body;

  if (!market_symbol || !message) {
    return res
      .status(400)
      .json({ error: "market_symbol and message are required" });
  }

  wsManager.publishMessage(market_symbol, message);
  res.json({ success: true, message: "Message published" });
});

app.get("/rooms/stats", (req, res) => {
  const stats = wsManager.getRoomStats();
  res.json(stats);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
