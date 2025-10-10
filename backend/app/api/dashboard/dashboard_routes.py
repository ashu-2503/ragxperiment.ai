from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.dashboard_service import get_total_knowledgebases
from app.common.auth_dependencies import get_current_user

dashboard_router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"],
    dependencies=[Depends(get_current_user)]
)

@dashboard_router.get("/knowledgebase-count")
def knowledgebase_count(db: Session = Depends(get_db)):
    count = get_total_knowledgebases(db)
    return {"count": count}
