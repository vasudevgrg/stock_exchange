import express from 'express';
import cors from 'cors';
import {router as orderRouter} from './routes/order';


const app= express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.send("this is vasuev"))
app.use('/orders',orderRouter)



app.listen(3002, () => {
    console.log('listening to 3002');
})