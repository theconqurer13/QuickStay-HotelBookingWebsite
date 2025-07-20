import User from "../models/User.js";

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
  try {
    // req.auth() is provided by another middleware (like clerkMiddleware)
    // It must run BEFORE this protect middleware
    const { userId } = await req.auth();

    if (!userId) {
      // Use a 401 Unauthorized status code
      return res.status(401).json({ success: false, message: "Not authenticated." });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    req.user = user; // Attach user to the request object
    next(); // Proceed to the next middleware or route handler

  } catch (error) {
    console.error("Authentication error:", error);
    // Pass error to the Express error handler
    next(error); 
  }
};