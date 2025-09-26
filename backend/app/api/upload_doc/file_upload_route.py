from fastapi import APIRouter, UploadFile, Depends
from sqlalchemy.orm import Session
from app.services.file_upload_service import create_file_upload
from app.core.database import get_db
from app.api.auth.dependencies import get_current_user

file_upload_router = APIRouter()  # <- must match the name used in main.py

@file_upload_router.post("/upload")
def upload_file(
    file: UploadFile,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return create_file_upload(file=file, db=db, current_user=current_user)
