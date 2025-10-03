# app/models/file_chunk.py
from sqlalchemy import Column, Integer, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.constant.file_upload_enum import FileStatus  # reuse enum

class FileChunk(Base):
    __tablename__ = "file_chunks"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("file_uploads.id"), nullable=False)
    user_id = Column(Integer, nullable=False)
    chunk_text = Column(Text, nullable=False)
    chunk_index = Column(Integer, nullable=False)
    status = Column(
        Enum(FileStatus, values_callable=lambda enum_cls: [e.value for e in enum_cls], name="chunkstatus"),
        default=FileStatus.PROCESSING.value,
        nullable=False
    )

    # Relationships
    file = relationship("FileUpload", back_populates="chunks")
