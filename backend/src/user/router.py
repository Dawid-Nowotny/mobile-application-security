from fastapi import APIRouter, Depends, status

from .schemas import UserCreate, UserLogin, UserLoginSecure
from .service import register_user, login_user_vurnerable, login_user_secure
from database import get_db_connection

router = APIRouter()

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, conn = Depends(get_db_connection)):
    await register_user(user, conn)

    return {
        "message": "Użytkownik pomyślnie zarejestrowany."
    }

@router.post("/login-vurnerable", status_code=status.HTTP_200_OK)
async def login(user: UserLogin, conn = Depends(get_db_connection)):
    id, username, email = await login_user_vurnerable(user, conn)

    return {
        "id": id,
        "username": username,
        "email": email
        }

@router.post("/login-secure", status_code=status.HTTP_200_OK)
async def login_secure(user: UserLoginSecure, conn = Depends(get_db_connection)):
    id, username, email = await login_user_secure(user, conn)
    return {
        "id": id,
        "username": username,
        "email": email
    }