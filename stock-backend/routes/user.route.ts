import express from 'express';
import { orderControllers } from '../controllers';

const router = express.Router();

router.route('/sell-stocks').post(orderControllers.sellStocksOrder);

export default router;