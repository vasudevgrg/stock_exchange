import { Router } from "express";
import { RedisManager } from "../redis-manager";

export const router = Router();

router.post('/', async (req, res) => {
    const {market, price, quantity, side, userId}  = req.body;
    const response = await RedisManager.getInstance().sendAndAwait({
        type: 'create_order',
        data: {
            market, price, quantity, side, userId
        }
    })

    res.json(response)
})