from fastapi import HTTPException, status
from app.repositories.user_repository import UserRepository
from app.api.auth.schemas import UserCreate
from app.core.security import create_access_token, hash_password

class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    def signup(self, user_create: UserCreate):
        existing_user = self.user_repo.get_by_email(user_create.email)
        if existing_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
        hashed_pw = hash_password(user_create.password)
        return self.user_repo.create(user_create.email, hashed_pw)
    
    def login(self, email: str, password: str):
        user = self.user_repo.get_by_email(email)
        if not user or not hash_password(password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
        access_token = create_access_token({"sub": str(user.id)})
        return {"access_token": access_token, "token_type": "bearer"}