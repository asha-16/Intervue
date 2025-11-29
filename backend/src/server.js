import express from "express";
import path from 'path';
import cors from "cors";

import { serve } from "inngest/express";
import { inngest, functions } from "./inngest.js";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

const app = express();

const __dirname = path.resolve();

//middleware
app.use(express.json());
app.use(cors(
    {origin:ENV.CLIENT_URL, credentials:true}
));
app.use("/api/inngest", serve({ client: inngest, functions }));


//routes
app.get("/", (req, res) => {
    res.status(200).send({message: "server is up and running"})
});

app.get("/books", (req, res) => {
    res.status(200).send({message: "books server"});
});


//make our app ready for deployment
if(ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => {
            console.log(`Server is running on port ${ENV.PORT}`);
        });
    } catch (error) {
        console.error("💣 Error Starting the server", error);
    }
}

startServer();