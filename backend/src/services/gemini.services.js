import { GoogleGenAI } from "@google/genai";
import { env } from "./config/env.js";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export async function generateText(prompt) {
  const response = await ai.generateText({
    model: env.GEMINI_MODEL,
    contents: prompt,
  });
  return response.text;
}
