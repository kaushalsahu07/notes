import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { notfoundError, errorHandler } from "./middleware/error.handling.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running");
})

app.get("/test-error", (req, res, next) => {
  const error = new Error("Test failure");
  error.statusCode = 500;
  next(error);
});

app.use(notfoundError);
app.use(errorHandler);

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`); 
});