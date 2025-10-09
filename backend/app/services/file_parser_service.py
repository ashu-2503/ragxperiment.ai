# app/services/file_parser_service.py
from typing import List
from app.core.database import SessionLocal
from sqlalchemy.orm import Session
from langchain.text_splitter import RecursiveCharacterTextSplitter
import logging
from io import BytesIO
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
def chunk_text(text: str, chunk_size: int = 1000, chunk_overlap: int = 200) -> List[str]:
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
    batch_size = 10
    total_chunks = len(chunks)

    for idx, chunk_text in enumerate(chunks):
        db_chunk = FileChunk(
            file_id=file_id,
            user_id=user_id,
            chunk_text=chunk_text,
            chunk_index=idx,
            status=FileStatus.READY.value
        )
        db.add(db_chunk)

        # Commit every batch_size chunks or on last chunk
        if (idx + 1) % batch_size == 0 or (idx + 1) == total_chunks:
            db.commit()
            
            # Update processed_chunks for progress tracking
            f = db.query(FileUpload).filter(FileUpload.id == file_id).first()
            if f:
                f.processed_chunks = idx + 1
                f.total_chunks = total_chunks
                db.commit()
                db.flush()  # Ensure visibility to other DB sessions
                
    # final commit & set totals
    db.commit()
    f = db.query(FileUpload).filter(FileUpload.id == file_id).first()
    if f:
        f.total_chunks = len(chunks)
        f.processed_chunks = len(chunks)
        db.commit()

# ---------------- Background Task ----------------
def parse_and_chunk_file(file_id: int, user_id: int):
    db = SessionLocal()
    try:
        db_file = db.query(FileUpload).filter(FileUpload.id == file_id).first()
        if not db_file:
            logger.error(f"File {file_id} not found in DB")
            return
        
        # mark processing
        db_file.status = FileStatus.PROCESSING.value
        db.commit()

        # read binary from DB (POC). Use streaming for huge files in prod.
        file_bytes = db_file.file_data
        text = extract_text_from_file(BytesIO(file_bytes), db_file.file_name)

        chunks = chunk_text(text)
        save_chunks_to_db(db, file_id, user_id, chunks)

        # mark ready
        db_file.status = FileStatus.READY.value
        db.commit()

    except Exception as e:
        logger.exception(f"File {file_id} processing failed: {e}")
        try:
            db_file = db.query(FileUpload).filter(FileUpload.id == file_id).first()
            if db_file:
                db_file.status = FileStatus.FAILED.value
                db.commit()
        except Exception:
            logger.exception("Failed to mark file as FAILED after exception.")
    finally:
        db.close()