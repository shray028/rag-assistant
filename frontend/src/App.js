// src/App.js
import React from "react";
import UploadForm from "./components/UploadForm";
import ChatBox from "./components/ChatBox";

function App() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">RAG Assistant UI</h1>
      <UploadForm />
      <ChatBox />
    </div>
  );
}

export default App;
