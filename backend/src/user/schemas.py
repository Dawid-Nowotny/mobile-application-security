from fastapi import HTTPException, status
from pydantic import BaseModel, Field,field_validator

import re

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserLoginSecure(BaseModel):
    username: str = Field(...,strip_whitespace=True)
    password: str = Field(...,)

    @field_validator('username')
    def validate_username(cls, v):
        if not re.match(r'^[a-zA-Z0-9_]+$', v):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Nazwa użytkownika musi być alfanumeryczna i może zawierać wyłącznie znaki podkreślenia."
            )
        return v