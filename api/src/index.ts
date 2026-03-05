import express from 'express';
import cors from 'cors';
import { klinesRouter, orderRouter } from './routes';


const app= express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.send("this is vasuev"))
app.use('/orders',orderRouter)
app.use('/klines',klinesRouter)



app.listen(3002, () => {
    console.log('listening to 3002');
})