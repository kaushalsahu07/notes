import express from "express";
import { validateAi } from "../middleware/validateAi.js";
import { aiLimiter } from "../middleware/rateLimiter.js";
import { processNote } from "../controllers/app.controllers.js";

const appRouters = express.Router();

appRouters.post("/", aiLimiter, validateAi, processNote);

export { appRouters };