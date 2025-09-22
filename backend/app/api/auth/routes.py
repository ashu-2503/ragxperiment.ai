from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.user_repository import UserRepository
from app.services.auth_service import AuthService
from app.api.auth.schemas import UserCreate, UserResponse, Token
from app.core.database import get_db

router = APIRouter(tags=["auth"])

@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    auth_service = AuthService(UserRepository(db))
    return auth_service.signup(user)
