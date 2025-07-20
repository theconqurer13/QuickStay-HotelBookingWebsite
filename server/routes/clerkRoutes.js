// ✅ Corrected routes/clerkRoutes.js
import express from "express";
import clerkWebhooks from "../controllers/clerkWebhooks.js";

const clerkrouter = express.Router();


clerkrouter.post("/", clerkWebhooks); 

export default clerkrouter;
