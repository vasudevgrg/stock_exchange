import express from "express";
import { WebsocketManager } from "./websocker-manager";

const app = express();

app.use(express.json());
const s = app.listen(9000, () => console.log("listening to 9000"));

app.post("connection/create", async (req, res) => {
  const { room, user_id } = req.body;
  await new WebsocketManager().updateServerConnection(s);
});

app.put("connection/close", async (req, res) => {
  const { market_symbol, ws } = req.body;
  await new WebsocketManager().removeUserFromRoom(market_symbol, ws);
});
