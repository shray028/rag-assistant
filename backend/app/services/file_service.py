import os
from fastapi import UploadFile

class FileService:
    """Handles file upload and storage."""

    UPLOAD_DIR = "uploaded_files"

    def __init__(self):
        os.makedirs(self.UPLOAD_DIR, exist_ok=True)

    def save_file(self, file: UploadFile) -> str:
        """Save uploaded file locally (later: process embeddings)."""
        file_path = os.path.join(self.UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            f.write(file.file.read())
        return file.filename
