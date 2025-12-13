import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;

      if (!clerkId) {
        return res.status(401).json({ message: "Unauthorized - invalid token" });
      }

      // find user in db
      let user = await User.findOne({ clerkId });

      // ✅ AUTO-CREATE USER IF NOT FOUND (FIX)
      if (!user) {
        user = await User.create({
          clerkId,
          email: req.auth().sessionClaims?.email,
          name: req.auth().sessionClaims?.name || "New User",
          profileImage: req.auth().sessionClaims?.picture,
        });
      }

      // attach user to request
      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
