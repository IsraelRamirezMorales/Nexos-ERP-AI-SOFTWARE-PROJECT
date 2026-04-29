from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from modules.auth.deps import get_current_user, get_db
from modules.auth.models import Usuario
from modules.sales import schemas, service

router = APIRouter()


@router.get("/", response_model=List[schemas.SaleResponse])
def read_sales(
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    return service.get_sales(db, empresa_id=current_user.empresa_id)


@router.post("/", response_model=schemas.SaleResponse)
def create_sale(
    *,
    db: Session = Depends(get_db),
    sale_in: schemas.SaleCreate,
    current_user: Usuario = Depends(get_current_user)
):
    return service.create_sale(db, sale_in=sale_in, empresa_id=current_user.empresa_id)
