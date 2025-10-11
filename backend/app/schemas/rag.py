from pydantic import BaseModel
from typing import List, Dict

class RAGRequest(BaseModel):
    query: str

class RAGResponse(BaseModel):
    answer: str
    sources: List[Dict]
