import express from "express";
import cors from "cors";
import { env } from "./config/env.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running");
})

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`); 
});