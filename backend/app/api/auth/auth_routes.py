from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.schemas.auth import LoginResponse, SignupRequest, LoginRequest, UserResponse
from app.repositories.user_repository import UserRepository
from app.services.auth_service import AuthService
from app.core.database import get_db

# Remove prefix here
router = APIRouter()  

@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    service = AuthService(UserRepository(db))
    return service.signup(payload)

@router.post("/login", response_model=LoginResponse)
def signin(payload: LoginRequest, db: Session = Depends(get_db)):
    service = AuthService(UserRepository(db))
    return service.signin(payload.email, payload.password)
