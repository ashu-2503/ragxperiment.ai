# app/schemas/auth.py
from pydantic import BaseModel, EmailStr, Field
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from typing import List

# Responses
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    model_config = {"from_attributes": True}

# Requests
class SignupRequest(BaseModel):
    name: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    token: str
    user: UserResponse
