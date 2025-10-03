from fastapi import APIRouter, UploadFile, Depends, BackgroundTasks,Query
from sqlalchemy.orm import Session
from app.services.file_upload_service import create_file_upload
from app.services.file_parser_service import parse_and_chunk_file
from app.api.auth.dependencies import get_current_user
from app.schemas.file_upload import PaginatedFileResponse
from app.services.file_upload_service import create_file_upload,get_all_files
from app.core.database import get_db


file_upload_router = APIRouter()

file_upload_router = APIRouter(
    prefix="/files",               # All endpoints start with /files
    tags=["files"],
    dependencies=[Depends(get_current_user)]  # JWT enforced for all endpoints
)

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

@file_upload_router.get("/files", response_model=PaginatedFileResponse)
def list_files(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Return paginated list of uploaded files.
    - skip: offset (default 0)
    - limit: page size (default 10, max 100)
    """
    return get_all_files(db, skip=skip, limit=limit)
