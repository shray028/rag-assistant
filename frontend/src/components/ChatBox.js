// src/components/ChatBox.js
import React, { useState } from "react";

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question) return;

    try {
      const res = await fetch("http://127.0.0.1:5000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer("❌ Failed to get response");
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow bg-white mt-4">
      <h2 className="text-lg font-bold mb-2">Ask a Question</h2>
      <form onSubmit={handleAsk}>
        <input
          type="text"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        >
          Ask
        </button>
      </form>
      {answer && (
        <div className="mt-2 p-2 border rounded bg-gray-50">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}
