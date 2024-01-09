import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectToDatabase from './config/config.js';
import { config } from 'dotenv';
import userRoutes from './routes/user.routes.js'
import eventRoutes from './routes/events.routes.js'
import paymentRoutes from './routes/payment.routes.js'
config();


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/event' , eventRoutes);
app.use('/api/payment' , paymentRoutes);

app.use('*' , (req , res) => {
res.status(500).send('Page not found');
});


app.listen('5000' , async() => {
    await connectToDatabase();
    console.log('listening at http://localhost:5000');
})