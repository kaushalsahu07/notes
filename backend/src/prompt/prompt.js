const templates = {
  summarize: (c) => `Summarize the following note into a few clear bullet points highlighting the main ideas:\n\n"${c}"`,
  improve: (c) => `Improve the following note content, adding more details and depth:\n\n"${c}"`,
};

export const validOptions = Object.keys(templates);
export const buildPrompt = (option, content) => templates[option](content);