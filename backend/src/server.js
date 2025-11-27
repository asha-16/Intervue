import express from "express";
import { ENV } from "./lib/env.js";

const app = express();

app.get("/", (req, res) => {
    res.status(200).send({message: "server is up and running"})
});

app.get("/books", (req, res) => {
    res.status(200).send({message: "books server"});
});

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
});