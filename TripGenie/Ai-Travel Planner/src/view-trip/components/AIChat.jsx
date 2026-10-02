import React, { useState } from "react";
import { ChatSession } from "@/service/AiChat";

import {
  FaRobot,
  FaPaperPlane
} from "react-icons/fa";

function AIChat({ trip }) {

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text:
        "Hi 👋 I am your AI Travel Assistant. Ask me anything about your trip."
    }
  ]);

  const SendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    setLoading(true);

    try {

      const prompt = `
You are a smart AI Travel Assistant.

CURRENT TRIP DETAILS:

Destination: ${trip?.userSelection?.location?.label}
Duration: ${trip?.userSelection?.noOfDays} Days
Budget: ${trip?.userSelection?.budget}
Travelers: ${trip?.userSelection?.traveler}

Hotels:
${JSON.stringify(trip?.tripData?.hotels, null, 2)}

Places To Visit:
${JSON.stringify(trip?.tripData?.itinerary, null, 2)}

IMPORTANT RULES:
1. NEVER ask again for destination, budget, days or travelers.
2. You already know the complete trip.
3. Answer ONLY based on the trip data above.
4. If user asks "iss trip ke bare me batao", give full trip summary.
5. Recommend hotels and places from the provided itinerary.
6. Keep response under 150 words.
7. Do not generate random emojis repeatedly.
8. Answer in Hindi + English mix.

User Question:
${input}
`;

      const result =
        await ChatSession.sendMessage(prompt);

      const response =
        await result.response.text();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: response
        }
      ]);

    } catch (error) {

      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "Sorry, something went wrong. Please try again."
        }
      ]);

    }

    setLoading(false);
    setInput("");

  };

  const QuickQuestion = (question) => {

    setInput(question);

  };

  return (

    <div className="bg-white rounded-2xl shadow-md border p-6">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-5">

        <div className="bg-orange-100 p-3 rounded-xl">

          <FaRobot className="text-orange-500 text-2xl" />

        </div>

        <div>

          <h2 className="text-2xl font-bold">

            AI Travel Assistant

          </h2>

          <p className="text-gray-500 text-sm">

            Ask anything about your trip

          </p>

        </div>

      </div>

      {/* QUICK QUESTIONS */}
      <div className="flex flex-wrap gap-2 mb-4">

        <button
          onClick={() =>
            QuickQuestion(
              "Best places to visit?"
            )
          }
          className="bg-orange-100 text-orange-600 px-3 py-2 rounded-full text-sm"
        >
          Best Places
        </button>

        <button
          onClick={() =>
            QuickQuestion(
              "Best food options?"
            )
          }
          className="bg-orange-100 text-orange-600 px-3 py-2 rounded-full text-sm"
        >
          Food
        </button>

        <button
          onClick={() =>
            QuickQuestion(
              "Budget tips"
            )
          }
          className="bg-orange-100 text-orange-600 px-3 py-2 rounded-full text-sm"
        >
          Budget Tips
        </button>

        <button
          onClick={() =>
            QuickQuestion(
              "Best hotel?"
            )
          }
          className="bg-orange-100 text-orange-600 px-3 py-2 rounded-full text-sm"
        >
          Hotel
        </button>

      </div>

      {/* CHAT AREA */}
      <div className="h-[400px] overflow-y-auto bg-gray-50 rounded-xl p-4 space-y-4">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`max-w-[80%] p-4 rounded-2xl text-sm leading-6 ${
              msg.role === "user"
                ? "bg-orange-500 text-white ml-auto"
                : "bg-white border shadow-sm"
            }`}
          >

            {msg.text}

          </div>

        ))}

        {loading && (

          <div className="bg-white border shadow-sm rounded-2xl px-4 py-3 w-fit animate-pulse">

            🤖 Thinking...

          </div>

        )}

      </div>

      {/* INPUT */}
      <div className="flex gap-3 mt-5">

        <input
          type="text"
          placeholder="Ask about hotels, places, food..."
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              SendMessage();

            }

          }}
          className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          onClick={SendMessage}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 rounded-xl shadow"
        >

          <FaPaperPlane />

        </button>

      </div>

    </div>

  );

}

export default AIChat;