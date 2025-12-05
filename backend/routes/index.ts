import express from 'express';
import  MarketRoutes from './market.route';
import  OrderRoutes from './order.route';

const router = express.Router();

router.get('/', (req, res)=> {
    return res.send(" this is stock backend");
})
router.use('/orders', OrderRoutes);
router.use('/markets', MarketRoutes);

export default router;