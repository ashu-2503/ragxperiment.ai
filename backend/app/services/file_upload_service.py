from fastapi import UploadFile, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.file_upload import FileUpload, FileStatus
from app.core.database import get_db
from app.api.auth.dependencies import get_current_user
from app.constant.file_upload_enum import FileStatus
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
