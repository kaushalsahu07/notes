import rateLimit from "express-rate-limit";

export const aiLimiter = rateLimit({
  windowMs: 60 * 1000,        // time window: 1 minute
  limit: 10,                  // max 10 requests per IP in that window
  standardHeaders: true,      // send RateLimit-* info headers
  legacyHeaders: false,       // don't send the old X-RateLimit-* headers
  message: {
    success: false,
    error: "Too many AI requests. Please wait a minute and try again.",
  },
});