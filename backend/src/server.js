import express from "express";
import path from "path";
import cors from "cors";

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
  "http://localhost:5173",      // local frontend
  ENV.CLIENT_URL,               // deployed frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow same-origin requests like server-to-server or mobile apps
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
// ------------------------
// END OF FIX
// ------------------------

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
