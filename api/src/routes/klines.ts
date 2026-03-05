import { Router } from "express";
import {dbConnection} from './../db-connection'

export const router = Router();

router.get('/', async (req, res) => {
    const {market, interval} = req.query;
    const intervalTableMap: Record<string, string> = {
      "1m": "klines_1m",
      "1h": "klines_1h",
      "1w": "klines_1w",
    };

    const selectedTable = intervalTableMap[String(interval || "")];
    if (!selectedTable) {
      return res.status(400).json({ error: "Invalid interval. Use 1m, 1h, or 1w." });
    }

    if (typeof market !== "string" || market.trim().length === 0) {
      return res.status(400).json({ error: "Market is required." });
    }

    const result = await dbConnection.query(
      `select * from ${selectedTable} where market = $1 order by start desc limit 100`,
      [market]
    );

    return res.json(result.rows);
})
