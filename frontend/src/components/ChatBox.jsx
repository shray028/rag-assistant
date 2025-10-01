// Displays chat history.
// Shows loading state.
// Can be extended: scroll-to-bottom, highlight source snippets, multi-user chat.

import React, { useState } from "react";
import { askQuestion } from "../services/apiService";

const ChatBox = () => {
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState([]); // [{question: "", answer: ""}]
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await askQuestion(query);
      const answer = res.answer || "No answer returned.";
      setChat([...chat, { question: query, answer }]);
      setQuery("");
    } catch (err) {
      console.error(err);
      setChat([...chat, { question: query, answer: "Error connecting to backend." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded shadow bg-white mt-4">
      <h2 className="text-lg font-bold mb-2">Ask a Question</h2>
      <div className="flex mb-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your question..."
          className="border p-2 flex-grow rounded mr-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Ask"}
        </button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {chat.map((item, idx) => (
          <div key={idx} className="p-2 border rounded bg-gray-50">
            <p className="font-semibold">Q: {item.question}</p>
            <p>A: {item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;
