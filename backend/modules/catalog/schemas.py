from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict


# Category Schemas
class CategoryBase(BaseModel):
    nombre: str


class CategoryCreate(CategoryBase):
    pass


class CategoryResponse(CategoryBase):
    id: int
    empresa_id: int

    model_config = ConfigDict(from_attributes=True)


# Product Schemas
class ProductBase(BaseModel):
    nombre: str
    precio: float
    stock: int
    categoria_id: int


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    nombre: Optional[str] = None
    precio: Optional[float] = None
    stock: Optional[int] = None
    categoria_id: Optional[int] = None


class ProductResponse(ProductBase):
    id: int
    empresa_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
