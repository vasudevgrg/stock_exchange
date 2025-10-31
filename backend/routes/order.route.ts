import express from 'express';
import { orderControllers } from '../controllers';

const router = express.Router();

router.route('/sell').post(orderControllers.sellStocksOrder);
router.route('/buy').post(orderControllers.buyStocksOrder);

export default router;