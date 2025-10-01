// Handles all API calls to backend FastAPI
// Can be expanded later for auth, multi-user, etc.

const BASE_URL = "http://127.0.0.1:8000/rag"; // Change if deployed

export const uploadPDF = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export const askQuestion = async (query) => {
  const response = await fetch(`${BASE_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  return response.json();
};