from fastapi import UploadFile, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.file_upload import FileUpload, FileStatus
from app.core.database import get_db
from app.api.auth.dependencies import get_current_user
from app.constant.file_upload_enum import FileStatus
from app.schemas.file_upload import FileUploadResponse, PaginatedFileResponse
import logging

logger = logging.getLogger(__name__)

def create_file_upload(
    file: UploadFile,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    try:
        file_data = file.file.read()
        if not file_data:
            raise HTTPException(status_code=400, detail="File is empty")

        db_file = FileUpload(
            user_id=current_user.id,
            file_name=file.filename,
            file_type=file.content_type,
            file_size=len(file_data),
            file_data=file_data,
            status=FileStatus.UPLOADED.value
        )

        db.add(db_file)
        db.commit()
        db.refresh(db_file)
        return db_file

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"File upload failed for user {getattr(current_user, 'id', 'unknown')}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

def get_file_by_id(db: Session, file_id: int):
    return db.query(FileUpload).filter(FileUpload.id == file_id).first()

def format_file_size(size_bytes: int) -> str:
    """Convert bytes to human-readable format."""
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024**2:
        return f"{size_bytes / 1024:.2f} KB"
    else:
        return f"{size_bytes / (1024**2):.2f} MB"

def simplify_file_type(mime_type: str) -> str:
    """Extract type like pdf, doc, txt from MIME type."""
    if "/" in mime_type:
        return mime_type.split("/")[-1]
    return mime_type

def get_all_files(db: Session, skip: int = 0, limit: int = 10):
    query = db.query(FileUpload)
    total = query.count()
    files = query.offset(skip).limit(limit).all()

    response_files = []
    for f in files:
        response_files.append(FileUploadResponse(
            id=f.id,
            file_name=f.file_name,
            file_type=simplify_file_type(f.file_type),
            file_size=format_file_size(f.file_size),
            status=f.status,
            created_at=f.created_at
        ))

    return PaginatedFileResponse(
        total=total,
        skip=skip,
        limit=limit,
        files=response_files
    )
