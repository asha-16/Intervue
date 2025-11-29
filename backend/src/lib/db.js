import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        if(!ENV.MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined in environment variables");
        }
        const conn = await mongoose.connect(ENV.MONGODB_URL);
        console.log("✅ Connected to MongoDB Successfully!", conn.connection.host);
    } catch (error) {
        console.error("❌ Error connecting to MongoDB", error);
        process.exit(1);
    }
};