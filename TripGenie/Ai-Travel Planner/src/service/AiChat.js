import {
  GoogleGenerativeAI
} from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY
  );

const model =
  genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });

export const ChatSession = model.startChat({

  history: [

    {
      role: "user",

      parts: [
        {
          text:
            "You are an AI Travel Assistant. Give short, smart and helpful travel answers."
        }
      ]
    }

  ]

});