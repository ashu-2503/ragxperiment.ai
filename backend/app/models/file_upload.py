from sqlalchemy import Column, Integer, String, LargeBinary, Enum ,ForeignKey, DateTime, func
from app.core.database import Base 
from app.constant.file_upload_enum import FileStatus
from sqlalchemy.orm import relationship
from sqlalchemy.orm import relationship

class FileUpload(Base):
    __tablename__ = "file_uploads"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False) 
    file_name = Column(String, nullable=False)
    file_type = Column(String, nullable=False)
    file_size = Column(Integer, nullable=False)
    file_data = Column(LargeBinary, nullable=False)        # TODO : Move to S3
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


   
    status = Column(
        Enum(FileStatus, values_callable=lambda enum_cls: [e.value for e in enum_cls], name="filestatus"),
        default=FileStatus.UPLOADED.value,
        nullable=False,
    )
    
    total_chunks = Column(Integer, default=0, nullable=False)
    processed_chunks = Column(Integer, default=0, nullable=False)

    user = relationship("User", back_populates="files")

    chunks = relationship("FileChunk", back_populates="file", cascade="all, delete-orphan")

