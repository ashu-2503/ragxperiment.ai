# # app/api/routes/user_router.py
# from fastapi import APIRouter, Depends , Query
# from sqlalchemy.orm import Session
# from typing import List
# from app.schemas.auth import UserResponse
# from app.repositories.user_repository import UserRepository
# from app.services.user_service import UserService
# from app.core.database import get_db
# from app.schemas.auth import PaginatedUserResponse

# router = APIRouter()
# # 
# @router.get("/", response_model=PaginatedUserResponse)
# def get_all_users(
#     skip: int = Query(0, ge=0, description="Number of users to skip"),
#     limit: int = Query(10, ge=1, le=100, description="Max number of users to return"),
#     db: Session = Depends(get_db)
# ):
#     service = UserService(UserRepository(db))
#     return service.get_all_users_paginated(skip=skip, limit=limit)

# @router.get("/{user_id}", response_model=UserResponse)
# def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
#     service = UserService(UserRepository(db))
#     return service.get_user_by_id(user_id)
