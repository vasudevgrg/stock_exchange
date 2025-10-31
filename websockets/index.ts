import express from "express";
import { WebsocketManager } from "./websocker-manager";

const app = express();
app.use(express.json());

const PORT = 9000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(
    `WebSocket endpoint: ws://localhost:${PORT}?market_symbol=BTC-USD`
  );
});

const wsManager = WebsocketManager.getInstance();
wsManager.attachToServer(server);

app.post("/publish", (req, res) => {
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
