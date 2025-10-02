# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import your routes
from backend.app.routes import upload, query

# Create FastAPI app instance
app = FastAPI(
    title="RAG Assistant Backend",
    description="Backend for RAG-based assistant with upload + query APIs",
    version="0.1.0",
)

# Allow frontend (React on port 3000) to talk to backend (FastAPI on port 5000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include route modules
# app.include_router(upload.router, prefix="/upload", tags=["Upload"])
# app.include_router(query.router, prefix="/query", tags=["Query"])


@app.get("/")
def root():
    return {"message": "RAG Assistant Backend is running!"}
