import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './config/db.js';
// This is the primary middleware you need from Clerk for Express
import { clerkMiddleware } from '@clerk/express';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoute.js';
import connectCloudinary from './config/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import bodyParser from "body-parser";
import clerkrouter from './routes/clerkRoutes.js';

// Initialize Database and Cloudinary
connectDB();
connectCloudinary();

const PORT = process.env.PORT || 3001;
const app = express();

// IMPORTANT: This raw body parser for the webhook endpoint must come 
// BEFORE express.json() and the clerkMiddleware()
app.use("/api/clerk/webhooks", bodyParser.raw({ type: "*/*" }));

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Use the Clerk middleware for authentication.
// This will add the `req.auth` object to all incoming requests.
// It should come after body-parser and cors, but before your routes.
app.use(clerkMiddleware());

// --- API Routes ---

// A simple route to check if the server is running
app.get('/', (req, res) => {
    console.log("API IS RUNNING");
    res.send("API IS RUNNING");
});

// Clerk Webhook route
app.use("/api/clerk/webhooks", clerkrouter);

// Your application-specific routes
// The `protect` middleware inside these routes will now work correctly
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
