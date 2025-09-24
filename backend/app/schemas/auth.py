# app/schemas/auth.py
from pydantic import BaseModel, EmailStr, Field

class SignupRequest(BaseModel):
    name: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8)

class LoginRequest(BaseModel):
    email: EmailStr  # can be email or username
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    model_config = {"from_attributes": True}  # Pydantic v2

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
