# backend/app/routes/upload.py
import shutil
from pathlib import Path
from fastapi import APIRouter, UploadFile, HTTPException
from typing import Optional
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

router = APIRouter()

# Globals (lazy init)
_embedding: Optional[OpenAIEmbeddings] = None
_vectorstore: Optional[Chroma] = None


def get_embedding():
    global _embedding
    if _embedding is None:
        print("⚡ Loading embeddings...")
        _embedding = OpenAIEmbeddings()
    return _embedding


def get_vectorstore():
    global _vectorstore
    if _vectorstore is None:
        print("⚡ Initializing Chroma...")
        _vectorstore = Chroma(
            persist_directory="./chroma_db",
            embedding_function=get_embedding()
        )
    return _vectorstore


UPLOAD_DIR = Path("./uploaded_files")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/upload")
async def upload_file(file: UploadFile):
    try:
        file_path = UPLOAD_DIR / file.filename
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        db = get_vectorstore()
        # TODO: load file into Chroma here
        return {"status": "ok", "filename": file.filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
