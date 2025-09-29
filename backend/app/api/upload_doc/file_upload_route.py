from fastapi import APIRouter, UploadFile, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from app.services.file_upload_service import create_file_upload
from app.services.file_parser_service import parse_and_chunk_file
from app.core.database import get_db
from app.api.auth.dependencies import get_current_user

file_upload_router = APIRouter()

@file_upload_router.post("/upload")
def upload_file(
    file: UploadFile,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
    background_tasks: BackgroundTasks = None
):
    # Step 1: Save raw file (your existing upload logic)
    db_file = create_file_upload(file, db=db, current_user=current_user)

    # Step 2: Trigger background parsing & chunkin
    background_tasks.add_task(parse_and_chunk_file, db, db_file.id, current_user.id)

    return {"file_id": db_file.id, "status": "parsing scheduled"}

# @file_upload_router.get("/files/{file_id}/status")
# def get_file_status(file_id: int, db: Session = Depends(get_db)):
#     db_file = db.query(FileUpload).filter(FileUpload.id == file_id).first()
#     return {"file_id": file_id, "status": db_file.status}
