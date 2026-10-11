import { validOptions } from "../prompt/prompt.js";
import { AppError } from "../utils/appError.js";

export function validateAi(req, res, next) {
  const { option, content } = res.body;
  if (!validOptions.includes(option)) {
    return next(new AppError("Invalid option", 400));
  }
  if (typeof content !== "string" || !content.trim() || content.length > 5000)
    return next(new AppError("Content required (max 5000 chars)", 400));

  next();
}