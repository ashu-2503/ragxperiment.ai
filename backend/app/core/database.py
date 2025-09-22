from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings
from urllib.parse import quote_plus

# Safely encode password (important if it has @, #, : etc.)
password = quote_plus(settings.POSTGRES_PASSWORD)

DATABASE_URL = (
    f"postgresql+psycopg2://{settings.POSTGRES_USER}:{password}"
    f"@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
)

engine = create_engine(DATABASE_URL, echo=settings.DEBUG)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Automatically create tables on startup
def init_db():
    import app.models.user  # 👈 Import all models here
    Base.metadata.create_all(bind=engine)