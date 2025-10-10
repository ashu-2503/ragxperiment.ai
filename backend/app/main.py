# backend/app/main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth import auth_routes as auth_routes
from app.core.config import settings
from app.core.logging import setup_logging
from app.core.database import init_db
from app.core.global_exceptions import register_exception_handlers
from app.api.upload_doc.file_upload_route import file_upload_router
from app.api.dashboard.dashboard_routes import dashboard_router



# -------------------------
# Initialize logging
# -------------------------
setup_logging()

# -------------------------
# Lifespan context manager
# -------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()  # create tables on startup
    yield

# -------------------------
# FastAPI app instance
# -------------------------
app = FastAPI(
    title=settings.APP_NAME,
    description="Backend API for RagXperiment",
    version=settings.VERSION,
    lifespan=lifespan,
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
# Include routers
# -------------------------
app.include_router(auth_routes.router, prefix="/auth", tags=["auth"])
# File routes (single inclusion, JWT enforced automatically)
app.include_router(file_upload_router)
app.include_router(dashboard_router)

# -------------------------
# Health check
# -------------------------
@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}

# -------------------------
# Global exception handlers
# -------------------------
register_exception_handlers(app)
