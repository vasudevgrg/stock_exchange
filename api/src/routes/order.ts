import { Router } from "express";
import { RedisManager } from "../redis-manager";

export const router = Router();

router.post('/', async (req, res) => {
    const {market, price, quantity, side, userId}  = req.body;
    console.log('market: ', market);
    const response = await RedisManager.getInstance().sendAndAwait({
        type: 'create_order',
        data: {
            market, price, quantity, side, userId
        }
    })

    res.json(response)
})

router.delete('/', async (req, res) => {
    const {orderId, market}  = req.body;
    const response = await RedisManager.getInstance().sendAndAwait({
        type: 'cancel_order',
        data: {
            orderId, market
        }
    })

    res.json(response)  
})

router.get('/open',async (req, res) => {
    const {market, userId} = req.query;
    const response = await RedisManager.getInstance().sendAndAwait({
        type: 'get_open_orders',
        data: {
            market, userId
        }
    })

    res.json(response)
} )