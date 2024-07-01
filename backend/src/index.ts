import express, { Request, Response } from 'express';
import { connection } from './config/config';
import { userRoute } from './routes/user';
import { productRoute } from './routes/product';
import { paymentRoute } from './routes/order';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoute);
app.use('/api', productRoute);
app.use('/api', paymentRoute);

app.get('/', async (req: Request, res: Response) => {
    try {
        res.status(201).send({ 'msg': 'Welcome to MyIndia' });
    } catch (error) {
        res.status(500).send({ 'msg': 'Something went wrong' });
    }
});

app.get('/paymentSuccess', async (req: Request, res: Response) => {
    try {
        res.status(200).send({ 'msg': 'Payment successful' });
    } catch (error) {
        res.status(500).send({ 'msg': 'Something went wrong' });
    }
});

app.get('/paymentCancel', async (req: Request, res: Response) => {
    try {
        res.status(200).send({ 'msg': 'Payment canceled successfully' });
    } catch (error) {
        res.status(500).send({ 'msg': 'Something went wrong' });
    }
});

const port = process.env.port || 8080;

app.listen(port, async () => {
    try {
        await connection;
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.error(error);
    }
});
