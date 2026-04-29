from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import select

from modules.catalog.models import Categoria, Producto
from modules.catalog.schemas import CategoryCreate, ProductCreate, ProductUpdate


# --- CATEGORIES ---

def get_categories(db: Session, empresa_id: int) -> List[Categoria]:
    return db.execute(
        select(Categoria).where(Categoria.empresa_id == empresa_id)
    ).scalars().all()


def create_category(db: Session, category_in: CategoryCreate, empresa_id: int) -> Categoria:
    db_category = Categoria(nombre=category_in.nombre, empresa_id=empresa_id)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


# --- PRODUCTS ---

def get_products(db: Session, empresa_id: int, categoria_id: Optional[int] = None) -> List[Producto]:
    query = select(Producto).where(Producto.empresa_id == empresa_id)
    if categoria_id:
        query = query.where(Producto.categoria_id == categoria_id)
    return db.execute(query).scalars().all()


def create_product(db: Session, product_in: ProductCreate, empresa_id: int) -> Producto:
    db_product = Producto(
        **product_in.model_dump(),
        empresa_id=empresa_id
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def update_product(db: Session, product_id: int, product_in: ProductUpdate, empresa_id: int) -> Optional[Producto]:
    db_product = db.execute(
        select(Producto).where(Producto.id == product_id, Producto.empresa_id == empresa_id)
    ).scalar_one_or_none()
    
    if not db_product:
        return None
        
    update_data = product_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_product, field, value)
        
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product
