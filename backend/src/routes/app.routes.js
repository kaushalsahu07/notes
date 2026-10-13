import express from "express";
import { validateAi } from "../middleware/validateAi.js";
import { processNote } from "../controllers/app.controllers.js";

const appRouters = express.Router();

appRouters.post("/", validateAi, processNote);

export { appRouters };