import express from 'express';
import { MarketControllers } from '../controllers';

const router = express.Router();

router.route('/:market_id').get(MarketControllers.getMarketDetialsController);

export default router;