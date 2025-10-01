
// Already wired to call backend /upload.
// onUploadSuccess is a callback for parent to enable chat after upload.
// Can later add multiple files upload or drag-drop.



import React, { useState } from "react";
import { uploadPDF } from "../services/apiService";

const UploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF file.");
      return;
    }

    try {
      const result = await uploadPDF(file);
      setMessage(result.message || "Upload successful!");
      // Notify parent component to refresh or enable chat
      onUploadSuccess && onUploadSuccess();
    } catch (err) {
      setMessage("Upload failed. Check backend connection.");
      console.error(err);
    }
  };

  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="text-lg font-bold mb-2">Upload PDF</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload
      </button>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default UploadForm;
