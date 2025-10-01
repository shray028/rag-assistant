// Combines upload + chat components.
// Chat only visible after a PDF is uploaded.
// Easy to expand for multiple PDFs or multiple tabs.


import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import ChatBox from "../components/ChatBox";

const Home = () => {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">RAG Assistant</h1>
      
      <UploadForm onUploadSuccess={() => setUploaded(true)} />

      {uploaded && <ChatBox />}
    </div>
  );
};

export default Home;