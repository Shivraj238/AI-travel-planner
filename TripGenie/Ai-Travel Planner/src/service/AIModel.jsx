  import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
});

export const sendMessageToAI = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("RAW AI:", text);

    // ✅ SAFE PARSE
    try {
      return JSON.parse(text);
    } catch (err) {
      console.warn("Not JSON, fixing...");

      // try extracting JSON manually
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      return { error: "Invalid JSON from AI", raw: text };
    }

  } catch (error) {
    console.error("AI ERROR:", error);
    throw error;
  }
};