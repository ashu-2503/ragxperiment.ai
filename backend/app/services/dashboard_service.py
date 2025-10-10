from sqlalchemy.orm import Session
from app.models.file_upload import FileUpload

def get_total_knowledgebases(db: Session) -> int:
    return db.query(FileUpload).count()
