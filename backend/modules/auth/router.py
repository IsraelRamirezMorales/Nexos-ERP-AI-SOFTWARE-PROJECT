from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from core import security
from core.config import settings
from modules.auth import schemas, service
from modules.auth.deps import get_db

router = APIRouter()


@router.post("/register", response_model=schemas.UserResponse)
def register(
    *,
    db: Session = Depends(get_db),
    register_data: schemas.RegisterSchema
) -> Any:
    """
    Register a new company and its admin user.
    """
    user = service.get_user_by_email(db, email=register_data.admin_email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    return service.register_new_company(db, register_data=register_data)


@router.post("/login", response_model=schemas.Token)
def login(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    user = service.authenticate(
        db, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            user.email, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }
