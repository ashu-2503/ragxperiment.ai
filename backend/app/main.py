from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth import routes as auth_routes
# from app.api.knowledgebase import routes as kb_routes
# from app.api.chat import routes as chat_routes
# from app.api.dashboard import routes as dashboard_routes
from app.core.config import settings
from app.core.logging import setup_logging
from app.core.database import init_db
from app.core.global_exceptions import register_exception_handlers

# Initialize logging first
setup_logging()

# Lifespan context manager (replaces @app.on_event)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    init_db()
    yield

# Initialize FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    description="Backend API for RagXperiment",
    version=settings.VERSION,
)

# CORS middleware (allow frontend to call APIs)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include route modules
app.include_router(auth_routes.router, prefix="/auth", tags=["auth"])
# app.include_router(kb_routes.router, prefix="/knowledgebase", tags=["knowledgebase"])
# app.include_router(chat_routes.router, prefix="/chat", tags=["chat"])
# app.include_router(dashboard_routes.router, prefix="/dashboard", tags=["dashboard"])

# Health check
@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}

# Register global exception handlers
register_exception_handlers(app)
