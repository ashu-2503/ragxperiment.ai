# backend/app/main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth import routes as auth_routes
from app.core.config import settings
from app.core.logging import setup_logging
from app.core.database import init_db
from app.core.global_exceptions import register_exception_handlers

# -------------------------
# Best Practice:
# Initialize logging as first step
# -------------------------
setup_logging()

# -------------------------
# Lifespan context manager replaces @app.on_event
# -------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    init_db()  # create tables
    yield
    # Shutdown logic can be added here if needed

# -------------------------
# FastAPI app
# -------------------------
app = FastAPI(
    title=settings.APP_NAME,
    description="Backend API for RagXperiment",
    version=settings.VERSION,
    lifespan=lifespan,  # uses lifespan context manager
)

# -------------------------
# CORS middleware
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Include routers (centralized prefix)
# -------------------------
app.include_router(auth_routes.router, prefix="/auth", tags=["auth"])

# -------------------------
# Health check endpoint
# -------------------------
@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}

# -------------------------
# Global exception handlers
# -------------------------
register_exception_handlers(app)
