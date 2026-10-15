import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { appRouters } from "./routes/app.routes.js";
import { notfoundError, errorHandler } from "./middleware/error.handling.js";

const app = express();
app.use(cors({ origin: env.CLIENT_ORIGIN }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use("/app", appRouters);

app.use(notfoundError);
app.use(errorHandler);

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});