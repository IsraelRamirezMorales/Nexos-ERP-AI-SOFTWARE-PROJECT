from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict


# Shared properties
class UserBase(BaseModel):
    email: EmailStr
    nombre: str


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str
    empresa_id: Optional[int] = None


# Properties to return via API
class UserResponse(UserBase):
    id: int
    empresa_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Company schemas
class CompanyBase(BaseModel):
    nombre: str


class CompanyCreate(CompanyBase):
    pass


class CompanyResponse(CompanyBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Registration Schema (Company + Admin User)
class RegisterSchema(BaseModel):
    company_name: str
    admin_name: str
    admin_email: EmailStr
    admin_password: str


# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenPayload(BaseModel):
    sub: Optional[str] = None
