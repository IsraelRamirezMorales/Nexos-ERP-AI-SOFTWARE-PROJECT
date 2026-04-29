from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from modules.auth.deps import get_current_user, get_db
from modules.auth.models import Usuario
from modules.catalog import schemas, service

router = APIRouter()


# --- CATEGORIES ---

@router.get("/categories", response_model=List[schemas.CategoryResponse])
def read_categories(
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    return service.get_categories(db, empresa_id=current_user.empresa_id)


@router.post("/categories", response_model=schemas.CategoryResponse)
def create_category(
    *,
    db: Session = Depends(get_db),
    category_in: schemas.CategoryCreate,
    current_user: Usuario = Depends(get_current_user)
):
    return service.create_category(db, category_in=category_in, empresa_id=current_user.empresa_id)


# --- PRODUCTS ---

@router.get("/products", response_model=List[schemas.ProductResponse])
def read_products(
    categoria_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    return service.get_products(db, empresa_id=current_user.empresa_id, categoria_id=categoria_id)


@router.post("/products", response_model=schemas.ProductResponse)
def create_product(
    *,
    db: Session = Depends(get_db),
    product_in: schemas.ProductCreate,
    current_user: Usuario = Depends(get_current_user)
):
    return service.create_product(db, product_in=product_in, empresa_id=current_user.empresa_id)


@router.patch("/products/{product_id}", response_model=schemas.ProductResponse)
def update_product(
    *,
    db: Session = Depends(get_db),
    product_id: int,
    product_in: schemas.ProductUpdate,
    current_user: Usuario = Depends(get_current_user)
):
    product = service.update_product(
        db, product_id=product_id, product_in=product_in, empresa_id=current_user.empresa_id
    )
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
