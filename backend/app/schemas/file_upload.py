from pydantic import BaseModel
from app.constant.file_upload_enum import FileStatus


class FileUploadBase(BaseModel):
    user_id: int
    file_name: str
    file_type: str
    file_size: int
    status: FileStatus = FileStatus.UPLOADED.value

class FileUploadCreate(FileUploadBase):
    pass  # File data is uploaded via multipart, not schema

class FileUploadResponse(FileUploadBase):
    id: int

    class Config:
        orm_mode = True
