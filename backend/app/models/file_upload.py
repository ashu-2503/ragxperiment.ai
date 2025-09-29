from sqlalchemy import Column, Integer, String, LargeBinary, Enum ,ForeignKey
from app.core.database import Base 
from app.constant.file_upload_enum import FileStatus
from sqlalchemy.orm import relationship



class FileUpload(Base):
    __tablename__ = "file_uploads"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False) 
    file_name = Column(String, nullable=False)
    file_type = Column(String, nullable=False)
    file_size = Column(Integer, nullable=False)
    file_data = Column(LargeBinary, nullable=False)
   
    status = Column(
        Enum(FileStatus, values_callable=lambda enum_cls: [e.value for e in enum_cls], name="filestatus"),
        default=FileStatus.UPLOADED.value,
        nullable=False,
    )

    user = relationship("User", back_populates="files")
