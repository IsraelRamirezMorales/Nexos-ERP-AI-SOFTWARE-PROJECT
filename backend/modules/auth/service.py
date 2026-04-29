from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import select

from core.security import get_password_hash, verify_password
from modules.auth.models import Empresa, Usuario
from modules.auth.schemas import RegisterSchema, UserCreate


def get_user_by_email(db: Session, email: str) -> Optional[Usuario]:
    return db.execute(select(Usuario).where(Usuario.email == email)).scalar_one_or_none()


def authenticate(db: Session, email: str, password: str) -> Optional[Usuario]:
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user


def register_new_company(db: Session, register_data: RegisterSchema) -> Usuario:
    # 1. Create Company
    new_company = Empresa(nombre=register_data.company_name)
    db.add(new_company)
    db.flush()  # To get the ID

    # 2. Create Admin User
    new_user = Usuario(
        nombre=register_data.admin_name,
        email=register_data.admin_email,
        password=get_password_hash(register_data.admin_password),
        empresa_id=new_company.id,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def create_user(db: Session, user_in: UserCreate) -> Usuario:
    db_user = Usuario(
        nombre=user_in.nombre,
        email=user_in.email,
        password=get_password_hash(user_in.password),
        empresa_id=user_in.empresa_id,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
