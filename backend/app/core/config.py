from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_NAME: str = "RAGxperiment AI"
    VERSION: str = "0.1.0"
    DEBUG: bool = False  # True if want to log sql queries

    # Database
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: str = "5432"
    POSTGRES_DB: str

    # JWT
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173"]

    # Hugging Face / LLaMA / Chroma
    huggingface_model_repo: str
    huggingface_model_file: str
    huggingface_api_token: str
    llama_model_path: str
    llama_n_ctx: int
    llama_threads: int
    chroma_dir: str
    chroma_collection: str
    embedding_model: str

    model_config = SettingsConfigDict(
        env_file=".env"
    )

settings = Settings()
