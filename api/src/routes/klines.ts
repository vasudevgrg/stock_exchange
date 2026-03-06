import { Router } from "express";
import {dbConnection} from './../db-connection'

export const router = Router();

router.get('/', async (req, res) => {
    const {market, interval} = req.query;
    const intervalTableMap: Record<string, string> = {
      "1m": "klines_1m",
    };

    const selectedTable = intervalTableMap[String(interval || "")];
    if (!selectedTable) {
      return res.status(400).json({ error: "Invalid interval. Use 1m, 1h, or 1w." });
    }

    const result = await dbConnection.query(
      `select * from ${selectedTable} where market = $1 order by start asc limit 100`,
      [market]
    );

    return res.json(result.rows);
})
