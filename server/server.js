import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoute.js';
import connectCloudinary from './config/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
connectDB();
connectCloudinary();
const PORT =  3001;
const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use(clerkMiddleware());

// API to listen clerk webhook

app.use("/api/clerk",clerkWebhooks);


app.get('/',(req,res)=>{
    res.send('Hello World ')
})

app.use('/api/user',userRouter);
app.use('/api/hotels',hotelRouter);
app.use('/api/rooms',roomRouter);
app.use('/api/bookings',bookingRouter);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});