// src/components/UploadForm.js
import React, { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setStatus(`✅ Uploaded: ${data.filename}`);
    } catch (err) {
      setStatus("❌ Upload failed");
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow bg-white">
      <h2 className="text-lg font-bold mb-2">Upload Document</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}
