from fastapi import APIRouter
from app.schemas.rag import RAGRequest, RAGResponse
from app.services.rag_service import query_rag

rag_router = APIRouter(prefix="/rag", tags=["RAG"])

@rag_router.post("/", response_model=RAGResponse)
def rag_endpoint(request: RAGRequest):
    return query_rag(request.query)
