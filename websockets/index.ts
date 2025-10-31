import express from "express";
import { WebsocketManager } from "./websocker-manager";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

const PORT = 9000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(
    `WebSocket endpoint: ws://localhost:${PORT}?market_symbol=BTC-USD`
  );
});

const wsManager = WebsocketManager.getInstance();
wsManager.attachToServer(server);

// app.post('/subscribe', (req, res) => {
//     const {market_symbol, ws} = req.body;
//     wsManager.

// })

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
