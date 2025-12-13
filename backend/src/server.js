import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";

const app = express();
const __dirname = path.resolve();

/* ======================================================
   1️⃣ Body parsing middleware
====================================================== */
app.use(express.json());

/* ======================================================
   2️⃣ CORS CONFIG (FIXED)
====================================================== */

/**
 * Origins allowed to access this backend
 * - localhost → development
 * - render URL → production
 */
const allowedOrigins = [
  "http://localhost:5173",
  "https://intervue-frontend.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      /**
       * Allow requests with no origin
       * (Postman, server-to-server, health checks)
       */
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // required for Clerk (cookies / auth headers)
  })
);

/* ======================================================
   3️⃣ Authentication middleware (Clerk)
====================================================== */
app.use(clerkMiddleware()); // adds req.auth

/* ======================================================
   4️⃣ Routes
====================================================== */
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

/* ======================================================
   5️⃣ Health check
====================================================== */
app.get("/", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

/* ======================================================
   6️⃣ Serve frontend in production
====================================================== */
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist", "index.html")
    );
  });
}

/* ======================================================
   7️⃣ Start server
====================================================== */
const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () =>
      console.log("🚀 Server running on port:", ENV.PORT)
    );
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();
