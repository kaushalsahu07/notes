import "dotenv/config";

const required = ["GEMINI_API_KEY", "GEMINI_MODEL"];

for (const key of required){
    if (!process.env[key]) {
       console.error(`Missing required environment variable: ${key}`);
    }
}

export const env = {
    PORT: Number(process.env.PORT) || 3000,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_MODEL: process.env.GEMINI_MODEL,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:5173",
}