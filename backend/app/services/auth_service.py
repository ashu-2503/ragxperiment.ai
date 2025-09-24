# # app/services/auth_service.py
# from app.repositories.user_repository import UserRepository
# from app.schemas.auth import SignupRequest
# from app.core.security import hash_password, verify_password, create_access_token
# from fastapi import HTTPException, status

# class AuthService:
#     def __init__(self, user_repo: UserRepository):
#         self.user_repo = user_repo

#     def signup(self, dto: SignupRequest):
#         # 1) check confirm password (simple, explicit check)
#         if dto.password != dto.confirm_password:
#             raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
#                                 detail="Passwords do not match")

#         # 2) check if user exists
#         existing = self.user_repo.get_by_email(dto.email)
#         if existing:
#             raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
#                                 detail="Email already registered")

#         # 3) hash password + create user
#         hashed_pw = hash_password(dto.password)
#         user = self.user_repo.create(dto.email, hashed_pw)
#         return user

#     def signin(self, email: str, password: str):
#         user = self.user_repo.get_by_email(email)
#         if not user or not verify_password(password, user.hashed_password):
#             raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
#                                 detail="Invalid email or password")

#         token = create_access_token(subject=user.id)
#         return {"access_token": token, "token_type": "bearer"}

# app/services/auth_service.py
from fastapi import HTTPException, status
from app.repositories.user_repository import UserRepository
from app.schemas.auth import SignupRequest
from app.core.security import hash_password, verify_password, create_access_token

class AuthService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    def signup(self, payload: SignupRequest):
        hashed = hash_password(payload.password)

        if self.repo.get_by_name(payload.name):
            raise HTTPException(status_code=400, detail="Username already exists")
        if self.repo.get_by_email(payload.email):
            raise HTTPException(status_code=400, detail="Email already exists")

        user = self.repo.create(name=payload.name, email=payload.email, hashed_password=hashed)
        return user

    def signin(self, identifier: str, password: str):
        """Login using email or username."""
        user = self.repo.get_by_identifier(identifier)
        if not user or not verify_password(password, user.hashed_password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
        
        token = create_access_token(subject=user.id)
        return {"access_token": token, "token_type": "bearer"}
