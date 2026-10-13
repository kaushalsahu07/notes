import { buildPrompt } from "../prompt/prompt.js";
import { generateText } from "../services/gemini.services.js";

export const processNote = async (req, res, next) => {
  try {
    const { option, content } = req.body;
    const text = await generateText(buildPrompt(option, content));
    res.json({ success: true, data: { text } });
  } catch (err) {
    next(err); 
  }
};