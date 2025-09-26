# app/schemas/auth.py
from pydantic import BaseModel, EmailStr, Field

# Requests
class SignupRequest(BaseModel):
    name: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# Responses
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    model_config = {"from_attributes": True}  # Pydantic v2

class LoginResponse(BaseModel):
    token: str
    user: UserResponse
