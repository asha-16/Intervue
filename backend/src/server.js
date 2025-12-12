import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import sessionRoutes from "./routes/sessionRoute.js";
import chatRoutes from "./routes/chatRoutes.js";


const app = express();

const __dirname = path.resolve();

// ------------------------
// CORS CONFIG 
// ------------------------
const allowedOrigins = [
  "http://localhost:5173",                      // local dev
  "https://intervue-frontend.onrender.com",     // deployed frontend
];

// Use cookie-parser BEFORE Clerk middleware so cookies are available
app.use(cookieParser());

// Simple, reliable CORS config for production (no callback)
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // <--- important: allows cookies to be sent
  })
);


// Middleware
app.use(express.json());
app.use(clerkMiddleware()); // Adds auth info to req.user

// API routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

// Test route
app.get("/", (req, res) => {
  res.status(200).send({ message: "server is up and running" });
});

// Serve frontend in production
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error("💣 Error starting the server", error);
  }
};

startServer();
