import express from "express";
import bodyParser from "body-parser";
import clerkWebhooks from "../controllers/clerkWebhooks.js";

const clerkrouter = express.Router();

// Sirf webhook route ke liye raw body parser
clerkrouter.post(
  "/",
  bodyParser.raw({ type: "*/*" }),
  clerkWebhooks
);

export default clerkrouter;
