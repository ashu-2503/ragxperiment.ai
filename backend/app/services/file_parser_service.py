# app/services/file_parser_service.py
import io
from typing import List
from sqlalchemy.orm import Session
from langchain.text_splitter import RecursiveCharacterTextSplitter
import docx
import PyPDF2
import logging

from app.models.file_chunk import FileChunk
from app.models.file_upload import FileUpload
from app.constant.file_upload_enum import FileStatus

logger = logging.getLogger(__name__)

# ---------------- Extract Text ----------------
def extract_text_from_file(file_like, filename: str) -> str:
    name = filename.lower()
    if name.endswith(".pdf"):
        import PyPDF2
        reader = PyPDF2.PdfReader(file_like)
        text = "".join([page.extract_text() for page in reader.pages])
        return text
    elif name.endswith(".docx"):
        import docx
        doc = docx.Document(file_like)
        return "\n".join([p.text for p in doc.paragraphs])
    elif name.endswith(".txt"):
        return file_like.read().decode("utf-8")
    else:
        raise ValueError("Unsupported file type")

# ---------------- Chunk Text ----------------
def chunk_text(text: str, chunk_size: int = 50, chunk_overlap: int = 20) -> List[str]:
    """
    Split text into smaller chunks with overlap.
    """
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap
    )
    return splitter.split_text(text)

# ---------------- Save Chunks to DB ----------------
def save_chunks_to_db(db: Session, file_id: int, user_id: int, chunks: List[str]):
    """
    Save each chunk into FileChunk table.
    """
    for idx, chunk_text in enumerate(chunks):
        db_chunk = FileChunk(
            file_id=file_id,
            user_id=user_id,
            chunk_text=chunk_text,
            chunk_index=idx,
            status=FileStatus.READY.value  # mark chunk ready immediately after saving
        )
        db.add(db_chunk)
    db.commit()

# ---------------- Background Task ----------------
def parse_and_chunk_file(db: Session, file_id: int, user_id: int):
    try:
        db_file = db.query(FileUpload).filter(FileUpload.id == file_id).first()
        db_file.status = FileStatus.PROCESSING.value
        db.commit()

        # Read file from DB
        from io import BytesIO
        file_bytes = db_file.file_data
        text = extract_text_from_file(BytesIO(file_bytes), db_file.file_name)

        chunks = chunk_text(text)
        save_chunks_to_db(db, file_id, user_id, chunks)

        db_file.status = FileStatus.READY.value
        db.commit()

    except Exception as e:
        db_file.status = FileStatus.FAILED.value
        db.commit()


    except Exception as e:
        # Update file status to FAILED on error
        db_file.status = FileStatus.FAILED.value
        db.commit()   