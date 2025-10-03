from pydantic import BaseModel
from datetime import datetime
from app.constant.file_upload_enum import FileStatus
from typing import List


class FileUploadBase(BaseModel):
    user_id: int
    file_name: str
    file_type: str
    file_size: int
    status: FileStatus = FileStatus.UPLOADED.value

class FileUploadCreate(FileUploadBase):
    pass  # File data is uploaded via multipart, not schema

    id: int

    class Config:
        orm_mode = True

class FileUploadResponse(BaseModel):
    id: int
    file_name: str
    file_type: str
    file_size: str   # formatted string, not raw int
    status: FileStatus
    created_at: datetime

class PaginatedFileResponse(BaseModel):
    total: int
    skip: int
    limit: int
    files: List[FileUploadResponse]

class Config:
    orm_mode = True