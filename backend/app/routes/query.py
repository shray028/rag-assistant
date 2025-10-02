# backend/app/routes/query.py
from fastapi import APIRouter
from pydantic import BaseModel
from .upload import get_vectorstore  # reuse lazy init

router = APIRouter()

class QueryRequest(BaseModel):
    question: str

@router.post("/query")
async def query_document(request: QueryRequest):
    db = get_vectorstore()
    # TODO: replace with real similarity search
    docs = db.similarity_search(request.question, k=1)
    answer = docs[0].page_content if docs else "No results found."
    return {
        "question": request.question,
        "answer": answer
    }
