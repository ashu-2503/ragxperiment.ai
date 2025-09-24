from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings
from urllib.parse import quote_plus

# Safely encode the password in the DSN (handles special chars)
password = quote_plus(settings.POSTGRES_PASSWORD)

DATABASE_URL = (
    f"postgresql+psycopg2://{settings.POSTGRES_USER}:{password}"
    f"@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
)

# engine - central SQLAlchemy entrypoint
engine = create_engine(DATABASE_URL, echo=settings.DEBUG)

# session factory (like EntityManagerFactory)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# declarative base for models
Base = declarative_base()

# FastAPI dependency: yields a DB session per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# convenience to create tables at startup in dev (use migrations in prod)
def init_db():
    # import models so they are registered on Base.metadata
    import app.models.user  # noqa: F401
    Base.metadata.create_all(bind=engine)
