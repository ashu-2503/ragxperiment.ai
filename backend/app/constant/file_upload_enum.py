import enum

class FileStatus(str, enum.Enum):
    """Shared enum for file upload lifecycle."""
    UPLOADED = "uploaded"
    READY = "ready"
    PROCESSING = "processing"
    FAILED = "failed"
