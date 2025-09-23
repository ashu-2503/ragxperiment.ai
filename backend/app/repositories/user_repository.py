from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.user import User
from sqlalchemy.exc import IntegrityError


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_email(self, email: str):
        return self.db.query(User).filter(User.email == email).first()

    def get_by_name(self, name: str):
        return self.db.query(User).filter(User.name == name).first()

    def get_by_identifier(self, identifier: str):
        """Return user by name or email."""
        return self.db.query(User).filter(
            (User.name == identifier) | (User.email == identifier)
        ).first()

    def create(self, name: str, email: str, hashed_password: str):
        user = User(name=name, email=email, hashed_password=hashed_password)
        try:
            self.db.add(user)
            self.db.commit()
            self.db.refresh(user)
            return user
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="name or Email already exists"
            )
